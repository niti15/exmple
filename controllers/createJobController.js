/**
 * This file createJobController.js deals with creation and deletion of Job data in Job table from DB.
 * Used for create Job based on job name check and DO api key check and delete job
 * both droplets from corresponding Do account and Job data from Job table, Slave table, Registry table, Stage table in DB.
 * Export Methods are checkJobName(req, res, next), checkSonarQ(req, res), checkDigitalApi(req, res),
 * githubRepoList(req, res), gitHubBranchList(req, res), createJob(req, res) and deleteJob(req, res, next)
 * Private methods are checkJenkinsJobName(jobJenkinsName), checkSonarQUrl(sonarqUrl), checkSonarQToken(sonarqUrl, sonarqApi),jobJenkinsDelete(jobJenkinsName),
 * configPipelineJob(element, jobJenkinsName, envVar, envCmd), createPipelineJob(jobJenkinsName, fileName), getDigitalApiKey(jobId), slaveDbDelete(jobJenkinsName),
 * registryDbDelete(jobJenkinsName), stageDbDelete(jobJenkinsName)
 */

/* Require our Models. */
var Job = require("../models/jobSchema");
var Slave = require("../models/slaveSchema");
var Registry = require("../models/registrySchema");
var Stage = require("../models/stageSchema");
var config = require("../config");
var buildhistory = require("../models/buildHistorySchema");
/* Requires dependency npm. */
var moment = require("moment");
var fs = require("fs"),
  request = require("request");
var request = require("request");
var async = require("async");
var moment = require("moment");
var async = require("async");
//Initialize jenkinsUrL
var mUrl = config.jenkinsUrl;
var jenkins = require("jenkins")({
  baseUrl: mUrl,
  crumbIssuer: true
});


/**
 * [checkJenkinsJobName] - This async method is used to check Jenkins JobName based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {String} userId
 *
 * @return {Boolean} checkResult
 */
async function checkJenkinsJobName(jobJenkinsName) {
  return new Promise(resolve => {
    setTimeout(() => {
      var checkResult = false;
      jenkins.job.list(async function(err, data) {
        if (err) {
          resolve(null);
        }
        for (var loop = 0; loop < data.length; loop = loop + 1) {
          if (data[loop].name === jobJenkinsName) {
            resolve(true);
            checkResult = true;
          }
        }
        resolve(checkResult);
      });
    }, 1000);
  });
};

/**
 * [checkJenkinsJobName] - This async method is used to check JobName existence in Jenkins and Job table based on jobJenkinsName.
 * @type {[async function]}
 *
 * @param  {[String]} req [jobJenkinsName]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * */
exports.checkJobName = async function(req, res) {
  var jobRefName = req.body.jobRefName;
  var userId = req.body.userId;

  // Validation
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("jobRefName", "jobRefName is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {

    //JenKins Name Initialize
    var jobJenkinsName = jobRefName + "-" + userId;
    //JenKins Check
    var checkJenkins = await checkJenkinsJobName(jobJenkinsName);
    if (checkJenkins === true) {
      return res.status(401).json({
        status: "401",
        message: "JobName already exists in Jenkins"
      });
    } else {
      //Db Job Name Check
      Job.find({
          "jobJenkinsName": {
            $regex: new RegExp(jobJenkinsName, "i")
          }
        })
        .exec()
        .then((job) => {
          if (job.length >= 1) {
            for (var loop = 0; loop < job.length; loop = loop + 1) {
              if (job[loop].jobJenkinsName === jobJenkinsName) {
                return res.status(401).json({
                  status: "401",
                  message: "JobName already exists"
                });
              }
            }
            return res.status(200).json({
              status: "200",
              message: "Success"
            });
          } else {
            return res.status(200).json({
              status: "200",
              message: "Success"
            });
          }
        });
    }
  }
};

/**
 * [sonarqUrlValidation] - This async method is used to check user input on sonarqUrl is valid or not.
 * @type {[async function]}
 *
 * @param  {[String]} sonarqUrl
 *
 * @return {[Boolean]} status
 */
