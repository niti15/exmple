// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js"); // Our app
//
// describe("Build creation functionality", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//
//   before(function() {
//
//   });
//
//   after(function() {
// //process.exit();
//   });
//   /*
//  * this method is To Login or Sign Up as google user using his google Id.
//  * @param  {String} req [firebaseId]
//  * @param  {String} req [userName]
//  * @param  {String} req [email]
//  * @param  {String} req [firstName]
//  * @param  {String} req [lastName]
//  * @param  {String} req [phoneNumber]
//  * @param  {String} req [profileImage]
//  *
//  * @return {String} res [status]
//  * @return {String} res [message]
//  * @return {String} res [data]
//  * */
//   // POST - Add new color
//
//
//   it("Create Build functionality-success case", function() {
//       return chai.request(app)
//         .post("/createBuild")
//         .send({
//           userId:"5b7652039a413f00108b584f",
//           jobId:"5b77e9d5cef0eb0011aa2a01",
//           buildNumber:"1",
//           buildStatus:"2",
//           buildStartTime:"1534585365340",
//           buildEndTime:"1534585983319",
//           buildDuration:"10 minutes"
//         })
//         .then(function(res){
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//         });
//   });
//
//    it("Create Build functionality -400 scenario-missing params", function() {
//     return chai.request(app)
//       .post("/createBuild")
//       .send({
//         userId:" ",
//         jobId:" ",
//         buildNumber:" ",
//         buildStatus:" ",
//         buildStartTime:" ",
//         buildEndTime:" ",
//         buildDuration:" "
//       })
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
// });
//
// it("Create Build functionality -400 scenario-missing params", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      //userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      buildStatus:"2",
//      buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
// it("Create Build functionality-400 scenario-wrong userId", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      //jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      buildStatus:"2",
//      buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
// it("Create Build functionality-400 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      //buildNumber:"1",
//      buildStatus:"2",
//      buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
// it("Create Build functionality-504 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      //buildStatus:"2",
//      buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
//
//
// it("Create Build functionality-400 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      buildStatus:"2",
//     // buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
//
// it("Create Build functionality-400 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      buildStatus:"2",
//      buildStartTime:"1534585365340",
//     // buildEndTime:"1534585983319",
//      buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
//
// it("Create Build functionality-400 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a413f00108b584f",
//      jobId:"5b77e9d5cef0eb0011aa2a01",
//      buildNumber:"1",
//      buildStatus:"2",
//      buildStartTime:"1534585365340",
//      buildEndTime:"1534585983319",
//     // buildDuration:"10 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
//
//
// it("Create Build functionality-400 scenario-user does not exists", function() {
//  return chai.request(app)
//    .post("/createBuild")
//    .send({
//      userId:"5b7652039a4",
//      jobId:"5b77e9d5cef0",
//      buildNumber:"11",
//      buildStatus:"21",
//      buildStartTime:"15345853",
//      buildEndTime:"153458",
//      buildDuration:"30 minutes"
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
//
//   });
