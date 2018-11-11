/**
 * This file jobController.js deals with deploy the build and get status Info and Build stream log from Jenkins.
 * Used for Deploying the Job in Jenkins and get corresponding Stage info and Build stream log from Jenkins.
 * Export Methods are deployJob(req, res, next), stageInfo(req, res) and buildStream(req, res).
 * Private methods are getbuild(jobJenkinsName), validateJob(jobId), updateJobStatus(jobId), startBuildHistory(resultJob,buildNumber), getStageUrl(jobJenkinsName),
 * getJobInfo(jobId), getReportCondition(parsedata),
 */

/* Require our Models. */
var BuildHistory = require("../models/buildHistorySchema");
var Job = require("../models/jobSchema");
var Stage = require("../models/stageSchema");
var config = require("../config");

/* Requires dependency npm. */
var moment = require("moment");
var mUrl = config.jenkinsUrl;
var mReportUrl = config.reportUrl;
var jenkins = require("jenkins")({
  baseUrl: mUrl,
  crumbIssuer: true
});
var empty = require("is-empty");
var request = require("request");
var async = require("async");
var scraperjs = require("scraperjs");

/**
 * [getbuild] - This async method is used to get build status with nextBuildNumber from Jenkins based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {String} jobJenkinsName
 *
 * @return {Boolean} data.nextBuildNumber
 */
async function getbuild(jobJenkinsName) {
  return new Promise(resolve => {
    setTimeout(() => {
      jenkins.job.get(jobJenkinsName, function(err, data) {
        if ((err != null)) {
          resolve(null);
        } else {
          resolve(data.nextBuildNumber);
        }
      });
    }, 1000);
  });
};


/**
 * [validateJob] - This async method is used to validate job information based on jobId in DB.
 * @type {[async function]}
 *
 * @param  {String} jobId
 *
 * @return {type} results.checkJobId
 */
async function validateJob(jobId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
          checkJobId: function(callback) {
            Job.find({
                _id: jobId
              })
              .exec(callback);
          },
        },
        function(err, results) {
          if (empty(results.checkJobId)) {
            resolve(null);
          } else {
            resolve(results.checkJobId);
          }
        }
      );
    }, 2000);
  });
};

/**
 * [updateJobStatus] - This async method is used to get build status with nextBuildNumber from Jenkins based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {String} jobJenkinsName
 *
 * @return {Boolean} data.nextBuildNumber
 */
async function updateJobStatus(jobId) {
  return new Promise(resolve => {
    setTimeout(() => {
      var lastUpdated = moment().valueOf();
      //Update lastDeployStatus, overAllBuildTime, noOfDeploy and lastUpdated in Job table based on JobId
      var job = new Job({
        _id: jobId,
        lastDeployStatus: "1",
        lastUpdated
      });
      Job.findByIdAndUpdate(jobId, job, async function(err) {
        if (err) {
          resolve(false);
        } else {
          // Successful - redirected to new buildHistory record.
          resolve(true);
        }
      });
    }, 1000);
  });
};

/**
 * [startBuildHistory] - This async method is used to get build status with nextBuildNumber from Jenkins based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {String} jobJenkinsName
 *
 * @return {Boolean} data.nextBuildNumber
 */
async function startBuildHistory(resultJob, buildNumber) {
  return new Promise(resolve => {
    setTimeout(() => {
      var timeNow = moment().valueOf();
      console.log(resultJob[0].userId);
      //Create BuildHistory
      var buildHistory = new BuildHistory({
        userId: resultJob[0].userId,
        jobId: resultJob[0]._id,
        jobJenkinsName: resultJob[0].jobJenkinsName,
        buildNumber,
        buildStatus: "0",
        buildStartTime: "0",
        buildEndTime: "0",
        buildDuration: "0",
        utStatus: "1",
        ccStatus: "1",
        crStatus: "1",
        e2eStatus: "1",
        ptStatus: "1",
        createdAt: timeNow,
        lastUpdated: timeNow
      });
      buildHistory.save(function(err) {
        if (err) {
          console.log(err);
          resolve(null);
        } else {
          // console.log(buildHistory);
          resolve(buildHistory.buildHistoryId);
        }
      });
    }, 1000);
  });
};

/**
 * [deployJob] - This async method is used to deploy build in Jenkins using nextBuildNumber based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {[String]} req [jobJenkinsName]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[Json]} res [data]
 */
