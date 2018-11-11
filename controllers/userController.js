/**
 * This file userController.js deals with CRUD operations of user DB operation.
 * Used for creating, updating, deleting and Viewing User data and Job Listing based on userID.
 * Export Methods are userGoogleLogin(req, res, next), userDetail(req, res, next), profileUpdate(req, res, next) and joblist(req, res, next)
 * Private methods are getBillingDetail(userId).
 */

/* Require our Models. */
var User = require("../models/userSchema");
var Job = require("../models/jobSchema");
var Billing = require("../models/billingSchema");
var config = require("../config");

/* Requires dependency npm. */
var empty = require("is-empty");
var mongoose = require("mongoose");
var moment = require("moment");
var async = require("async");

// chargebee configure
var mySite = config.chargebeeSite;
var myApiKey = config.chargebeeApiKey;
var chargebee = require("chargebee");
chargebee.configure({
  site: mySite,
  api_key: myApiKey
});

/**
 * [getBillingDetail] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function getBillingDetail(userId) {
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

// /**
//  * [userGoogleLogin] - This method is used to Login or Sign Up as google user using his google Id.
//  * @type {[async function]}
//  *
//  * @param  {[String]} req [firebaseId]
//  * @param  {[String]} req [email]
//  * @param  {[String]} req [firstName]
//  * @param  {[String]} req [lastName]
//  * @param  {[String]} req [profileImage]
//  *
//  * @return {[String]} res [status]
//  * @return {[String]} res [message]
//  * @return {[String]} res [data]
//  * @return {[String]} res [billingDetails]
//  * @return {[String]} res [loginStatus]
//  * @return {[String]} res [updateRequired]
//  * @return {[String]} res [trialDays]
//  * @return {[String]} res [trialEndsIn]
//  * */
// exports.userGoogleLogin = async function(req, res) {
//   var firebaseId = req.body.firebaseId,
//     firstName = req.body.firstName,
//     lastName = req.body.lastName,
//     email = req.body.email,
//     profileImage = req.body.profileImage;
//   var createdAt = moment().valueOf(),
//     lastUpdated = moment().valueOf(),
//     CurrentDate = moment().unix();
//   req.checkBody("firstName", "firstName is required").notEmpty();
//   req.checkBody("email", "Email is required").notEmpty();
//   req.checkBody("email", "Email is not valid").isEmail();
//   req.checkBody("firebaseId", "firebaseId is required").notEmpty();
//   var errors = req.validationErrors();
//   if (errors) {
//     res.status(400).json({
//       status: "400",
//       message: errors
//     });
//   } else {
//     User.find({
//         firebaseId
//       })
//       .exec()
//       .then(async (user) => {
//         if (user.length >= 1) {
//           var userId = user[0]._id;
//           var billingDetails = await getBillingDetail(userId);
//           chargebee.subscription.retrieve(billingDetails[0].subscriptionId).request(
//             function(error, result) {
//               if (error) {
//                 return res.status(403).json({
//                   status: "403",
//                   message: error,
//                   updateRequired: "1"
//                 });
//               }
//               var CurrentDate = (moment().unix()),
//                 nextValue = (result.subscription.next_billing_at);
//               if (nextValue > CurrentDate) {
//                 let trialEndsIn = (nextValue - CurrentDate);
//                 var seconds = parseInt(trialEndsIn, 10);
//                 var trialDays = Math.floor(seconds / (3600 * 24));
//                 seconds -= parseInt(trialDays) * 3600 * 24;
//                 var trialHours = Math.floor(seconds / 3600);
//                 seconds -= parseInt(trialHours) * 3600;
//                 var trialMinutes = Math.floor(seconds / 60);
//                 seconds -= parseInt(trialMinutes) * 60;
//                 var trialSecond = Math.floor(seconds);
//                 return res.status(200).json({
//                   status: "200",
//                   message: "Logged In Successfully",
//                   loginStatus: 1,
//                   data: user[0],
//                   billingDetails: billingDetails[0],
//                   updateRequired: "0",
//                   trialDays,
//                   trialHours,
//                   trialMinutes,
//                   trialSecond,
//                   trialEndsIn
//                 });
//               } else {
//                 return res.status(200).json({
//                   status: "200",
//                   message: "Logged In Successfully",
//                   loginStatus: 1,
//                   data: user[0],
//                   billingDetails: billingDetails[0],
//                   updateRequired: "1"
//                 });
//               }
//             });
//         } else {
//           User.find({
//               email
//             })
//             .exec()
//             .then((user) => {
//               if (user.length >= 1) {
//                 return res.status(401).json({
//                   status: "401",
//                   message: "MailId already exists"
//                 });
//               } else {
//                 // User creation and billing schema creation
//                 const user = new User({
//                   _id: new mongoose.Types.ObjectId(),
//                   email,
//                   firstName,
//                   lastName,
//                   profileImage,
//                   firebaseId,
//                   createdAt,
//                   lastUpdated
//                 });
//                 user
//                   .save()
//                   .then((result) => {
//                     var userResult = result;
//                     chargebee.subscription.create({
//                       plan_id: "justops-20-plan",
//                       auto_collection: "on",
//                       customer: {
//                         email: userResult.email,
//                         first_name: userResult.firstName,
//                         last_name: userResult.lastName,
//                         net_term_days: "0"
//                       }
//                     }).request(function(error, result) {
//                       if (error) {
//                         res.status(403).json({
//                           status: "403",
//                           message: error
//                         });
//                       } else {
//                         let trialEndsIn = (result.subscription.next_billing_at - CurrentDate) - 5;
//                         var seconds = parseInt(trialEndsIn, 10);
//                         var trialDays = Math.floor(seconds / (3600 * 24));
//                         seconds -= parseInt(trialDays) * 3600 * 24;
//                         var trialHours = Math.floor(seconds / 3600);
//                         seconds -= parseInt(trialHours) * 3600;
//                         var trialMinutes = Math.floor(seconds / 60);
//                         seconds -= parseInt(trialMinutes) * 60;
//                         var trialSecond = Math.floor(seconds);
//                         const billing = new Billing({
//                           _id: new mongoose.Types.ObjectId(),
//                           userId: userResult._id,
//                           customerId: result.subscription.customer_id,
//                           subscriptionId: result.subscription.id,
//                           subscriptionStatus: result.subscription.status,
//                           planId: result.subscription.plan_id,
//                           planUnitPrice: result.subscription.plan_unit_price,
//                           nextBillingAt: result.subscription.next_billing_at,
//                           createdAt,
//                           lastUpdated
//                         });
//                         billing
//                           .save()
//                           .then((result) => {
//                             res.status(200).json({
//                               status: "200",
//                               message: "User created",
//                               loginStatus: 0,
//                               data: userResult,
//                               billingDetails: result,
//                               updateRequired: "0",
//                               trialDays,
//                               trialHours,
//                               trialMinutes,
//                               trialSecond,
//                               trialEndsIn
//                             });
//                           })
//                           .catch((err) => {
//                             res.status(500).json({
//                               status: "500",
//                               message: err
//                             });
//                           });
//                       }
//                     });
//                   })
//                   .catch((err) => {
//                     res.status(500).json({
//                       status: "500",
//                       message: err
//                     });
//                   });
//               }
//             });
//         }
//       });
//   }
// };

