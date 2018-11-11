var configTest = {};
var ObjectId = require('mongodb').ObjectID;
//var userid = configTest.user._id.toString();

configTest.user ={
  "_id" : ObjectId("5ba0ffbd386c803cb8c05f9f"),
   "email" : "testuser1@gmail.com",
   "userName" : "testuser",
   "firstName" : "testuser1-FirstName",
   "lastName" : "testuser1-LastName",
   "profileImage" : "https://lh5.googleusercontent.com/-yQgPfNLZLmY/AAAAAAAAAAI/AAAAAAAAACo/0PBRviSZOV4/photo.jpg",
   "firebaseId" : "12345678",
   "referenceToken" : "6DWYBczqs5",
   "sourceLogin" : "0",
   "isEmailVerified" : "1",
   "createdAt" : "1537277885873",
   "lastUpdated" : "1537277885874"

};

configTest.utuser ={
    "_id" : ObjectId("5b8ce5c57f22ee6ca6f9e059"),
    "email" : "uttestuser1@mail.com",
    "firstName" : "uttestuser1-FirstName",
    "lastName" : "uttestuser1-LastName",
    "profileImage" : "https://lh5.googleusercontent.com/-yQgPfNLZLmY/AAAAAAAAAAI/AAAAAAAAACo/0PBRviSZOV4/photo.jpg",
    "firebaseId" : "12345678",
    "createdAt" : "1535960517578",
    "lastUpdated" : "1535960517578"

};
configTest.createjob ={
  "_id" : ObjectId("5ba104e62b7696412fdc0b09"),
     "jobRefName" : "utusertest",
     "jobJenkinsName" : "utusertest-5ba0ffbd386c803cb8c05f9f",
     "userId" : "5ba0ffbd386c803cb8c05f9f",
     "overAllBuildTime" : "666403",
     "noOfDeploy" : "1",
     "lastDeployStatus" : "3",
     "sourceRepo" : "selvakumar1994/node-course-2-chat-app",
     "branchName" : "jenkins_report",
     "sourceUrl" : "https://github.com/selvakumar1994/node-course-2-chat-app.git",
     "appTypeId" : "0",
     "techStackId" : "0",
     "sourceId" : "0",
     "destinationId" : "0",
     "isUtEnabled" : "1",
     "isCodeReviewEnabled" : "0",
     "sonarqApi" : "7cb4c566e56a11a04e858688db4ba6a3f9b30773",
     "sonarqUrl" : "https://sonar.justops.io/",
     "isE2eEnabled" : "1",
     "isPerformanceTestEnabled" : "0",
     "isSlackEnabled" : "0",
     "slackBaseUrl" : "https://cogzidel.slack.com/services/hooks/jenkins-ci/",
     "slackToken" : "QsjGy9RYJjHGxM11phqxoMO0",
     "isNotifyEmail" : "1",
     "notifyEmail" : "selvakumar@cogzidel.com",
     "isStaging" : "0",
     "doApiKey" : "342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
     "envData" : "",
     "createdAt" : "1537279206320",
     "lastUpdated" : "1537279206321"

  };

  configTest.deletejob ={
    "_id" : ObjectId("5b9b9d18688d2e30f3c24b83"),
   "jobRefName" : "selvadeletetest",
   "jobJenkinsName" : "selvadeletetest-5b9b9b11e6622a2fb3bd888c",
   "userId" : "5b9b9b11e6622a2fb3bd888c",
   "overAllBuildTime" : "6664003",
   "noOfDeploy" : "1",
   "lastDeployStatus" : "3",
   "sourceRepo" : "selvakumar1994/node-course-2-chat-app",
   "branchName" : "jenkins_report",
   "sourceUrl" : "https://github.com/selvakumar1994/node-course-2-chat-app.git",
   "appTypeId" : "0",
   "techStackId" : "0",
   "sourceId" : "0",
   "destinationId" : "0",
   "isUtEnabled" : "1",
   "isCodeReviewEnabled" : "0",
   "sonarqApi" : "bd6623d1e94597a800b8637b794b84ccb7324738",
   "sonarqUrl" : "http://159.89.140.184:9000",
   "isE2eEnabled" : "1",
   "isPerformanceTestEnabled" : "0",
   "isSlackEnabled" : "0",
   "slackBaseUrl" : "https://cogzidel.slack.com/services/hooks/jenkins-ci/",
   "slackToken" : "QsjGy9RYJjHGxM11phqxoMO0",
   "isNotifyEmail" : "1",
   "notifyEmail" : "selvakumar@cogzidel.com",
   "isStaging" : "0",
   "doApiKey" : "342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
   "envData" : "",
   "createdAt" : "1536924952672",
   "lastUpdated" : "1536924952672"
  };

