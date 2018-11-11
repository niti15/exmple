/**
 * This file activityController.js deals with activityInfo for activity Log page.
 * Used for activity information including Job test report url and percentage calculation.
 * Export Methods are activityInfo(req, res, next)
 * Private methods are validateBuildHistory(buildHistoryId),validateJobDetails(jobId),getReportList(buildHistory,jobDetails)
 * and getGradeDetails(successRate).
 */

/* Require our Models. */
var Job = require("../models/jobSchema");
var BuildHistory = require("../models/buildHistorySchema");
var config = require("../config");

/* Requires dependency npm. */
var request = require("request");
var async = require("async");
var scraperjs = require("scraperjs");
var mUrl = config.jenkinsUrl;
var mReportUrl = config.reportUrl;
var empty = require("is-empty");

/**
 * [validateBuildHistory] - This async method is used to get BuildHistory data based on buildHistoryId.
 * @type {[async function]}
 *
 * @param  {String} buildHistoryId
 *
 * @return {Json} result.buildHistory
 */
async function validateBuildHistory(buildHistoryId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
        buildHistory(callback) {
          BuildHistory.find({
              "_id": buildHistoryId
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        // Empty data validation
        if (empty(results.buildHistory)) {
          // No results.
          resolve(null);
        }
        // Successful, so render.
        resolve(results.buildHistory);
      });
    }, 1000);
  });
};

/**
 * [validateJobDetails] - This async method is used to get Job data based on jobId.
 * @type {[async function]}
 *
 * @param  {String} jobId
 *
 * @return {Json} results.job
 */
async function validateJobDetails(jobId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
        job(callback) {
          Job.find({
              "_id": jobId
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        // Error in API usage
        if (empty(results.job)) {
          // No results.
          resolve(null);
        }
        // Successful, so render.
        resolve(results.job);
      });
    }, 1000);
  });
};

/**
 * [getReportList] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function getReportList(buildHistory,jobDetails) {
  return new Promise(resolve => {
    setTimeout(async () => {
      console.log(buildHistory[0].jobJenkinsName);
      console.log(buildHistory[0].buildNumber);
      console.log(jobDetails[0].sonarqUrl);
        var element = {};
        element.successRate = 0,
        element.utUrl = "",
        element.ccUrl = "",
        element.ptUrl = "",
        element.crUrl = "",
        element.e2eUrl = "";
      if (buildHistory[0].utStatus === "0") {
        element.successRate =element.successRate+1;
        element.utUrl = mReportUrl +"/"+ buildHistory[0].jobJenkinsName + "/builds/" + buildHistory[0].buildNumber + "/htmlreports/Unit_20Testing_20Report/mochawesome.html";
      }
      if (buildHistory[0].ccStatus === "0") {
        element.successRate =element.successRate+1;
        element.ccUrl = mReportUrl +"/"+ buildHistory[0].jobJenkinsName + "/builds/" + buildHistory[0].buildNumber + "/htmlreports/Code_20Coverage_20Testing_20Report/";
      }
      if (buildHistory[0].crStatus === "0") {
        element.successRate =element.successRate+1;
        element.crUrl = jobDetails[0].sonarqUrl + "/dashboard/index/" + buildHistory[0].jobJenkinsName;
      }
      if (buildHistory[0].e2eStatus === "0") {
        element.successRate =element.successRate+1;
        element.e2eUrl = mReportUrl +"/"+ buildHistory[0].jobJenkinsName + "/builds/" + buildHistory[0].buildNumber + "/htmlreports/e2e_20result/report.html";
      }
      if (buildHistory[0].ptStatus === "0") {
        element.successRate =element.successRate+1;
        element.ptUrl = mReportUrl +"/"+ buildHistory[0].jobJenkinsName + "/builds/" + buildHistory[0].buildNumber + "/htmlreports/Web_20Apps_20Performance_20Metrics_20Report/lighthouse-report.html";
      }
      resolve(element);
    }, 2000);
  });
};

/**
 * [getGradeDetails] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function getGradeDetails(successRate) {
  return new Promise(resolve => {
    setTimeout(async () => {
      console.log(successRate);
      var element = {};

      //Percentage and Grade calculation based on Report result
      element.gradePercentage = (successRate * 20);

      switch (true) {
        case (element.gradePercentage >= 90):
          element.gradeValue = "A+";
          break;
        case (element.gradePercentage >= 80 && element.gradePercentage <= 89):
          element.gradeValue = "A";
          break;
        case (element.gradePercentage >= 70 && element.gradePercentage <= 79):
          element.gradeValue = "B";
          break;
        case (element.gradePercentage >= 60 && element.gradePercentage <= 69):
          element.gradeValue = "C";
          break;
        case (element.gradePercentage >= 50 && element.gradePercentage <= 59):
          element.gradeValue = "D";
          break;
        case (element.gradePercentage <= 49):
          element.gradeValue = "E";
          break;
        default:
          element.gradeValue = "E";
          break;
      }
      resolve(element);
    }, 2000);
  });
};

/**
 * [activityInfo] - This POST method is used to get activity information including Job test report url and percentage calculation.
 * @type {[function(req, res, next)]}
 *
 * @param {[String]} req [jobJenkinsName]
 * @param {[String]} req [buildNumber]
 * @param {[String]} req [buildHistoryId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[Json]} res [data]
 * @return {[String]} res [gradeValue]
 * @return {[String]} res [gradePercentage]
 * @return {[String]} res [utStatus]
 * @return {[String]} res [utUrl]
 * @return {[String]} res [ccStatus]
 * @return {[String]} res [ccUrl]
 * @return {[String]} res [ptStatus]
 * @return {[String]} res [ptUrl]
 * @return {[String]} res [crStatus]
 * @return {[String]} res [crUrl]
 * @return {[String]} res [e2e2eStatus]
 * @return {[String]} res [e2eUrl]
 * @return {[Json]} res [buildHistory]
 * @return {[Json]} res [jobDetails]
 */
