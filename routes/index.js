/**
 * This file index.js describes default router URL.
 * Used for buildHistoryController,contactUsController & pricingController.
 */

/* Require our controllers. */
var mContactUsController = require("../controllers/contactUsController");
var pricing = require("../controllers/pricingController");

/* Requires dependency npm. */
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (process.env.JENKINS_URL === null) {
    res.status(200).json({
      status: 200,
      message: "Sorry Please set your Env Variable"
    });
  } else {
    res.status(200).json({
      status: 200,
      message: "Welcome to Justops Engine"
    });
  }
});


/* pricingController */
/* post URL for update pricing plan*/
router.post("/updatePlan", pricing.updatePlan);
/* post URL for getting trial days and pricing detail*/
router.post("/getTrialDays", pricing.getTrialDays);

/* contactUsController */
/* post URL for sending Contact US/Schedule Demo Email*/
router.post("/contactUs", mContactUsController.createContactUsReport);

module.exports = router;