configTest.contactus ={
  "_id" : ObjectId("5ba104e92b7696412fdc0b0a"),
   "userId" : "5ba0ffbd386c803cb8c05f9f",
   "userName" : "testuser1-FirstName",
   "email" : "testuser1@gmail.com",
   "subject" : "create project for Android",
   "subjectStatus" : "0",
   "messageContent" : "How to create project for Android",
   "createdAt" : "1537279209110",
   "lastUpdated" : "1537279209110"
  };

  configTest.buildhistories ={
    "_id" : ObjectId("5ba105f6b5dc10425abade59"),
        "userId" : "5ba0ffbd386c803cb8c05f9f",
        "jobId" : "5ba104e62b7696412fdc0b09",
        "jobJenkinsName" : "utusertest-5ba0ffbd386c803cb8c05f9f",
        "buildNumber" : "1",
        "buildStatus" : "2",
        "buildStartTime" : "1535802697904",
        "buildEndTime" : "1535803533493",
        "buildDuration" : "835589",
        "utStatus" : "1",
        "ccStatus" : "1",
        "crStatus" : "1",
        "e2eStatus" : "1",
        "ptStatus" : "1",
        "createdAt" : "1537279478990",
        "lastUpdated" : "1537279478990",
     };

configTest.billings ={
  "_id" : ObjectId("5ba105f9b5dc10425abade5a"),
   "userId" : "5ba0ffbd386c803cb8c05f9f",
   "customerId" : "1mbDWfTR2Ocdfrabc",
   "subscriptionId" : "1mkVvuMR3zeUuTAcm",
   "subscriptionStatus" : "in_trial",
   "planId" : "justops-20",
   "planUnitPrice" : "1999",
   "nextBillingAt" : "1538559652",
   "createdAt" : "1537279481853",
   "lastUpdated" : "1537279481853"

};


configTest.createjenkinsjob = {

  "jobRefName" : "utuserjob1",
  "userId" : configTest.user._id,
  "sourceUrl" : "https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
  "appTypeId" : "0",
  "techStackId" : "0",
  "sourceRepo" : "selvakumar1994/node-course-2-chat-app",
  "branchName" : "develop",
  "sourceId" : "0",
  "destinationId" : "0",
  "isUtEnabled" : "1",
  "isCodeReviewEnabled" : "0",
  "sonarqApi" : "bd6623d1e94597a800b8637b794b84ccb7324738",
  "sonarqUrl" : "http://159.89.140.184:9000",
  "isE2eEnabled" : "0",
  "isPerformanceTestEnabled" : "0",
  "isNotifyEmail" : "1",
  "notifyEmail" : "selvakumar@cogzidel.com",
  "isSlackEnabled" : "0",
  "slackBaseUrl" : "https://cogzidel.slack.com/services/hooks/jenkins-ci/",
  "slackToken" : "QsjGy9RYJjHGxM11phqxoMO0",
  "isStaging" : "0",
  "doApiKey" : "342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
  "envData":"[{}]"

};

  configTest.authToken = "43e4404746268dc8489ba7e249147af2ef614aa1";
  configTest.userName = "selvakumar1994" ;
  configTest.repoName = "node-course-2-chat-app";
  configTest.authCode = "c3061f7de266f6191a6a";
  configTest.githubnewuser="utgithubuser";
  configTest.addnewgoogleuser="utgoogleuser@mail.com";
  // configTest.addautomatedutuser="utatuser";
  configTest.addautomatedutuser="utatuser12";



//console.log(configTest.user._id);
// console.log("check"+configTest.createjenkinsjob.userId);


module.exports = configTest;
