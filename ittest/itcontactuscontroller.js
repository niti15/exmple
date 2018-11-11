"use strict";
const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js");
var configTest = require("../config_test");
var config = require("../config"); // Our app

describe("Contactus page", function() {
  this.timeout(80000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {
//process.exit();
  });
  /*
 * this method is To Login or Sign Up as google user using his google Id.
 * @param  {String} req [firebaseId]
 * @param  {String} req [userName]
 * @param  {String} req [email]
 * @param  {String} req [firstName]
 * @param  {String} req [lastName]
 * @param  {String} req [phoneNumber]
 * @param  {String} req [profileImage]
 *
 * @return {String} res [status]
 * @return {String} res [message]
 * @return {String} res [data]
 * */
  // POST - Add new color



  it("Contactus Report-200 scenario", function() {
    return chai.request(app)
      .post("/contactUs")
      .send({
        userId:configTest.contactus.userId,
        userName:configTest.contactus.userName,
        email:configTest.contactus.email,
        subject:configTest.contactus.subject,
        subjectStatus:configTest.contactus.subjectStatus,
        messageContent:configTest.contactus.messageContent
      })
      .then(function(res){
        console.log(res.status);
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      //  console.log(res);
        //should(res).have.lengthOf(3,24);
      });
});

it("Contactus Report-400 scenario-not giving userName", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:configTest.contactus.userId,
      userName:"",
      email:configTest.contactus.email,
      subject:configTest.contactus.subject,
      subjectStatus:configTest.contactus.subjectStatus,
      messageContent:configTest.contactus.messageContent
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});

it("Contactus Report-400 scenario-email is not valid", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:configTest.contactus.userId,
      userName:configTest.contactus.userName,
      email:"user@gmail.com",
      subject:configTest.contactus.subject,
      subjectStatus:configTest.contactus.subjectStatus,
      messageContent:configTest.contactus.messageContent
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});

it("Contactus Report-400 scenario-params is not given", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:configTest.contactus.userId,
      userName:configTest.contactus.userName,
      //email:"user@gmail.com"
      subject:configTest.contactus.subject,
      subjectStatus:configTest.contactus.subjectStatus,
      messageContent:configTest.contactus.messageContent
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});

it("Contactus Report-200 scenario- adding another unwanted param", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:configTest.contactus.userId,
      userName:configTest.contactus.userName,
      email:configTest.contactus.email,
      subject:configTest.contactus.subject,
      subjectStatus:configTest.contactus.subjectStatus,
      messageContent:configTest.contactus.messageContent,
      authToken:"871bc5ee9eebd18e98f0"
    })
    .then(function(res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});

it("Contactus Report- wrong UID", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:"456895635",
      userName:configTest.contactus.userName,
      email:configTest.contactus.email,
      subject:configTest.contactus.subject,
      subjectStatus:configTest.contactus.subjectStatus,
      messageContent:configTest.contactus.messageContent
    })
    .then(function(res){
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      //console.log(res);
      //should(res).have.lengthOf(3,24);
    });
});

it("Contactus Report- wrong UID", function() {
  return chai.request(app)
    .post("/contactUs")
    .send({
      userId:"",
      userName:"",
      email:"",
      subject:"",
      subjectStatus:"",
      messageContent:""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //console.log(res);
      //should(res).have.lengthOf(3,24);
    });
});
});