async function checkSonarQUrl(sonarqUrl) {
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        const net = require("net");
        var url = require("url");
        var result = url.parse(sonarqUrl);
        var portAdd = result.port;
        var hosts = [
          [result.hostname, portAdd]
        ];
        if (!portAdd === "") {
          hosts.forEach(function(item) {
            var sock = new net.Socket();
            sock.setTimeout(2500);
            sock.on("connect", function() {
              sock.destroy();
              resolve("200");
            }).on("error", function(error) {
              if (error) {
                resolve(null);
              }
              resolve(null);
            }).on("timeout", function(error) {
              if (error) {
                resolve(null);
              }
              resolve(null);
            }).connect(item[1], item[0]);
          });
        } else {
          request(sonarqUrl, function(error, response, body) {
            console.log("got else request");
            if (!error && response.statusCode === 200) {
              resolve("200");
            } else if (body === null) {
              resolve(null);
            }
            else {
              resolve(null);
            }
          });
        }
      } catch (e) {
        if (e) {
          resolve(null);
        }
      }
    }, 10);
  });
};

/**
 * [checkSonarQToken] - This async method is used to check user input on sonarqUrl and sonarqApi is valid or not.
 * @type {[async function]}
 *
 * @param  {[String]} sonarqUrl
 * @param  {[String]} sonarqApi
 *
 * @return {[Boolean]} status
 */
async function checkSonarQToken(sonarqUrl, sonarqApi) {
  return new Promise(resolve => {
    setTimeout(() => {
      try {
        var request = require("request");
        var makeUrl = sonarqUrl + "/api/user_tokens/search";

        var options = {
          url: makeUrl,
          auth: {
            "user": sonarqApi,
            "pass": ""
          }
        };

        function callback(error, response) {
          if (error) {
            resolve(null);
          }
          else {
            if (response.statusCode === 200) {
              resolve("200");
            } else {
              resolve(null);
            }
          }
        }
        request(options, timeout = 0.5, callback);
      } catch (e) {
        //  resolve(null);
      }
    }, 10);
  });
};

/**
 * [checkSonarQ] - This async method is used to check user input on sonarqUrl and sonarqApi is valid or not.
 * @type {[async function]}
 *
 * @param  {[String]} req [sonarqApi]
 * @param  {[String]} req [sonarqUrl]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */
exports.checkSonarQ = async function(req, res) {
  var sonarqApi = req.body.sonarqApi;
  var sonarqUrl = req.body.sonarqUrl;

  // Validation
  req.checkBody("sonarqApi", "sonarqApi is required").notEmpty();
  req.checkBody("sonarqUrl", "sonarqUrl is required").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var testUrl = await checkSonarQUrl(sonarqUrl, sonarqApi);
    if (testUrl === null) {
      return res.status(403).json({
        status: 403,
        message: "Invalid SonarQube URL"
      });
    }
    var testToken = await checkSonarQToken(sonarqUrl, sonarqApi);
    if (testToken !== null) {
      return res.status(200).json({
        status: 200,
        message: "Success"
      });
    } else {
      return res.status(403).json({
        status: 403,
        message: "Invalid SonarQube"
      });
    }
  }
};

/**
 * [checkDigitalApi] - - This async method is used to delete the build history.
 * @type {[async function]}
 *
 * @param  {[String]} req [JobId]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */

async function buildHistoryDbDelete(jobId) {
  return new Promise(resolve=>{
    setTimeout(() => {
      async.series({
        job(callback) {
          buildhistory.find({
              "jobId": jobId
            })
            .remove()
            .exec(callback);

        },
      }, function(err, results) {
        if (err) {

          resolve(null);
        }
        else
        {

          resolve(true);
        }


      });
    }, 1000);
  });
  };


/**
 * [checkDigitalApi] - - This async method is used to check user input on do API key is valid or not.
 * @type {[async function]}
 *
 * @param  {[String]} req [doApiKey]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */

exports.checkDigitalApi = function(req, res) {
  var doApiKey = req.body.doApiKey;

  req.checkBody("doApiKey", "doApiKey is required").notEmpty();
  //Validation
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {

    var options = {
      method: "GET",
      url: "https://api.digitalocean.com/v2/account",
      headers: {
        "cache-control": "no-cache",
        authorization: "Bearer " + doApiKey,
        "content-type": "application/json"
      }
    };

    request(options, function(error, response, body) {
      if (error) {
        res.status(500).json({
          status: "500",
          message: error
        });
      }
      console.log(response.statusCode);
      if (response.statusCode === 200) {
        var data = JSON.parse(body);
        if (data.hasOwnProperty("account")) {
          return res.status(200).json({
            status: "200",
            message: "Valid API"
          });
        } else {
          return res.status(401).json({
            status: "401",
            message: "Invalid API"
          });
        }
      }
      else {
        return res.status(401).json({
          status: "401",
          message: "Invalid API"
        });
      }
    });
  }
};


