/**
 * This file buildHistoryController.js deals with creating and updating buildHistory data in buildHistorySchema table.
 * Used for creation and updation of buildHistory data into buildHistorySchema table.
 * Export Methods are createBuild(req, res, next)
 * Private methods are validateUser(userId), validateJob(jobId),addBuildHistory(buildHistory,resultJob),updateBuild(req),findBuild(jobJenkinsName,buildNumber),getJobInfo(jobId),getBuildStatus(jobJenkinsName,buildNumber,buildStatus),updateBuildStatus(resultBuildId,parseData,jobDetail) and validateJob(jobId).
 */

/* Require our Model. */
var BuildHistory = require("../models/buildHistorySchema");
var User = require("../models/userSchema");
var Job = require("../models/jobSchema");
var config = require("../config");

/* Requires dependency npm. */
var moment = require("moment");
var async = require("async");
var empty = require("is-empty");
var mUrl = config.jenkinsUrl;
var request = require("request");

/**
 * [validateUser] - This async method is used to validate user information based on userId in DB.
 * @type {[async function]}
 *
 * @param  {type} userId
 *
 * @return {type} results.checkUserId
 */
async function validateUser(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      async.series({
          checkUserId: function(callback) {
            User.find({
                _id: userId
              })
              .exec(callback);
          },
        },
        function(err, results) {
          if (empty(results.checkUserId)) {
            resolve(null);
          } else {
            resolve(results.checkUserId);
          }
        }
      );
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
 * [addBuildHistory] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function addBuildHistory(req,resultJob) {
  return new Promise(resolve => {
    setTimeout(() => {
      var createdAt = moment().valueOf(),
        lastUpdated = moment().valueOf(),
        jobId = req.body.jobId;
      // create BuildHistory
      var buildHistory = new BuildHistory({
        userId:req.body.userId,
        jobId,
        jobJenkinsName: resultJob[0].jobJenkinsName,
        buildNumber: req.body.buildNumber,
        buildStatus: req.body.buildStatus,
        buildStartTime: req.body.buildStartTime,
        buildEndTime: req.body.buildEndTime,
        buildDuration: req.body.buildDuration,
        utStatus: "1",
        ccStatus: "1",
        crStatus: "1",
        e2eStatus: "1",
        ptStatus: "1",
        createdAt,
        lastUpdated
      });
      buildHistory.save(function(err) {
        if (err) {
          resolve(null);
        }
        var mOverAllBuildTime = parseInt(resultJob[0].overAllBuildTime) + parseInt(req.body.buildDuration);
        var mNoOfDeploy = parseInt(resultJob[0].noOfDeploy) + 1;
        var job = new Job({
          _id: jobId,
          lastDeployStatus: req.body.buildStatus,
          overAllBuildTime: mOverAllBuildTime,
          noOfDeploy: mNoOfDeploy,
          lastUpdated
        });
        Job.findByIdAndUpdate(jobId, job, function(err) {
          if (err) {
            resolve(null);
          } else {
            resolve(buildHistory.buildHistoryId);
          }
        });
      });
    }, 2000);
  });
};

/**
 * [createBuild] - This POST method is used to create an entry on buildHistory data into table.
 *
 * @param {[String]} req [userId]
 * @param {[String]} req [jobId]
 * @param {[String]} req [buildNumber]
 * @param {[String]} req [buildStatus]
 * @param {[String]} req [buildStartTime]
 * @param {[String]} req [buildEndTime]
 * @param {[String]} req [buildDuration]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [buildHistoryId]
 */
exports.createBuild = async function(req, res) {
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("userId", "userId is not a mongoId").isLength({min: 24,max: 24});
  req.checkBody("jobId", "jobId is not a mongoId").isLength({min: 24,max: 24});
  req.checkBody("jobId", "jobId is required").notEmpty();
  req.checkBody("buildNumber", "buildNumber is required").notEmpty();
  req.checkBody("buildStatus", "buildStatus is required").notEmpty();
  req.checkBody("buildStartTime", "buildStartTime is required").notEmpty();
  req.checkBody("buildEndTime", "buildEndTime is required").notEmpty();
  req.checkBody("buildDuration", "buildDuration is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    //Validate user based on userId.
    var resultUser = await validateUser(req.body.userId);
    if (empty(resultUser)) {
      return res.status(401).json({
        status: "401",
        message: "User does not exist"
      });
    }
    //Validate Job based on jobId.
    var resultJob = await validateJob(req.body.jobId);
    if (empty(resultJob)) {
      return res.status(401).json({
        status: "401",
        message: "Job details mismatch"
      });
    }
    //create BuildHistory in BuildHistory DB.
    var resultHistory = await addBuildHistory(req,resultJob);
    if (resultHistory !== null) {
      return res.status(200).json({
        status: "200",
        message: "BuildHistory Created Successful",
        buildHistoryId: resultHistory
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "BuildHistory Created UnSuccessful"
      });
    }
  }
};

/**
 * [addBuildHistory] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function updateBuild(req) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var lastUpdated = moment().valueOf();
      var update = "";

      var query = { /* query object to find records that need to be updated */
        "jobJenkinsName": req.body.jobJenkinsName,
        "buildNumber":req.body.buildNumber
      }
      switch (req.body.testCase) {
        case "0":
          update = {"$set": {"utStatus": req.body.testCaseResult, buildStatus:"1"}};
          break;
        case "1":
          update = {"$set": {"ccStatus": req.body.testCaseResult, buildStatus:"1"}};
          break;
        case "2":
          update = {"$set": {"crStatus": req.body.testCaseResult, buildStatus:"1"}};
          break;
        case "3":
          update = {"$set": {"e2eStatus": req.body.testCaseResult, buildStatus:"1"}};
          break;
        case "4":
          update = {"$set": {"ptStatus": req.body.testCaseResult, buildStatus:"1"}};
          break;
        default:
         break;
      }

      BuildHistory.update(query, update, async function(err, results)
      {
        if (err) {
          resolve(false);
        }
        else {
          resolve(true);
        }
      });
    }, 2000);
  });
};

