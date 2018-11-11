/**
 * This file contactUsController.js deals with sending mail and saving information in DB for ContactUs page.
 * Used for saving contact information in DB and sending mail to Justops SupportTeam.
 * Export Methods are createContactUsReport(req, res, next).
 */

/* Require our Models. */
var config = require("../config");
var ContactUs = require("../models/contactUsSchema");

/* Requires dependency npm. */
var moment = require("moment");
var async = require("async");

//nodemailer
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: config.productEmail,
    pass: config.productPassword
  }
});

/**
 * [createContactUsReport] - This method is used for saving contact information in DB and sending mail to Justops SupportTeam..
 * @type {[async function]}
 *
 * @param  {String} req userId
 * @param  {String} req userName
 * @param  {String} req email
 * @param  {String} req subject
 * @param  {String} req subjectStatus
 * @param  {String} req messageContent
 *
 * @return {[String]} res [status]
 * @return {[String]} res [message]
 */
exports.createContactUsReport = async function(req, res) {
  var userId = req.body.userId;
  var userName = req.body.userName;
  var email = req.body.email;
  var subject = req.body.subject;
  var subjectStatus = req.body.subjectStatus;
  var messageContent = req.body.messageContent;
  var createdAt = moment().valueOf();
  var lastUpdated = moment().valueOf();

  // Validation
  req.checkBody("userId", "userId is required").notEmpty();
  req.checkBody("userName", "userName is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("subject", "subject is required").notEmpty();
  req.checkBody("subjectStatus", "subjectStatus is required").notEmpty();
  req.checkBody("messageContent", "messageContent is required").notEmpty();

  // Extract the validation errors from a request.
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({
      status: "400",
      message: errors
    });
  } else {
    // Successful.
    // create BuildHistory
    var contactUs = new ContactUs({
      userId,
      userName,
      email,
      subject,
      subjectStatus,
      messageContent,
      createdAt,
      lastUpdated
    });

    contactUs.save(function(err) {
      if (err) {
        return res.status(401).json({
          status: "401",
          message: "Failed"
        });
      }

      var mailOptions = {
        from: "\"" + userName + " " + email + " \"",
        to: config.productEmail,
        subject: subject,
        html: "<p>From:</br>" + email + "</p></br></br><p>" + messageContent +
          "</p></br></br></br>"
      };

      transporter.sendMail(mailOptions, function(error) {
        if (error) {
          return res.status(403).json({
            status: "403",
            message: "Failed to send a mail"
          });
        } else {
          return res.status(200).json({
            status: "200",
            message: "SUCCESS"
          });
        }
      });
    });
  }
};