/**
 * [githubRepositoryList] - This method is to get the github repository list for the particular user by using Access token
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
 exports.githubRepoList = async function(req, res) {
   var authCode = req.body.authCode, clientId = config.githubClientId, secret = config.githubSecret, accesstoken, list, resultData = [], repoName, gitUrl;
   req.checkBody("authCode", "authCode is required").notEmpty();
   var errors = req.validationErrors();
   if (errors) {
     res.status(400).json({
       status: "400",
       message: errors
     });
   } else {
     var options = {
       method: "POST",
       url: "https://github.com/login/oauth/access_token",
       headers: {
         "Cache-Control": "no-cache",
         "content-type": "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW"
       },
       formData: {
         client_id: clientId,
         client_secret: secret,
         code: authCode,
         type: "private",
         state: "xyz123"
       }
     };
     request(options, async function(error, response, body) {
       if (error) {
         res.status(403).json({
           status: "403",
           message: "Not vaild authCode"
         });
       } else {
         console.log(response.statusCode);
         if (response.statusCode === 200) {
           accesstoken = body.substring(0, body.indexOf("&"));
           accesstoken = accesstoken.split("=").pop();
           if (accesstoken === "bad_verification_code" || accesstoken === undefined || accesstoken === "incorrect_client_credentials") {
             return res.status(401).json({
               status: 401,
               message: "Client id or client_secret auth failed",
               data: body
             });
           } else {
             var options = {
               method: "GET",
               url: "https://api.github.com/user/repos?page=1&per_page=100",
               headers: {
                 "cache-control": "no-cache",
                 "user-agent": "node.js",
                 authorization: "token " + accesstoken
               }
             };
             request(options, function(error, response, body) {
               if (error) {
                 res.status(403).json({
                   status: "403",
                   message: "error"
                 });
               }
               if (response.statusCode === 200) {
                 var data = body;
                 var parse = JSON.parse(data);
                 String.prototype.splice = function(idx, rem, str) {
                   return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
                 };
                 parse.forEach(function(element) {
                   repoName = element.owner.login + "/" + element.name;
                   gitUrl = element.clone_url.splice(8, 0, accesstoken + "@");
                   resultData.push({
                     name: repoName,
                     repoName: element.name,
                     userName: element.owner.login,
                     gitURL: gitUrl
                   });
                 });
                 list = resultData.filter(function(item, i, ar) {
                   return ar.indexOf(item) === i;
                 });
                 return res.status(200).json({
                   status: 200,
                   message: "Success",
                   data: list,
                   accesstoken,
                   datalength: list.length
                 });
               }
               else {
                 return res.status(401).json({
                   status: 401,
                   message: "Github response failed"
                 });
               }
             });
           }
         }
         else {
           return res.status(401).json({
             status: 401,
             message: "Github auth failed"
           });
         }
       }
     });
   }
 };

/**
 * [gitHubBranchList] - This method is to get the github repository branch list using accesstoken.
 * @type {[async function]}
 *
 * @param  {[String]} req [userName]
 * @param  {[String]} req [repoName]
 * @param  {[String]} req [authToken]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[JSON]} res [data]
 */
exports.gitHubBranchList = async function(req, res) {
  var userName = req.body.userName, repoName = req.body.repoName, authToken = req.body.authToken;
  req.checkBody("authToken", "authToken is required").notEmpty();
  req.checkBody("repoName", "repoName is required").notEmpty();
  req.checkBody("userName", "userName is required").notEmpty();
  // Extract the validation errors from a request.
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var options = {
      url: "https://api.github.com/repos/" + userName + "/" + repoName + "/branches",
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
        "user-agent": "node.js"
      }
    };

    function callback(error, response, body) {
      if (response.statusCode === 200) {
        return res.status(200).json({
          status: 200,
          message: "Success",
          data: JSON.parse(body)
        });
      } else {
        return res.status(401).json({
          status: 401,
          message: "Auth Failed",
          data: JSON.parse(body)
        });
      }
    }
    request(options, callback);
  }
};