exports.deployJob = async function(req, res) {
  var jobJenkinsName = req.body.jobJenkinsName;
  var jobId = req.body.jobId;

  // Validation
  req.checkBody("jobJenkinsName", "jobJenkinsName is required").notEmpty();
  req.checkBody("jobId", "jobId is not a mongoId").isLength({
    min: 24,
    max: 24
  });
  req.checkBody("jobId", "jobId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    //Validate Job based on jobId.
    var resultJob = await validateJob(jobId);
    if (empty(resultJob)) {
      return res.status(401).json({
        status: "401",
        message: "Job details mismatch"
      });
    }
    var buildNumber = await getbuild(jobJenkinsName);
    if (buildNumber === null) {
      return res.json({
        status: 403,
        message: "build failed"
      });
    }
    if (buildNumber != null) {
      jenkins.job.build(jobJenkinsName, async function(err, data) {
        if (err && data === null) {
          return res.json({
            status: 403,
            message: "build failed to initiate"
          });
        } else {
          var mCreateBuildHistory = await startBuildHistory(resultJob, buildNumber);
          var mUpdateJobStatus = await updateJobStatus(jobId);
          console.log("***");
          console.log(mCreateBuildHistory);
          console.log(mUpdateJobStatus);
          if (mCreateBuildHistory !== null && mUpdateJobStatus) {
            return res.json({
              status: 200,
              message: "build on queue",
              data: [{
                "name": jobJenkinsName,
                "buildNumber": buildNumber,
                "buildHistoryId": mCreateBuildHistory
              }]
            });
          } else {
            return res.json({
              status: 403,
              message: "build failed to updateJobStatus "
            });
          }
        }
      });
    }
  }
};

/**
 * [getStageUrl] - This method is used to get stage url from Stage table in DB based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName

 * @return {[Json]} results.stage
 */
async function getStageUrl(jobJenkinsName) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
        stage(callback) {
          Stage.find({
              "job": jobJenkinsName
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        console.log(results);
        // Error in API usage
        if (empty(results.stage)) {
          resolve(null);
        } else {
          resolve(results.stage);
        }
        // Successful, so render.
        resolve(results.stage);
      });
    }, 1000);
  });
};

/**
 * [getJobInfo] - This method is used to get Job Info from Job table based on JobId search.
 * @type {[async function]}
 *
 * @param  {[String]} jobId
 *
 * @return {[Json]} results.job
 */
async function getJobInfo(jobId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
        job(callback) {
          Job.findOne({
              "_id": jobId
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        // Error in API usage
        if (results.job === null) { // No results.
          resolve(null);
        }
        // Successful, so render.
        resolve(results.job);
      });
    }, 1000);
  });
};

/**
 * [getReportStatus] - This method is used to check individual report is generated or not in Jenkins.
 * @type {[async function]}
 *
 * @param  {[String]} mUrl
 *
 * @return {[Json]} reportList
 */
async function getReportStatus(buildHistoryId) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var testCaseList = {};
      testCaseList.utStatus = "1",
        testCaseList.ccStatus = "1",
        testCaseList.crStatus = "1",
        testCaseList.e2eStatus = "1",
        testCaseList.ptStatus = "1";
      async.parallel({
        buildHistory(callback) {
          BuildHistory.find({
              "_id": buildHistoryId
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        } else {
          // Error in API usage
          if (empty(results.buildHistory[0])) { // No results.
            resolve(null);
          }
          // Successful, so render.
          //console.log(results.buildHistory);
          testCaseList.utStatus = results.buildHistory[0].utStatus,
            testCaseList.ccStatus = results.buildHistory[0].ccStatus,
            testCaseList.crStatus = results.buildHistory[0].crStatus,
            testCaseList.e2eStatus = results.buildHistory[0].e2eStatus,
            testCaseList.ptStatus = results.buildHistory[0].ptStatus;
          resolve(testCaseList);
        }
      });

    }, 1000);
  });
};

/**
 * [getReportCondition] - This method is get Job Test Case Status from DB.
 * @type {[async function]}
 *
 * @param  {[String]} mUrl
 *
 * @return {[Json]} reportList
 */
async function getReportCondition(parsedata) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var reportList = {};
      reportList.checkUt = false,
        reportList.checkPt = false,
        reportList.checkCct = false,
        reportList.checkCrt = false,
        reportList.checkE2e = false,
        reportList.checkDeploy = false;

      parsedata.forEach(async function(element) {
        var parseStageData = element.stages;
        parseStageData.forEach(async function(elementData) {
          switch (elementData.name) {
            case "Continous Testing - Unit Test":
              if (elementData.status === "SUCCESS") {
                reportList.checkUt = true;
              }
              break;
            case "Continous Testing - Code Coverage Test":
              if (elementData.status === "SUCCESS") {
                reportList.checkCct = true;
              }
              break;
            case "Continous Testing - Performance Testing - Audit & Performance Metrics":
              if (elementData.status === "SUCCESS") {
                reportList.checkPt = true;
              }
              break;
            case "Continous Inspection - Code Review":
              if (elementData.status === "SUCCESS") {
                reportList.checkCrt = true;
              }
              break;
            case "Continous Testing - End to End Testing":
              if (elementData.status === "SUCCESS") {
                reportList.checkE2e = true;
              }
              break;
            case "Deploy":
              if (elementData.status === "SUCCESS") {
                reportList.checkDeploy = true;
              }
              break;
            default:
              break;
          }
        });
      });

      parsedata.forEach(async function(element) {
        reportList.buildStatus = element.status;
      });
      resolve(reportList);
    }, 6000);
  });
};