/**
 * [userDetail]-This method is used to get user detail for corresponding User.
 * @type {[function]}
 *
 * @param  {[String]} req [userId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [data]
 */
exports.userDetail = function(req, res) {
  var userId = req.params.userId;
  async.parallel({
    user(callback) {
      User.find({
          "_id": userId
        })
        .exec(callback);
    },
  }, function(err, results) {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: "Auth failed"
      });
    }
    // Error in API usage
    if (empty(results.user[0])) { // No results.
      return res.status(401).json({
        status: 401,
        message: "User not found"
      });
    }
    // Successful, so render.
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: results.user
    });
  });
};

/**
 * [profileUpdate] - This method is used to update user detail for corresponding User.
 * @type {[function]}
 *
 * @param  {[String]} req [userId]
 * @param  {[String]} req [email]
 * @param  {[String]} req [firstName]
 * @param  {[String]} req [lastName]
 * @param  {[String]} req [profileImage]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */
exports.profileUpdate = function(req, res, next) {
  var userId = req.body.userId;
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var profileImage = req.body.profileImage;
  var lastUpdated = moment().valueOf();

  // Validation
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("firstName", "firstName is required").notEmpty();

  // Extract the validation errors from a request.
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    User.findOne({
        _id: userId
      })
      .exec(function(err, theuser) {
        // if (err) { return next(err); }
        if (theuser == null) { // No results.
          res.status(401).json({
            status: "401",
            message: "User not found"
          });
        } else {
          async.parallel({
            checkEmail(callback) {
              User.findOne({
                email
              }).exec(callback);
            },
          }, function(err, results) {
            if (err) {
              return next(err);
            }
            //check email already exist or not
            // if (results.checkEmail !== null)
            // {
            //   if (String(results.checkEmail._id) !== userId)
            //   {
            //     return res.status(401).json({
            //         status :401,
            //         message : "Mail Id Already Exist"
            //               });
            //   }
            // }

            // Successful.
            var user = new User({
              _id: userId,
              email,
              firstName,
              lastName,
              profileImage,
              lastUpdated
            });
            // Data from form is valid. Update the record.
            User.findByIdAndUpdate(userId, user, function(err) {
              if (err) {
                return res.status(401).json({
                  status: 401,
                  message: "Auth failed"
                });
              } else { // Successful.
                return res.status(200).json({
                  status: "200",
                  message: "User Updated Successfully"
                });
              }
            });
          });
        }
      });
  }
};