/**
 * [updateBuildHistory] - This POST method is used to update an entry on buildHistory data into table based on Build HistoryId.
 *
 * @param {[String]} req [userId]
 * @param {[String]} req [jobId]
 * @param {[String]} req [buildNumber]
 * @param {[String]} req [buildStatus]
 * @param {[String]} req [buildStartTime]
 * @param {[String]} req [buildEndTime]
 * @param {[String]} req [buildDuration]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [buildHistoryId]
 */
exports.updateBuildHistory = async function(req, res) {
  req.checkBody("jobJenkinsName", "jobJenkinsName is required").notEmpty();
  req.checkBody("buildNumber", "buildNumber is required").notEmpty();
  req.checkBody("testCase", "testCase is required").notEmpty();
  req.checkBody("testCaseResult", "testCaseResult is required").notEmpty();
  req.checkBody("testCaseResult", "testCaseResult status is in valid").isInt({ lt: 3 });
  req.checkBody("testCaseResult", "testCaseResult status is in valid").isInt({ gt: -1 });
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "400",
      message: errors
    });
  } else {

    //create BuildHistory in BuildHistory DB.
    var resultHistory = await updateBuild(req);
    if (resultHistory === true) {
      return res.status(200).json({
        status: "200",
        message: "BuildHistory Created Successful"
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: err
      });
    }
  }
};


/**
 * [reportStatus] - This POST method is used to update an entry on buildHistory data into table based on Build HistoryId.
 *
 * @param {[String]} req [userId]
 * @param {[String]} req [jobId]
 * @param {[String]} req [buildNumber]
 * @param {[String]} req [buildStatus]
 * @param {[String]} req [buildStartTime]
 * @param {[String]} req [buildEndTime]
 * @param {[String]} req [buildDuration]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [buildHistoryId]
 */