/**
 * [stageInfo] - This method is used to get stageInfo about specific Job from Jenkins based on jobJenkinsName and buildNumber.
 * @type {[async function]}
 *
 * @param  {[String]} req [jobJenkinsName]
 * @param  {[String]} req [buildNumber]
 * @param  {[String]} req [jobId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[Json]}   res [data]
 * @return {[String]} res [checkUt]
 * @return {[String]} res [checkPt]
 * @return {[String]} res [checkCct]
 * @return {[String]} res [checkE2e]
 * @return {[String]} res [checkSonar]
 * @return {[String]} res [stageUrl]
 */
exports.stageInfo = async function(req, res, next) {
  var jobJenkinsName = req.body.jobJenkinsName,
    buildNumber = req.body.buildNumber;
  var jobId = req.body.jobId;
  var checkDeploy = false;
  var stageUrl = "";

  // Validation
  req.checkBody("jobJenkinsName", "jobJenkinsName is required").notEmpty();
  req.checkBody("buildNumber", "buildNumber is required").notEmpty();
  req.checkBody("jobId", "jobId is required").notEmpty();
  req.checkBody("buildHistoryId", "buildHistoryId is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var getJobDetails = await getJobInfo(jobId);
    if (getJobDetails === null) {
      return res.status(403).json({
        status: "403",
        message: "Job not found"
      });
    } else {

      var url = {
        "url": mUrl + "/job/" + jobJenkinsName + "/" + buildNumber + "/wfapi/describe",
        headers: {
          "content-type": "application/json"
        }
      };
      request(url, async (error, response, body) => {
        if (error) {
          return res.json({
            status: 403,
            message: "bad request",
            data: error
          });
        }
        if (response.statusCode === 200) {
          var buildStatus;
          var jsonData = "[" + body + "]";
          var parsedata = JSON.parse(jsonData);

          //Check get List of successful test cases
          var getReportList = await getReportCondition(parsedata);
          console.log(getReportList);

          // get Job Test Case Status from DB.
          var getTestCaseList = await getReportStatus(req.body.buildHistoryId);
          console.log(getTestCaseList);

          if (getReportList.buildStatus === "FAILED" || getReportList.buildStatus === "SUCCESS") {
            if (getReportList.checkDeploy) {
              var mStageUrl = await getStageUrl(jobJenkinsName + "-stage");
              if (mStageUrl.length === 0) {
                stageUrl = "";
              } else {
                stageUrl = "http://" + mStageUrl[0].ip + ":3000";
              }
            } else {
              stageUrl = "";
            }
          }
          return res.json({
            status: 200,
            message: "request successful",
            data: [JSON.parse(body)],
            testCaseList: getTestCaseList,
            stageUrl
          });
        } else {
          return res.json({
            status: response.statusCode,
            message: "bad request",
            error: body
          });
        }
      });
    }
  }
};

/**
 * [buildStream] - This method is used to get Build Streaming Log about specific Job from Jenkins based on jobJenkinsName and buildNumber.
 * @type {[async function]}
 *
 * @param  {[String]} req [jobJenkinsName]
 * @param  {[String]} req [buildNumber]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[Json]}   res [data]
 */
exports.buildStream = async function(req, res, next) {

  var jobJenkinsName = req.body.jobJenkinsName,
    buildNumber = req.body.buildNumber;

  // Validation
  req.checkBody("jobJenkinsName", "jobJenkinsName is required").notEmpty();
  req.checkBody("buildNumber", "buildNumber is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    jenkins.build.log({
      name: jobJenkinsName,
      number: buildNumber,
      type: "html"
    }, (err, data) => {
      if (err) {
        return res.json({
          status: 403,
          message: "bad request"
        });
      }
      res.setHeader("content-type", "application/html");
      return res.status(200).json({
        status: "200",
        message: "Success",
        data: data
      });
    });
  }
};



/**
 * [githubUserInfo] - This method is to get the github repository list for the particular user by using Access token
 * @type {[async function]}
 *
 * @param  {[String]} req [authCode]
 *
 * @return {[type]} res [status]
 * @return {[type]} res [message]
 * @return {[type]} res [data]
 * @return {[type]} res [accesstoken]
 * @return {[type]} res [datalength]
 */
exports.githubUserInfo = async function(req, res) {
  var accesstoken = req.body.accesstoken;
  var list, resultData = [],
    repoName, gitUrl;
  req.checkBody("accesstoken", "accesstoken is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var options = {
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        "Cache-Control": "no-cache",
        "user-agent": "node.js",
        authorization: "Bearer " + accesstoken
      }
    };
    request(options, async function(error, response, body) {
      if (error) {
        res.status(403).json({
          status: "403",
          message: "Not vaild authCode"
        });
      } else {
        console.log(response);
        console.log(response.statusCode);
        if (response.statusCode === 200) {
          return res.status(200).json({
            status: 200,
            message: "Success",
            data: [JSON.parse(body)]
          });
        } else {
          return res.status(401).json({
            status: 401,
            message: "Github auth failed"
          });
        }
      }
    });
  }
};


module.testExports = {

  getbuild: getbuild,
  validateJob: validateJob,
  updateJobStatus: updateJobStatus,
  startBuildHistory: startBuildHistory,
  getStageUrl: getStageUrl,
  getJobInfo: getJobInfo,
  getReportCondition: getReportCondition
};
