/**
 * This file user.js describes default user router URL.
 * Used for userController routes only.
 */

// Require our controllers
var mUserController = require("../controllers/userController");

/* Requires dependency npm. */
var express = require("express");
var router = express.Router();

/* GET users home page */
router.get("/", function(req, res) {
  res.send("Welcome to User routes");
});

/* userController */
/* post URL for the google SignUp or SignIn*/
// router.post("/google_login", mUserController.userGoogleLogin);
/* get URL for the user details */
router.get("/profile/:userId", mUserController.userDetail);
/* post URL for the user details update*/
router.post("/profile/update", mUserController.profileUpdate);
/* get URL for the job list based on userId */
router.get("/job/:userId/list", mUserController.joblist);
/*post url for google login*/
router.post("/googlelogin", mUserController.userGoogle);
/*post url for github login*/
router.post("/githublogin", mUserController.userGithub);
/*post url for github userAutomatedGithub login*/
router.post("/gitAutoLogin", mUserController.userAutomatedGithub);



module.exports = router;
