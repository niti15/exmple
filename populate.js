

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var async = require('async');
var moment = require("moment");
var config = require("./config");
var mongoose = require('mongoose');
var mongoDB = config.mongoDBUrl;
//console.log(mongoDB);
mongoose.connect(mongoDB);
//mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
var configTest = require("./config_test");
var userid = configTest.user._id.toString();
var name = configTest.user.firstName;
var email = configTest.user.email;
var createjobid = configTest.createjob._id.toString();
var jobjenkinsname = configTest.createjob.jobJenkinsName;


//console.log(db);
var users = [];
var jobs = [];
var contactus = [];
var buildhistories = [];
var billings = [];
//Schema To include
var User = require("./models/userSchema");
var Job = require("./models/jobSchema");
var Contact = require("./models/contactUsSchema");
var Build = require("./models/buildHistorySchema");
var Billing = require("./models/billingSchema");
//var user ={} ;
var testuserid ;




//
//
// function userCreate(email,userName, firstName, lastName, profileImage, firebaseId,referenceToken,sourceLogin,isEmailVerified, cb) {
//   userdetail = {
//     email: email,
//     userName:userName,
//     firstName: firstName,
//     lastName: lastName,
//     profileImage: profileImage,
//     firebaseId: firebaseId,
//     referenceToken: referenceToken,
//     sourceLogin: sourceLogin,
//     isEmailVerified: isEmailVerified,
//     createdAt:moment().valueOf(),
//     lastUpdated:moment().valueOf()
//   }
//
//   var user = new User(userdetail);
//   user.save(function(err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New user: ' + user);
//     var testuserid = user._id ;
//     console.log("mmnmn"+testuserid);
//
//     // var myJSON1 = JSON.stringify(user);
//     // console.log("xxxxx"+myJSON1);
//     //  var parsed1 = JSON.parse(myJSON1);
//     //  var user11 = parsed1[0];
//     //  var testuserid11 =user11._id ;
//     //  console.log("zzzz"+testuserid11);
//
//
//     users.push(user);
//     //  return testuserid ;
//     cb(null, user);
//   });
// };
//
// function createUsers(cb) {
//   async.parallel([
//       function(callback) {
//         userCreate('testuser1@gmail.com','testuser', 'testuser1-FirstName', 'testuser1-LastName', "https://lh5.googleusercontent.com/-yQgPfNLZLmY/AAAAAAAAAAI/AAAAAAAAACo/0PBRviSZOV4/photo.jpg", "12345678","6DWYBczqs5","0","1", callback);
//       },
//       // function(callback) {
//       //   userCreate('uttestuser1@mail.com', 'uttestuser1-FirstName', 'uttestuser1-LastName', "https://lh5.googleusercontent.com/-yQgPfNLZLmY/AAAAAAAAAAI/AAAAAAAAACo/0PBRviSZOV4/photo.jpg", "12345678", callback);
//       // },
//     ],
//     // optional callback
//     cb);
// };
//
//