exports.reportStatus = async function(req, res) {
  async.parallel({
    buildHistory(callback) {
      BuildHistory.find({
          "_id": req.params.buildHistoryId
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
    if (empty(results.buildHistory[0])) { // No results.
      return res.status(401).json({
        status: 401,
        message: "buildHistory not found"
      });
    }
    // Successful, so render.
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: results.buildHistory
    });
  });
};


/**
 * [findBuild] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function findBuild(jobJenkinsName,buildNumber) {
  return new Promise(resolve => {
    setTimeout(async () => {
      async.series({
        buildHistory(callback) {
          BuildHistory.find({
              jobJenkinsName,
              buildNumber
            })
            .exec(callback);
        },
      }, function(err, results) {
        if (err) {
          resolve(null);
        }
        // Error in API usage
        if (empty(results.buildHistory)) { // No results.
           resolve(null);
        }
        // Successful, so render.
        resolve(results.buildHistory);
      });
    }, 2000);
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
        if (empty(results.job)) { // No results.
          resolve(null);
        }
        // Successful, so render.
        resolve(results.job);
      });
    }, 1000);
  });
};

/**
 * [getBuildStatus] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function getBuildStatus(jobJenkinsName,buildNumber,buildStatus) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var url = {
        "url": mUrl + "/job/" + jobJenkinsName + "/" + buildNumber + "/wfapi/describe",
        headers: {
          "content-type": "application/json"
        }
      },element={};
      request(url, async (error, response, body) => {
        if (error) {
          resolve(null);
        }
        if (response.statusCode === 200) {
          var jsonData = "[" + body + "]";
          var parseData = JSON.parse(jsonData);
          element.buildStartTime = parseData[0].startTimeMillis,
          element.buildEndTime = parseData[0].endTimeMillis,
          element.buildDuration = parseData[0].durationMillis;
          if (buildStatus === "SUCCESS") {
            element.buildStatus = "2" ;
          }
          else {
            element.buildStatus = "3" ;
          }
          resolve(element);
        } else {
          resolve(null);
        }
      });
    }, 2000);
  });
};

/**
 * [updateBuildStatus] - This async method is used to create Build History in BuildHistory DB.
 * @type {[async function]}
 *
 *  @param  {json} req
 *  @param  {json} resultJob
 *
 * @return {Boolean} true
 */
async function updateBuildStatus(resultBuildId,parseData,jobDetail) {
  return new Promise(resolve => {
    setTimeout(async () => {
      var lastUpdated = moment().valueOf();
      // Successful.
      var buildHistory = new BuildHistory({
        _id:resultBuildId[0]._id,
        buildStatus:parseData.buildStatus,
        buildStartTime:parseData.buildStartTime,
        buildEndTime:parseData.buildEndTime,
        buildDuration:parseData.buildDuration,
        lastUpdated
      });
      // Data from form is valid. Update the record.
      BuildHistory.findByIdAndUpdate(resultBuildId[0]._id, buildHistory, async function(err) {
        if (err) {
          resolve(false);
        } else {
          // Successful.
          var mOverAllBuildTime = parseInt(jobDetail.overAllBuildTime) + parseInt(parseData.buildDuration);
          var mNoOfDeploy = parseInt(jobDetail.noOfDeploy) + 1;
          var job = new Job({
            _id:jobDetail._id,
            lastDeployStatus: parseData.buildStatus,
            overAllBuildTime: mOverAllBuildTime,
            noOfDeploy: mNoOfDeploy,
            lastUpdated
          });
          Job.findByIdAndUpdate(jobDetail._id, job, function(err) {
            if (err) {
              resolve(false);
            } else {
              resolve(true);
            }
          });
        }
      });
    }, 2000);
  });
};

/**
 * [updateFinalBuild] - This POST method is used to update an entry on buildHistory data into table based on Build HistoryId.
 *
 * @param {[String]} req [userId]
 * @param {[String]} req [jobId]
 * @param {[String]} req [buildNumber]
 * @param {[String]} req [buildStatus]
 * @param {[String]} req [buildStartTime]
 * @param {[String]} req [buildEndTime]
 * @param {[String]} req [buildDuration]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [buildHistoryId]
 */
exports.updateFinalBuild = async function(req, res) {
  req.checkBody("jobJenkinsName", "jobJenkinsName is required").notEmpty();
  req.checkBody("buildNumber", "buildNumber is required").notEmpty();
  req.checkBody("buildStatus", "buildStatus is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    //create BuildHistory in BuildHistory DB.
    var resultBuildId = await findBuild(req.body.jobJenkinsName,req.body.buildNumber);
    if (empty(resultBuildId)) {
      return res.status(403).json({
        status: "403",
        message: errors
      });
    }
    var getJobDetails = await getJobInfo(resultBuildId[0].jobId);
    if (empty(getJobDetails)) {
      return res.status(403).json({
        status: "403",
        message: "Job not found"
      });
    }

    var mBuildStatus = await getBuildStatus(req.body.jobJenkinsName,req.body.buildNumber,req.body.buildStatus);
    if (empty(resultBuildId)) {
      return res.status(403).json({
        status: "403",
        message: errors
      });
    }

    var updateStatus = await updateBuildStatus(resultBuildId,mBuildStatus,getJobDetails);
    if (updateStatus === true) {
      return res.status(200).json({
        status: "200",
        message: "BuildHistory Created Successful"
      });
    } else {
      return res.status(401).json({
        status: 401,
        message: "Update Failed"
      });
    }
  }
};
module.testExports = {
validateUser : validateUser,
validateJob : validateJob,
addBuildHistory : addBuildHistory,
updateBuild : updateBuild,
findBuild : findBuild,
getJobInfo : getJobInfo,
getBuildStatus : getBuildStatus,
updateBuildStatus : updateBuildStatus
};
