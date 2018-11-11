/**
 * This file job.js describes jobs router URL.
 * Used for createJobController,activityController & jobController.
 */

/* Require our controllers. */
var mCreateJobController = require("../controllers/createJobController");
var mBuildController = require("../controllers/buildHistoryController");
var mActivityController = require("../controllers/activityController");
var mJobController = require("../controllers/jobController");

/* Requires dependency npm. */
var express = require("express");
var router = express.Router();

/* GET home page for Job Router */
router.get("/", function(req, res, next) {
  res.status(200).json({
    status: 200,
    message: "Welcome to job router Engine"
  });
});

/* createJobController */
/* post URL for checkJobName Step 1*/
router.post("/checkJobName", mCreateJobController.checkJobName);
/* post URL for checkSonarQ Step 7*/
router.post("/checkSonarQ", mCreateJobController.checkSonarQ);
/* post URL for checkDigitalApi Step 8*/
router.post("/checkDigital", mCreateJobController.checkDigitalApi);
/* post URL for githubRepository List Step 4*/
router.post("/gitRepoList", mCreateJobController.githubRepoList);
/* post URL for gitHubBranchList Step 4*/
router.post("/gitBranchList", mCreateJobController.gitHubBranchList);
/* post URL for createJob Step 8*/
router.post("/createJob", mCreateJobController.createJob);
/* post URL for delete Job*/
router.post("/deleteJob", mCreateJobController.deleteJob);

/* jobController */
/* post URL for deploy Job*/
router.post("/deployJob", mJobController.deployJob);
/* post URL for buildStream Job*/
router.post("/buildStream", mJobController.buildStream);
/* post URL for stageInfo Job*/
router.post("/stageInfo", mJobController.stageInfo);
/* post URL for githubUserInfo Job*/
router.post("/githubUserInfo", mJobController.githubUserInfo);


/* activityController */
/* post URL for activityInfo Job*/
router.post("/activityInfo", mActivityController.activityInfo);

/* buildHistoryController */
/* post URL for create Build*/
router.post("/createBuild", mBuildController.createBuild);
/* post URL for update Build*/
router.post("/updateBuildHistory", mBuildController.updateBuildHistory);
/* post URL for update Build*/
router.post("/updateFinalBuild", mBuildController.updateFinalBuild);
/* post URL for get report Status*/
router.get("/:buildHistoryId/reportStatus", mBuildController.reportStatus);

module.exports = router;