//
//
// function jobCreate(jobRefName, jobJenkinsName, userId, overAllBuildTime, noOfDeploy,lastDeployStatus,sourceRepo,branchName,sourceUrl,appTypeId,techStackId,sourceId,destinationId,isUtEnabled,isCodeReviewEnabled,sonarqApi,sonarqUrl,isE2eEnabled,isPerformanceTestEnabled,isSlackEnabled,slackBaseUrl,slackToken,isNotifyEmail,notifyEmail,isStaging,doApiKey,envData,cb) {
//   jobdetail = {
//     jobRefName : jobRefName,
//     jobJenkinsName : jobJenkinsName,
//     userId : userId,
//     overAllBuildTime : overAllBuildTime,
//     noOfDeploy : noOfDeploy,
//     lastDeployStatus : lastDeployStatus,
//     sourceRepo : sourceRepo,
//     branchName : branchName,
//     sourceUrl : sourceUrl,
//     appTypeId : appTypeId,
//     techStackId : techStackId,
//     sourceId : sourceId,
//     destinationId : destinationId,
//     isUtEnabled : isUtEnabled,
//     isCodeReviewEnabled : isCodeReviewEnabled,
//     sonarqApi : sonarqApi,
//     sonarqUrl : sonarqUrl,
//     isE2eEnabled : isE2eEnabled,
//     isPerformanceTestEnabled : isPerformanceTestEnabled,
//     isSlackEnabled : isSlackEnabled,
//     slackBaseUrl : slackBaseUrl,
//     slackToken : slackToken,
//     isNotifyEmail : isNotifyEmail,
//     notifyEmail : notifyEmail,
//     isStaging : isStaging,
//     doApiKey : doApiKey,
//     envData : envData,
//     createdAt:moment().valueOf(),
//     lastUpdated:moment().valueOf()
//
//   }
//
//   var joblist = new Job(jobdetail);
//
//   joblist.save(function(err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New jobdetail: ' + joblist);
//     jobs.push(joblist);
//     cb(null, joblist);
//   });
// };
//
// function createJob(cb) {
//   async.parallel([
//       function(callback) {
//         jobCreate("utusertest", "utusertest-"+userid, userid, "666403", "1","3","selvakumar1994/node-course-2-chat-app","jenkins_report","https://github.com/selvakumar1994/node-course-2-chat-app.git","0","0","0","0","1","0","7cb4c566e56a11a04e858688db4ba6a3f9b30773",
//         "https://sonar.justops.io/","1","0","0","https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//         "QsjGy9RYJjHGxM11phqxoMO0","1","selvakumar@cogzidel.com","0","342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc","", callback);
//       },
//       // function(callback) {
//       //   jobCreate("utusertestdeletetest", "utusertestdeletetest-"+userid, userid, "6664003", "1","3","selvakumar1994/node-course-2-chat-app","jenkins_report","https://github.com/selvakumar1994/node-course-2-chat-app.git","0","0","0","0","1","0","bd6623d1e94597a800b8637b794b84ccb7324738",
//       //   "http://159.89.140.184:9000","1","0","0","https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//       //   "QsjGy9RYJjHGxM11phqxoMO0","1","selvakumar@cogzidel.com","0","342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc","", callback);
//       // },
//
//     ],
//     cb);
// };
//
//
// function contactCreate(userId, userName, email, subject, subjectStatus,messageContent, cb) {
//   console.log("chchch"+testuserid);
//   contactdetail = {
//     userId: userId,
//     userName: userName,
//     email: email,
//     subject: subject,
//     subjectStatus: subjectStatus,
//     messageContent : messageContent,
//     createdAt:moment().valueOf(),
//     lastUpdated:moment().valueOf()
//   }
//
//   var contactuslist = new Contact(contactdetail);
//   contactuslist.save(function(err) {
//     if (err) {
//       cb(err, null)
//       return
//     }
//     console.log('New user: ' + contactuslist);
//     contactus.push(contactuslist);
//     cb(null, contactuslist);
//   });
// };
//
// function createcontact(cb) {
//   async.parallel([
//       function(callback) {
//         contactCreate(userid, name, email, "create project for Android", "0","How to create project for Android", callback);
//       },
//     ],
//     // optional callback
//     cb);
// };


function buildhistoryCreate(userId, jobId, jobJenkinsName, buildNumber, buildStatus,buildStartTime,buildEndTime,buildDuration,utStatus,ccStatus,crStatus,e2eStatus,ptStatus, cb) {
console.log("test2"+testuserid);

  buildhistorydetail = {
    userId: userId,
    jobId: jobId,
    jobJenkinsName: jobJenkinsName,
    buildNumber: buildNumber,
    buildStatus: buildStatus,
    buildStartTime : buildStartTime,
    buildEndTime : buildEndTime,
    buildDuration : buildDuration,
    utStatus : utStatus,
    ccStatus : ccStatus,
    crStatus : crStatus,
    e2eStatus : e2eStatus,
    ptStatus : ptStatus,
    createdAt:moment().valueOf(),
    lastUpdated:moment().valueOf()
  }

  var buildhistorylist = new Build(buildhistorydetail);
  buildhistorylist.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New build: ' + buildhistorylist);
    buildhistories.push(buildhistorylist);
    cb(null, buildhistorylist);
  });
};

function createbuildhistory(cb) {
  async.parallel([
      function(callback) {
        buildhistoryCreate(userid, createjobid, jobjenkinsname, "1", "2","1535802697904","1535803533493","835589","1","1","1","1","1",callback);
      },
    ],
    // optional callback
    cb);
};




function billingsCreate(userId, customerId, subscriptionId, subscriptionStatus, planId,planUnitPrice,nextBillingAt, cb) {
  billingdetail = {
    userId: userId,
    customerId: customerId,
    subscriptionId: subscriptionId,
    subscriptionStatus: subscriptionStatus,
    planId: planId,
    planUnitPrice : planUnitPrice,
    nextBillingAt : nextBillingAt,
    createdAt:moment().valueOf(),
    lastUpdated:moment().valueOf()
  }

  var billingslist = new Billing(billingdetail);
  billingslist.save(function(err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New billing: ' + billingslist);
    billings.push(billingslist);
    cb(null, billingslist);
  });
};

function createbillings(cb) {
  async.parallel([
      function(callback) {
        billingsCreate(userid, "1mbDWfTR2Ocdfrabc", "1mkVvuMR3zeUuTAcm", "in_trial", "justops-20","1999","1538559652",callback);
      },
    ],
    // optional callback
    cb);
};

async.series([
  //createUsers,
  //createJob,
  //createcontact,
  createbuildhistory,
  createbillings

],

// Optional callback
function(err, results) {
  if (err) {
    console.log('FINAL ERR: ' + err);
  } else {
    console.log('jobs: ' + users);
    // var myJSON = JSON.stringify(users);
    // console.log("ssss"+myJSON);
    //  var parsed = JSON.parse(myJSON);
    //  var user = parsed[0];
    //  var testuserid =user._id ;
    //  console.log(testuserid);

  }

  mongoose.connection.close();
}
);