/**
 * [joblist] - This method is used to Display list of all githubRepo Items.
 * @type {[function]}
 * @param  {[String]}   userId
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [data]
 */
exports.joblist = function(req, res, next) {
  var userId = req.params.userId;
  // Validation
  req.checkParams("userId", "userId is required").notEmpty();

  // Extract the validation errors from a request.
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    async.parallel({

      checkUserId(callback) {
        User.find({
          _id: userId
        }).exec(callback);
      },
    }, function(err, results) {
      if (err) {
        return next(err);
      }
      if (empty(results.checkUserId)) {
        return res.status(401).json({
          status: "401",
          message: "Authentication failed"
        });
      }
      async.parallel({
        jobList: function(callback) {
          Job.find({
              userId
            })
            .sort([
              ["createdAt", "descending"]
            ])
            .exec(callback);
        }
      }, function(err, results) {
        if (err) {
          return next(err);
        }
        //Combine results
        if (!empty(results.jobList)) {
          return res.status(200).json({
            status: "200",
            message: "Success",
            data: results.jobList
          });
        } else {
          return res.status(200).json({
            status: "401",
            message: "No Job details found"
          });
        }

      });
    });
  }
};

/**
 * [getBillingDetail] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function addBillingDetails(mUserInfo) {
  return new Promise(resolve => {
    setTimeout(async () => {
      console.log("Billing inside");
      var element = {};
      chargebee.subscription.create({
        plan_id: "justops-20-plan",
        auto_collection: "on",
        customer: {
          email: mUserInfo.email,
          first_name: mUserInfo.firstName,
          last_name: mUserInfo.lastName,
          net_term_days: "0"
        }
      }).request(function(error, result) {
        if (error) {
          console.log("In err");
          console.log(error);
          resolve(null);
        } else {
          var CurrentDate = (moment().unix());
          let trialEndsIn = (result.subscription.next_billing_at - CurrentDate) - 5;
          var seconds = parseInt(trialEndsIn, 10);
          var trialDays = Math.floor(seconds / (3600 * 24));
          seconds -= parseInt(trialDays) * 3600 * 24;
          var trialHours = Math.floor(seconds / 3600);
          seconds -= parseInt(trialHours) * 3600;
          var trialMinutes = Math.floor(seconds / 60);
          seconds -= parseInt(trialMinutes) * 60;
          var trialSecond = Math.floor(seconds);
          const billing = new Billing({
            _id: new mongoose.Types.ObjectId(),
            userId: mUserInfo._id,
            customerId: result.subscription.customer_id,
            subscriptionId: result.subscription.id,
            subscriptionStatus: result.subscription.status,
            planId: result.subscription.plan_id,
            planUnitPrice: result.subscription.plan_unit_price,
            nextBillingAt: result.subscription.next_billing_at,
            createdAt: moment().valueOf(),
            lastUpdated: moment().valueOf()
          });
          billing
            .save()
            .then((result) => {
              element.loginStatus = "0",
                element.userDetails = mUserInfo,
                element.billingDetails = result,
                element.updateRequired = "0",
                element.trialDays = trialDays,
                element.trialHours = trialHours,
                element.trialMinutes = trialMinutes,
                element.trialSecond = trialSecond,
                element.trialEndsIn = trialEndsIn;
              resolve(element);
            }).catch((err) => {
              console.log("In err catch");
              console.log(err);
              resolve(null);
            });
        }
      });
    }, 1000);
  });
};

/**
 * [getReferenceToken] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function getReferenceToken() {
  return new Promise(resolve => {
    setTimeout(async () => {
      console.log("getReferenceToken inside");
      const UIDGenerator = require('uid-generator');
      const uidgen = new UIDGenerator(null, 10);
      uidgen.generate()
        .then(uid => resolve(uid));
    }, 1000);
  });
};

/**
 * [addGoogleUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function addGoogleUser(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      var referenceToken = await getReferenceToken();
      User.find({
          email: req.body.email,
          sourceLogin: "0"
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            element.loginStatus = "0",
            element.status = "401",
              element.message = "MailId already exists";
            console.log("MailId Exist");
            resolve(element);
          } else {
            // create Google User
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              userName: req.body.userName,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              profileImage: req.body.profileImage,
              firebaseId: req.body.firebaseId,
              referenceToken,
              sourceLogin: "0",
              isEmailVerified: "1",
              createdAt: moment().valueOf(),
              lastUpdated: moment().valueOf()
            });
            user.save()
              .then(async (result) => {
                var mBillingDetails = await addBillingDetails(result);
                if (!empty(mBillingDetails)) {
                  console.log("mBillingDetails");
                  resolve(mBillingDetails);
                } else {
                  console.log("mBillingDetails Not");
                  resolve(null);
                }
              }).catch((err) => {
                console.log("log Catch");
                console.log(err);
                resolve(null);
              });
          }
        }).catch((err) => {
          console.log("high Catch");
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [checkFirebaseUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function checkFirebaseUser(firebaseId) {
  return new Promise(resolve => {
    setTimeout(async () => {
      console.log("checkFirebaseUser");
      var element = {};
      User.find({
          firebaseId
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            console.log(user);
            var billingDetails = await getBillingDetail(user[0]._id);
            chargebee.subscription.retrieve(billingDetails[0].subscriptionId).request(
              function(error, result) {
                if (error) {
                  resolve(null);
                } else {
                  var CurrentDate = (moment().unix()),
                    nextValue = (result.subscription.next_billing_at);
                  if (nextValue > CurrentDate) {
                    let trialEndsIn = (nextValue - CurrentDate);
                    var seconds = parseInt(trialEndsIn, 10);
                    var trialDays = Math.floor(seconds / (3600 * 24));
                    seconds -= parseInt(trialDays) * 3600 * 24;
                    var trialHours = Math.floor(seconds / 3600);
                    seconds -= parseInt(trialHours) * 3600;
                    var trialMinutes = Math.floor(seconds / 60);
                    seconds -= parseInt(trialMinutes) * 60;
                    var trialSecond = Math.floor(seconds);

                    element.loginStatus = 1,
                      element.userDetails = user[0],
                      element.billingDetails = billingDetails[0],
                      element.updateRequired = "0",
                      element.trialDays = trialDays,
                      element.trialHours = trialHours,
                      element.trialMinutes = trialMinutes,
                      element.trialSecond = trialSecond,
                      element.trialEndsIn = trialEndsIn;
                    resolve(element);
                  } else {
                    element.loginStatus = "1",
                      element.userDetails = user[0],
                      element.billingDetails = billingDetails[0],
                      element.updateRequired = "1";
                    resolve(element);
                  }
                }
              });
          } else {
            element.status = "401",
              element.message = "User Authentication Failed";
            resolve(element);
          }
        }).catch((err) => {
          console.log(err);
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [googleUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function googleUser(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      var mCheckFirebaseUser = await checkFirebaseUser(req.body.firebaseId);
      console.log(mCheckFirebaseUser);
      if (empty(mCheckFirebaseUser)) {
        console.log("empty User");
        resolve(null);
      } else if (mCheckFirebaseUser.status === "401" && mCheckFirebaseUser.message === "User Authentication Failed") {
        console.log("Google User SignUp");
        //To add User
        var mUserInfo = await addGoogleUser(req);
        if (empty(mUserInfo)) {
          resolve(null);
        } else {
          element.status = "200",
          element.message = "Success",
          element.userResult = mUserInfo;
          resolve(element);
        }
      } else {
        element.status = "200",
        element.message = "Success",
        element.userResult = mCheckFirebaseUser;
        resolve(element);
      }
    }, 1000);
  });
};

/**
 * [userGoogle] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
exports.userGoogle = async function(req, res) {
  req.checkBody("firstName", "firstName is required").notEmpty();
  req.checkBody("userName", "userName is required").notEmpty();
  req.checkBody("firebaseId", "firebaseId is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    if (req.body.sourceLogin === "0") {
      //Google User
      console.log("Google User");
      var mGoogleUser = await googleUser(req);
      if (empty(mGoogleUser)) {
        return res.status(403).json({
          status: "403",
          error: "Google user Not found"
        });
      } else if (mGoogleUser.userResult.status === "401" && mGoogleUser.userResult.message === "MailId already exists") {
        console.log("MailId exist");
        return res.status(401).json({
          status: "401",
          message: "MailId already exists"
        });
      } else {
        console.log("New User");
        return res.status(200).json({
          status: "200",
          message: "Success",
          data: mGoogleUser.userResult
        });
      }
    } else {
      return res.json({
        status: "403",
        error: "Error in Source of Login"
      });
    }
  }
};

/**
 * [addGoogleUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function addGithubUser(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      var referenceToken = await getReferenceToken();
      User.find({
          userName: req.body.userName,
          sourceLogin: "1"
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            element.loginStatus = "0",
            element.status = "401",
              element.message = "userName already exists";
            console.log("userName Exist");
            resolve(element);
          } else {
            // create Google User
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              userName: req.body.userName,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              profileImage: req.body.profileImage,
              firebaseId: req.body.firebaseId,
              referenceToken,
              sourceLogin: "1",
              isEmailVerified: "1",
              createdAt: moment().valueOf(),
              lastUpdated: moment().valueOf()
            });
            user.save()
              .then(async (result) => {
                var mBillingDetails = await addBillingDetails(result);
                if (!empty(mBillingDetails)) {
                  console.log("mBillingDetails");
                  resolve(mBillingDetails);
                } else {
                  console.log("mBillingDetails Not");
                  resolve(null);
                }
              }).catch((err) => {
                console.log("log Catch");
                console.log(err);
                resolve(null);
              });
          }
        }).catch((err) => {
          console.log("high Catch");
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [updateAutoUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function updateAutoUser(userResult,req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      console.log("Inside update Auto user");
      console.log(userResult);
      console.log(req.body);
      // Successful.
      var user = new User({
        _id: userResult[0]._id,
        email: req.body.email,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: req.body.profileImage,
        firebaseId: req.body.firebaseId,
        sourceLogin: "1",
        isEmailVerified: "1",
        lastUpdated: moment().valueOf()
      });
      // Data from form is valid. Update the record.
      User.findByIdAndUpdate(userResult[0]._id, user, async function(err) {
        if (err) {
          resolve(null);
        } else { // Successful.
          var mBillingDetails = await addBillingDetails(user);
          if (!empty(mBillingDetails)) {
            console.log("mBillingDetails");
            resolve(mBillingDetails);
          } else {
            console.log("mBillingDetails Not");
            resolve(null);
          }
        }
      });

    }, 1000);
  });
};

/**
 * [checkAutoUserExist] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function checkAutoUserExist(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      console.log("Inside check Auto user");
      User.find({
          userName: req.body.userName,
          sourceLogin: "1"
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            console.log("userName Exist");
            if(user[0].isEmailVerified === "0" && user[0].firebaseId === "0"){
              var mUpdateAutoUser = await updateAutoUser(user,req);
              if (empty(mUpdateAutoUser)) {
                console.log("Cannot update auto user");
                resolve(null);
              }
              else {
                element.status = "200",
                element.message = "Success",
                element.userResult = mUpdateAutoUser;
                resolve(mUpdateAutoUser);
              }
            }
            else {
              element.status = "200",
              element.message = "Not a automated user"
              resolve(element);
            }
          } else {
            console.log("1");
            element.status = "200",
            element.message = "Not a automated user"
            resolve(element);
          }
        }).catch((err) => {
          console.log("2");
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [githubUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function githubUser(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
        var element = {};
        var mCheckAutoUser = await checkAutoUserExist(req);
        if (empty(mCheckAutoUser)) {
          resolve(null);
        }
        else if ((mCheckAutoUser.status === "200" && mCheckAutoUser.message === "Not a automated user")) {
          console.log("Normal login");
        var mCheckUser = await checkFirebaseUser(req.body.firebaseId);
        console.log(mCheckUser);
        if (empty(mCheckUser)) {
          console.log("empty User");
          resolve(null);
        } else if (mCheckUser.status === "401" && mCheckUser.message === "User Authentication Failed") {
          console.log("Github User SignUp");
          //To add User
          var mNewUserInfo = await addGithubUser(req);
          if (empty(mNewUserInfo)) {
            resolve(null);
          } else {
            element.status = "200",
            element.message = "Success",
            element.userResult = mNewUserInfo;
            resolve(element);
          }
        } else {
          element.status = "200",
          element.message = "Success",
          element.userResult = mCheckUser;
          resolve(element);
        }
        }
        else {
          console.log("Updated automated user");
          element.status = "200",
          element.message = "Success",
          element.userResult = mCheckAutoUser;
          resolve(element);
        }
    }, 1000);
  });
};

/**
 * [githubUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
exports.userGithub = async function(req, res) {
  req.checkBody("firstName", "firstName is required").notEmpty();
  req.checkBody("userName", "userName is required").notEmpty();
  req.checkBody("firebaseId", "firebaseId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    if (req.body.sourceLogin === "1") {
      //Github User
      console.log("Github User");
      var mGithubUser = await githubUser(req);
        if (empty(mGithubUser)) {
          return res.status(403).json({
            status: "403",
            error: "Github user not found"
          });
        } else if (mGithubUser.userResult.status === "401" && mGithubUser.userResult.message === "userName already exists") {
          console.log("MailId exist");
          return res.status(401).json({
            status: "401",
            message: "userName already exists"
          });
        } else {
          console.log("New User");
          return res.status(200).json({
            status: "200",
            message: "Success",
            data: mGithubUser.userResult
          });
        }
    } else {
      return res.json({
        status: "403",
        error: "Error in Source of Login"
      });
    }
  }
};

/**
 * [checkReferenceToken] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function checkReferenceToken(referenceToken) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      User.find({
          referenceToken: referenceToken
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            element.status = "401",
              element.message = "referenceToken already exists";
            console.log("referenceToken Exist");
            resolve(element);
          } else {
            // create Google User
            element.status = "200",
              element.message = "referenceToken not Exist";
              console.log("referenceToken not Exist");
              resolve(element);
          }
        }).catch((err) => {
          console.log("high Catch");
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [addGoogleUser] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
async function addAutomatedUser(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var element = {};
      User.find({
          userName: req.body.userName,
          sourceLogin: "1"
        })
        .exec()
        .then(async (user) => {
          if (user.length >= 1) {
            element.loginStatus = "0",
            element.status = "401",
              element.message = "userName already exists";
            console.log("userName Exist");
            resolve(element);
          } else {
            // create Google User
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              userName: req.body.userName,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              profileImage: req.body.profileImage,
              referenceToken:req.body.referenceToken,
              firebaseId: "0",
              sourceLogin: "1",
              isEmailVerified: "0",
              createdAt: moment().valueOf(),
              lastUpdated: moment().valueOf()
            });
            user.save()
              .then(async (result) => {
                  resolve(result);
              }).catch((err) => {
                console.log("log Catch");
                console.log(err);
                resolve(null);
              });
          }
        }).catch((err) => {
          console.log("high Catch");
          resolve(null);
        });
    }, 1000);
  });
};

/**
 * [userAutomatedGithub] - This async method is used to get billingDetail data based on userId.
 * @type {[async function]}
 *
 * @param  {type} userId description
 *
 * @return {type} results.billing
 */