/**
 * [jobJenkinsDelete] - This method is used to delete Job data from Job table in DB.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName
 *
 * @return {[Boolean]} true
 */
async function jobJenkinsDelete(jobJenkinsName) {
  return new Promise(resolve => {
    setTimeout(() => {
      jenkins.job.destroy(jobJenkinsName, function(err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }, 1000);
  });
};

/**
 * [configPipelineJob] - This method is used to configure pipeline script file for Job creation in Jenkins.
 * @type {[async function]}
 *
 * @param  {[String]}  element
 * @param  {[String]}  jobJenkinsName
 * @param  {[String]}  envVar
 * @param  {[String]}  envCmd
 *
 * @return {[String]}  fileName
 */
async function configPipelineJob(element, jobJenkinsName, envVar, envCmd) {
  return new Promise(resolve => {
    setTimeout(() => {
      var mUnitTest = "false",
        mCCTest = "false",
        mCodeReview = "false",
        mE2eTest = "false",
        mPerformanceTest = "false",
        mIsSlack = "false",
        mIsEmail = "false",
        mIsStaging = "false";
      var unitStatus, ccStatus, crStatus, e2eStatus, performanceStatus;
      var userToken = element.userId + "-" + element.doApiKey;

      //Set values
      if (element.isUtEnabled === "1" || element.isUtEnabled === "2") {
        mUnitTest = "true";
        mCCTest = "true";
        unitStatus = element.isUtEnabled;
        ccStatus = element.isUtEnabled;
      } else {
        mUnitTest = "false";
        mCCTest = "false";
        unitStatus = "0";
        ccStatus = "0";
      }

      if (element.isCodeReviewEnabled === "1" || element.isCodeReviewEnabled === "2") {
        mCodeReview = "true";
        crStatus = element.isCodeReviewEnabled;
      } else {
        mCodeReview = "false";
        crStatus = "0";
      }

      if (element.isE2eEnabled === "1" || element.isE2eEnabled === "2") {
        mE2eTest = "true";
        e2eStatus = element.isE2eEnabled;
      } else {
        mE2eTest = "false";
        e2eStatus = "0";
      }

      if (element.isPerformanceTestEnabled === "1" || element.isPerformanceTestEnabled === "2") {
        mPerformanceTest = "true";
        performanceStatus = element.isPerformanceTestEnabled;
      } else {
        mPerformanceTest = "false";
        performanceStatus = "0";
      }

      if (element.isSlackEnabled === "1" || element.isSlackEnabled === "2") {
        mIsSlack = "true";
      } else {
        mIsSlack = "false";
      }

      if (element.isNotifyEmail === "1" || element.isNotifyEmail === "2") {
        mIsEmail = "true";
      } else {
        mIsEmail = "false";
      }

      if (element.isStaging === "1" || element.isStaging === "2") {
        mIsStaging = "true";
      }

      var configFile = __dirname + "/pipelineScript.xml";
      fs.readFile(configFile, "utf8", function(err, data) {
        if (err) {
          resolve(null);
        }
        console.log(element.triggerStatus);
        data = data.replace(/_mongoDbUrl/g, config.mongoDBUrl),
        data = data.replace(/_appDomainUrl/g, config.webDomainUrl),
        data = data.replace(/_triggerStatus;/g, element.triggerStatus),
        data = data.replace(/_domainUrl/g, config.domainUrl),
          data = data.replace(/_jenkinsUrL/g, config.jenkinsUrl),
          data = data.replace(/_unitTest;/g, mUnitTest),
          data = data.replace(/_codeCoverage;/g, mCCTest),
          data = data.replace(/_codeReview;/g, mCodeReview),
          data = data.replace(/_e2eTest;/g, mE2eTest),
          data = data.replace(/_performanceTest;/g, mPerformanceTest),
          data = data.replace(/_isEmailEnabled;/g, mIsEmail),
          data = data.replace(/_isSlackEnabled;/g, mIsSlack),
          data = data.replace(/_isStaging;/g, mIsStaging),
          data = data.replace(/_branchName/g, element.branchName),
          data = data.replace(/_slackBaseUrl/g, element.slackBaseUrl),
          data = data.replace(/_slackToken/g, element.slackToken),
          data = data.replace(/_notifyEmail/g, element.notifyEmail),
          data = data.replace(/_envShell/g, envVar),
          data = data.replace(/_envCmd/g, envCmd),
          data = data.replace(/_api/g, element.doApiKey),
          data = data.replace(/_sonarUrl/g, element.sonarqUrl),
          data = data.replace(/_sonarLogin/g, element.sonarqApi),
          data = data.replace(/_userToken/g, userToken),
          data = data.replace(/_unitStatus/g, unitStatus),
          data = data.replace(/_ccStatus/g, ccStatus),
          data = data.replace(/_crStatus/g, crStatus),
          data = data.replace(/_e2eStatus/g, e2eStatus),
          data = data.replace(/_performanceStatus/g, performanceStatus);

        var xml = data.replace(/_sourceurl/g, element.sourceUrl),
          fileName = "/temp" + Math.random(),
          temp = __dirname + fileName;
        fs.writeFile(temp, xml, "utf8", (err) => {
          if (err) {
            resolve(null);
          }
          resolve(fileName);
        });
      });
    }, 1000);
  });
};

/**
 * [createPipelineJob] - This method is used to create pipeline script for Job creation in Jenkins.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName
 * @param  {[String]} fileName
 *
 * @return {[String]} jobJenkinsName
 */
async function createPipelineJob(jobJenkinsName, fileName) {
  return new Promise(resolve => {
    setTimeout(() => {
      var configFile = __dirname + fileName;
      fs.readFile(configFile, "utf8", function read(err, data) {
        if (err) {
          resolve(null);
        }
        jenkins.job.create(jobJenkinsName, data.toString(), function(err, data) {
          if (err && data === null) {
            resolve(null);
          }
          fs.unlink(configFile, function(err) {
            if (err) {
              resolve(null);
            }
          });
          resolve(jobJenkinsName);
        });
      });
    }, 1000);
  });
};

/**
 * [createJob] - This method is used to create Job in Jenkins and information in Job table.
 * @type {[async function]}
 *
 * @param  {type} req [jobRefName]
 * @param  {type} req [userId]
 * @param  {type} req [sourceUrl]
 * @param  {type} req [appTypeId]
 * @param  {type} req [techStackId]
 * @param  {type} req [sourceRepo]
 * @param  {type} req [branchName]
 * @param  {type} req [sourceId]
 * @param  {type} req [destinationId]
 * @param  {type} req [isUtEnabled]
 * @param  {type} req [isCodeReviewEnabled]
 * @param  {type} req [sonarqApi]
 * @param  {type} req [sonarqUrl]
 * @param  {type} req [isE2eEnabled]
 * @param  {type} req [isPerformanceTestEnabled]
 * @param  {type} req [isNotifyEmail]
 * @param  {type} req [notifyEmail]
 * @param  {type} req [isSlackEnabled]
 * @param  {type} req [slackBaseUrl]
 * @param  {type} req [slackToken]
 * @param  {type} req [isStaging]
 * @param  {type} req [isProduction]
 * @param  {type} req [envData]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * @return {[String]} res [data]
 */
exports.createJob = async function(req, res) {
  var element = {};
  element.jobRefName = req.body.jobRefName;
  element.userId = req.body.userId;
  element.sourceUrl = req.body.sourceUrl;
  element.appTypeId = req.body.appTypeId;
  element.techStackId = req.body.techStackId;
  element.sourceRepo = req.body.sourceRepo;
  element.branchName = req.body.branchName;
  element.sourceId = req.body.sourceId;
  element.destinationId = req.body.destinationId;
  element.isUtEnabled = req.body.isUtEnabled;
  element.isCodeReviewEnabled = req.body.isCodeReviewEnabled;
  element.sonarqApi = req.body.sonarqApi;
  element.sonarqUrl = req.body.sonarqUrl;
  element.isE2eEnabled = req.body.isE2eEnabled;
  element.isPerformanceTestEnabled = req.body.isPerformanceTestEnabled;
  element.isNotifyEmail = req.body.isNotifyEmail;
  element.notifyEmail = req.body.notifyEmail;
  element.isSlackEnabled = req.body.isSlackEnabled;
  element.slackBaseUrl = req.body.slackBaseUrl;
  element.slackToken = req.body.slackToken;
  element.isStaging = req.body.isStaging;
  element.doApiKey = req.body.doApiKey;
  element.envData = req.body.envData;
  element.triggerStatus = req.body.triggerStatus;
  var createdAt = moment().valueOf();
  var lastUpdated = moment().valueOf();

  // Validation
  req.checkBody("jobRefName", "jobRefName is required").notEmpty();
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("sourceUrl", "sourceUrl is required").notEmpty();
  req.checkBody("appTypeId", "appTypeId is required").notEmpty();
  req.checkBody("techStackId", "techStackId is required").notEmpty();
  req.checkBody("sourceRepo", "sourceRepo is required").notEmpty();
  req.checkBody("branchName", "branchName is required").notEmpty();
  req.checkBody("sourceId", "sourceId is required").notEmpty();
  req.checkBody("destinationId", "destinationId is required").notEmpty();
  req.checkBody("isUtEnabled", "isUtEnabled is required").notEmpty();
  req.checkBody("isCodeReviewEnabled", "isCodeReviewEnabled is required").notEmpty();
  req.checkBody("isE2eEnabled", "isE2eEnabled is required").notEmpty();
  req.checkBody("isPerformanceTestEnabled", "isPerformanceTestEnabled is required").notEmpty();
  req.checkBody("isSlackEnabled", "isSlackEnabled is required").notEmpty();
  req.checkBody("isStaging", "isStaging is required").notEmpty();
  req.checkBody("isNotifyEmail", "isNotifyEmail is required").notEmpty();
  req.checkBody("doApiKey", "doApiKey is required").notEmpty();



  if (element.isCodeReviewEnabled === "1" || element.isCodeReviewEnabled === "2") {
    req.checkBody("sonarqApi", "sonarqApi is required").notEmpty();
    req.checkBody("sonarqUrl", "sonarqUrl is required").notEmpty();
  } else {
    element.sonarqApi = "bd6623d1e94597a800b8637b794b84ccb7324738";
    element.sonarqUrl = "http://159.89.140.184:9000";
  }

  if (element.isSlackEnabled === "1" || element.isSlackEnabled === "2") {
    req.checkBody("slackBaseUrl", "slackBaseUrl is required").notEmpty();
    req.checkBody("slackToken", "slackToken is required").notEmpty();
  } else {
    element.slackBaseUrl = "https://cogzidel.slack.com/services/hooks/jenkins-ci/";
    element.slackToken = "QsjGy9RYJjHGxM11phqxoMO0";
  }

  if (element.isNotifyEmail === "1" || element.isNotifyEmail === "2") {
    req.checkBody("notifyEmail", "notifyEmail is required").notEmpty();
  } else {
    element.notifyEmail = "justopsct@gmail.com";
  }

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    //JenKins Name Initialize
    var jobJenkinsName = element.jobRefName + "-" + element.userId;
    var envVar = "PORT=3000";
    var envCmd = "-e HTML_REPORT_PATH=e2ereport -e HTML_REPORT_NAME=report ";
    if (element.envData !== undefined && element.envData !== "") {
      var parsedata = JSON.parse(element.envData);
      parsedata.forEach(function(element) {
        envVar += "\\n" + element.text + "=" + element.value;
        envCmd += "-e " + element.text + "=" + element.value + " ";
      });
    }

    var fileName = await configPipelineJob(element, jobJenkinsName, envVar, envCmd);
    if (fileName === null) {
      return res.status(403).json({
        status: "403",
        message: "Cannot config files"
      });
    }
    var isJobCreated = await createPipelineJob(jobJenkinsName, fileName);
    if (isJobCreated === null) {
      return res.status(403).json({
        status: "403",
        message: "Cannot create jobs"
      });
    }
    const job = new Job({
      jobRefName: element.jobRefName,
      jobJenkinsName,
      userId: element.userId,
      overAllBuildTime: "0",
      noOfDeploy: "0",
      lastDeployStatus: "0",
      sourceRepo: element.sourceRepo,
      branchName: element.branchName,
      sourceUrl: element.sourceUrl,
      appTypeId: element.appTypeId,
      techStackId: element.techStackId,
      sourceId: element.sourceId,
      destinationId: element.destinationId,
      isUtEnabled: element.isUtEnabled,
      isCodeReviewEnabled: element.isCodeReviewEnabled,
      sonarqApi: element.sonarqApi,
      sonarqUrl: element.sonarqUrl,
      isE2eEnabled: element.isE2eEnabled,
      isPerformanceTestEnabled: element.isPerformanceTestEnabled,
      isSlackEnabled: element.isSlackEnabled,
      slackBaseUrl: element.slackBaseUrl,
      slackToken: element.slackToken,
      isNotifyEmail: element.isNotifyEmail,
      notifyEmail: element.notifyEmail,
      isStaging: element.isStaging,
      doApiKey: element.doApiKey,
      envData: element.envData,
      createdAt,
      lastUpdated,
      triggerStatus: element.triggerStatus
    });
    job.save()
      .then((result) => {
        return res.status(200).json({
          status: "200",
          message: "Job created",
          data: result
        });
      })
      .catch((err) => {
        //Job Delete in Jenkins
        var doJobDelete = jobJenkinsDelete(jobJenkinsName);
        if (doJobDelete === null || doJobDelete === false) {
          return res.status(500).json({
            status: "500",
            message: "Jenkins Job deletion failed",
            error: err
          });
        }
        else {
          return res.status(500).json({
            status: "500",
            message: err
          });
        }
      });
  }
};

/**
 * [getDigitalApiKey] - This method is used to get DO ApiKey from Job table based on JobId search.
 * @type {[async function]}
 *
 * @param  {[String]} jobId
 *
 * @return {[Json]} results.job
 */
async function getDigitalApiKey(jobId) {
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
 * [slaveDbDelete] - This method is used to delete Slave droplet information from Slave table in DB.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName
 *
 * @return {[Boolean]} true
 */
async function slaveDbDelete(jobJenkinsName) {
  Slave.remove({
      "job": jobJenkinsName
    })
    .exec()
    .then(result => {
      if (result !== null) {
        return true;
      }
      return true;
    })
    .catch(err => {
      if (err) {
        return false;
      }
      return false;
    });
};

/**
 * [registryDbDelete] - This method is used to delete Registry droplet information from Registry table in DB.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName
 *
 * @return {[Boolean]} true
 */
async function registryDbDelete(jobJenkinsName) {

  Registry.remove({
      "job": jobJenkinsName
    })
    .exec()
    .then(result => {
      if (result !== null) {
        return true;
      }
      return true;
    })
    .catch(err => {
      if (err) {
        return false;
      }
      return false;
    });
};

/**
 *[stageDbDelete] - This method is used to delete Stage droplet information from Stage table in DB.
 * @type {[async function]}
 *
 * @param  {[String]} jobJenkinsName
 *
 * @return {[Boolean]} true
 */
async function stageDbDelete(jobJenkinsName) {
  Stage.remove({
      "job": jobJenkinsName
    })
    .exec()
    .then(result => {
      if (result !== null) {
        return true;
      }
      return true;
    })
    .catch(err => {
      if (err) {
        return true;
      }
      return false;
    });
};


/**
 * [deleteJob] - This method is used to delete droplets from corresponding Do account and Job data from Job table, Slave table, Registry table, Stage table in DB.
 * @type {[async function]}
 *
 * @param  {[String]} req [jobId]
 * @param  {[String]} req [isRegistryDelete]
 * @param  {[String]} req [isStageDelete]
 * @param  {[String]} req [isStaging]
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 * */
exports.deleteJob = async function(req, res) {
  var jobId = req.body.jobId;
  var isRegistryDelete = req.body.isRegistryDelete;
  var isStageDelete = req.body.isStageDelete;
  var isStaging = req.body.isStaging;
  var dropletNames = "";
  var sshKeyStatus = "false";
  var sshKeyName = "0";
  var checkDBDelete="";
  // Validation
  req.checkBody("jobId", "jobId is required").notEmpty();
  req.checkBody("isStaging", "isStaging is required").notEmpty();
  if (isStaging === "1") {
    req.checkBody("isRegistryDelete", "isRegistryDelete is required").notEmpty();
    req.checkBody("isStageDelete", "isStageDelete is required").notEmpty();
  }

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    var getJobDetails = await getDigitalApiKey(jobId);
    if (getJobDetails === null) {
      return res.status(403).json({
        status: "403",
        message: "doApiKey not found"
      });
    } else {
      var userId = getJobDetails.userId;
      var doToken = getJobDetails.doApiKey;
      var jobJenkinsName = getJobDetails.jobJenkinsName;
      var slaveNodeName = userId + "-" + doToken + "-slave";
      var stageName = jobJenkinsName + "-stage";
      var sshName = jobJenkinsName + "-stage-key";
      var registryName = userId + "-" + doToken + "-registry";

      if (isRegistryDelete === "0" && isStageDelete === "0") {
        dropletNames = slaveNodeName;
      } else if (isRegistryDelete === "0" && isStageDelete === "1") {
        dropletNames = slaveNodeName + "," + stageName;
      } else if (isRegistryDelete === "1" && isStageDelete === "0") {
        dropletNames = slaveNodeName + "," + registryName;
      } else if (isRegistryDelete === "1" && isStageDelete === "1") {
        dropletNames = slaveNodeName + "," + stageName + "," + registryName;
      } else {
        dropletNames = slaveNodeName;
      }

      //Job Delete in Jenkins
      var doJobDelete = await jobJenkinsDelete(jobJenkinsName);
      if (doJobDelete === null || doJobDelete === false) {
        return res.status(403).json({
          status: "403",
          message: "Job deletion failed"
        });
      }

      //delete Slave db
      var doSlaveDbDelete = await slaveDbDelete(slaveNodeName);
      if (doSlaveDbDelete) {
        checkDBDelete = "SlaveDb is deleted Successfully";
      }
      else {
        checkDBDelete = "SlaveDb is not deleted";
      }

      //delete Stage db
      if (isStageDelete === "1") {
        var doStageDbDelete = await stageDbDelete(stageName);
        if (doStageDbDelete) {
          checkDBDelete = checkDBDelete + ", StageDb is deleted Successfully";
        }
        else {
          checkDBDelete = checkDBDelete + ", StageDb is not deleted";
        }
        sshKeyStatus = "true";
        sshKeyName = sshName;
      } else {
        sshKeyStatus = "false";
        sshKeyName = sshName;
      }

      //delete Registry db
      if (isRegistryDelete === "1") {
        var doRegistryDbDelete = await registryDbDelete(registryName);
        if (doRegistryDbDelete) {
          checkDBDelete = checkDBDelete + ", RegistryDb is deleted Successfully";
        }
        else {
          checkDBDelete = checkDBDelete + ", RegistryDb is not deleted";
        }
      }

    //delete build history from DB
    var doDeleteBuildHistory = await buildHistoryDbDelete(jobId);


      var dropletStatus = "true",
        slaveStatus = "false";
      var nUrl = "\"" + mUrl + "\"";

      jenkins.job.build({
        name: "delete",
        parameters: {
          NAME: dropletNames,
          DROPLET: dropletStatus,
          DROPLETTOKEN: doToken,
          JENKINSMASTER: nUrl,
          SLAVENAME: slaveNodeName,
          SLAVE: slaveStatus,
          SSHKEYNAME: sshKeyName,
          SSHKEY: sshKeyStatus
        }
      }, async function(err) {
        if (err) {
          return res.json({
            status: 403,
            message: "Deletion Failed"
          });
        } else {
          Job.remove({
              "_id": jobId
            })
            .exec()
            .then(result => {
              return res.json({
                status: 200,
                message: "Deletion SUCCESS",
                data:result
              });
            })
            .catch(err => {
              return res.json({
                status: 403,
                message: "Job Deletion Failed",
                error:err
              });
            });
        }
      });
    }
  }
};
module.testExports = {
checkJenkinsJobName : checkJenkinsJobName,
checkSonarQUrl : checkSonarQUrl,
checkSonarQToken : checkSonarQToken,
jobJenkinsDelete : jobJenkinsDelete,
configPipelineJob : configPipelineJob,
createPipelineJob : createPipelineJob,
getDigitalApiKey : getDigitalApiKey,
slaveDbDelete : slaveDbDelete,
registryDbDelete : registryDbDelete,
stageDbDelete : stageDbDelete
};
