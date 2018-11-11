/**
 * This file pricingController.js deals with updation of Plan after subscription by User.
 * Used for updating pricing plan information into db and get trial days based on userID.
 * Export Methods are updatePlan(req, res, next) and getTrialDays(req, res, next)
 * Private methods are validateBillingDetail(userId), retrieveTrialInfo(subscriptionId).
 */

/* Require our Models. */
var config = require("../config");
var Billing = require("../models/billingSchema");

/* Requires dependency npm. */
var moment = require("moment");
var async = require("async");
var empty = require("is-empty");
// chargebee configure
var mySite = config.chargebeeSite;
var myApiKey = config.chargebeeApiKey;
var chargebee = require("chargebee");
chargebee.configure({
  site: mySite,
  api_key: myApiKey
});

/**
 * [validateBillingDetail] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {String} userId
 *
 * @return {Json} results.billing
 */
async function validateBillingDetail(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
        billing(callback) {
          Billing.find({
              userId
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        // Error in API usage
        if (empty(results.billing)) { // No results.
          resolve(null);
        }
        // Successful, so render.
        resolve(results.billing);
      });
    }, 1000);
  });
};

/**
 * [updatePlan] - This async method is used to updatePlan billingDetail after Subsciption.
 * @type {[async function]}
 *
 * @param {String} req [userId]
 * @param  {String} req [subscriptionId]
 * @param  {String} req [invoiceId]
 * @param  {String} req [planId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */
exports.updatePlan = async function(req, res) {
  var userId = req.body.userId,
    subscriptionId = req.body.subscriptionId,
    invoiceId = req.body.invoiceId,
    planId = req.body.planId,
    lastUpdated = moment().valueOf();

  // Validation
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("subscriptionId", "subscriptionId is required").notEmpty();
  req.checkBody("planId", "planId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var billingDetails = await validateBillingDetail(userId);
    if (empty(billingDetails)) {
      return res.status(401).json({
        status: "401",
        message: "billing details does not exist"
      });
    }
    var billingId = billingDetails[0]._id;
    chargebee.subscription.retrieve(subscriptionId).request(
      function(error, result) {
        if (error) {
          return res.status(403).json({
            status: 403,
            error: error
          });
        }
        if (invoiceId !== null && planId === result.subscription.plan_id) {
          planId = result.subscription.plan_id;
        }

        var subscription = result.subscription;
        var customerId = subscription.customer_id;
        var subscriptionId = result.subscription.id;
        var subscriptionStatus = result.subscription.status;
        var subscriptedplanId = result.subscription.plan_id;
        var planUnitPrice = result.subscription.plan_unit_price;
        var nextBillingAt = result.subscription.next_billing_at;

        // Successful.
        var billing = new Billing({
          _id: billingId,
          customerId,
          subscriptionId,
          subscriptionStatus,
          planId: subscriptedplanId,
          planUnitPrice,
          nextBillingAt,
          lastUpdated
        });

        // Data from form is valid. Update the record.
        Billing.findByIdAndUpdate(billingId, billing, function(err) {
          if (err) {
            return res.status(401).json({
              status: 401,
              message: "Auth failed"
            });
          } else { // Successful.
            return res.status(200).json({
              status: 200,
              message: "Billing Updated Successfully"
            });
          }
        });
      });
  }
};

/**
 * [retrieveTrialInfo] - This async method is used to retrieve Trial Info From chargebee site based on subscriptionId.
 * @type {[async function]}
 *
 * @param  {String} userId
 *
 * @return {Json} results.billing
 */
async function retrieveTrialInfo(subscriptionId) {
  return new Promise(resolve => {
    setTimeout(() => {
      var CurrentDate = moment().unix();
      var element = {};
      chargebee.subscription.retrieve(subscriptionId).request(
        async function(error, result) {
          if (error) {
            element.status = "403"
            resolve(element)
          } else {
            element.status = "200";
            element.planId = result.subscription.plan_id;
            if (result.subscription.next_billing_at > CurrentDate) {
              element.updateRequired = "0";
              element.trialEndsIn = result.subscription.next_billing_at - CurrentDate;
              var seconds = parseInt(element.trialEndsIn, 10);
              element.trialDays = Math.floor(seconds / (3600 * 24));
              seconds -= parseInt(element.trialDays) * 3600 * 24;
              element.trialHours = Math.floor(seconds / 3600);
              seconds -= parseInt(element.trialHours) * 3600;
              element.trialMinutes = Math.floor(seconds / 60);
              seconds -= parseInt(element.trialMinutes) * 60;
              element.trialSecond = Math.floor(seconds);
              resolve(element)
            } else {
              element.updateRequired = "1";
              resolve(element)
            }
          }
        });
    }, 1000);
  });
};

/**
 * [getTrialDays] - This async method is used to get trial days based on userId.
 * @type {[async function]}
 *
 * @param  {[String]} req [userId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [updateRequired]
 * @return {[String]} res [planId]
 * @return {[String]} res [trialDays]
 * @return {[String]} res [trialEndsIn]
 */
exports.getTrialDays = async function(req, res) {
  var userId = req.body.userId;

  // Validation
  req.checkBody("userId", "userId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var billingDetails = await validateBillingDetail(userId);
    if (empty(billingDetails)) {
      return res.status(401).json({
        status: "401",
        message: "billing details does not exist"
      });
    }
    var mRetrieveTrialInfo = await retrieveTrialInfo(billingDetails[0].subscriptionId);
    console.log(mRetrieveTrialInfo);
    if (mRetrieveTrialInfo.status === "200") {
      if (mRetrieveTrialInfo.updateRequired === "0") {
        return res.status(200).json({
          status: "200",
          message: "Successfully",
          updateRequired: "0",
          mRetrieveTrialInfo
        });
      } else {
        return res.status(200).json({
          status: "200",
          message: "Successfully",
          updateRequired: "1"
        });
      }
    } else {
      return res.status(403).json({
        status: "403",
        message: "Error in chargebee Subscription details",
        updateRequired: "1",
      });
    }
  }
};

module.testExports = {
  validateBillingDetail: validateBillingDetail,
  retrieveTrialInfo: retrieveTrialInfo
};