exports.userAutomatedGithub = async function(req, res) {
  req.checkBody("firstName", "firstName is required").notEmpty();
  req.checkBody("userName", "userName is required").notEmpty();
  req.checkBody("referenceToken", "referenceToken is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    if (req.body.sourceLogin === "1") {
      //Github User
      console.log("Github User");
      var mCheckReferToken = await checkReferenceToken(req.body.referenceToken);
      if (mCheckReferToken.status === "200" && mCheckReferToken.message === "referenceToken not Exist") {
        var mAutomatedUser = await addAutomatedUser(req);
        console.log("IN");
        console.log(mAutomatedUser);
          if (empty(mAutomatedUser)) {
            return res.status(403).json({
              status: "403",
              error: "Github user cannot be added"
            });
          } else if (mAutomatedUser.status === "401" && mAutomatedUser.message === "userName already exists") {
            return res.status(401).json({
              status: "401",
              message: "userName already exists"
            });
          } else {
            console.log("New User mAutomatedUser");
            return res.status(200).json({
              status: "200",
              message: "Success",
              data: mAutomatedUser
            });
          }
      }
      else if(mCheckReferToken.status === "401" && mCheckReferToken.message === "referenceToken already exists") {
        return res.status(403).json({
          status: "403",
          error: "referenceToken already exists"
        });
      }
      else {
        return res.status(403).json({
          status: "403",
          error: "Error in referenceToken"
        });
      }
    } else {
      return res.json({
        status: "403",
        error: "Error in Source of Login"
      });
    }
  }
};

module.testExports = {
  getBillingDetail: getBillingDetail,
  addBillingDetails : addBillingDetails,
  getReferenceToken : getReferenceToken,
  addGoogleUser : addGoogleUser,
  checkFirebaseUser : checkFirebaseUser,
  googleUser : googleUser,
  addGithubUser : addGithubUser,
  updateAutoUser : updateAutoUser,
  checkAutoUserExist : checkAutoUserExist,
  githubUser : githubUser,
  checkReferenceToken : checkReferenceToken,
  addAutomatedUser : addAutomatedUser
};