exports.activityInfo = async function(req, res, next) {
  var buildHistoryId = req.body.buildHistoryId;

  //Varaible declaration
  var checkUt = false,
    checkPt = false,
    checkCct = false,
    checkE2e = false,
    checkSonar = false;
  var gradePercentage = 0,successRate = 0;
  var gradeValue;

  // Validation
  req.checkBody("buildHistoryId", "buildHistoryId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    //To Check whether buildHistoryId is valid or not.
    var mBuildHistory = await validateBuildHistory(buildHistoryId);

    if (empty(mBuildHistory)) {
      return res.json({
        status: 401,
        error: "No BuildHistory found"
      });
    }
    //To get jobdetails
    var jobDetails = await validateJobDetails(mBuildHistory[0].jobId);
    if (empty(jobDetails)) {
      return res.json({
        status: 401,
        error: "No job Details found"
      });
    }

    console.log(jobDetails);
    console.log(mBuildHistory);


    var reportUrlList = await getReportList(mBuildHistory,jobDetails);
    if (empty(reportUrlList)) {
      return res.json({
        status: 401,
        error: "No reportList is made"
      });
    }
    console.log(reportUrlList);

    //To get gradePercentage
    var gradeDetails = await getGradeDetails(reportUrlList.successRate);
    if (empty(gradeDetails)) {
      return res.json({
        status: 401,
        error: "No Grade Calculation is made"
      });
    }

    return res.json({
      status: 200,
      message: "request successful",
      gradeValue:gradeDetails.gradeValue,
      gradePercentage:gradeDetails.gradePercentage,
      reportUrlList,
      buildHistoryDetail:mBuildHistory[0],
      jobDetails:jobDetails[0]
    });
  }
}

module.testExports = {
validateBuildHistory : validateBuildHistory,
validateJobDetails : validateJobDetails,
getReportList : getReportList,
getGradeDetails : getGradeDetails
};
