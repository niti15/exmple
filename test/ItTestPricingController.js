// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js"); // Our app
//
// describe("Plan updation", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//
//   before(function() {
//
//   });
//
//   after(function() {
// //process.exit();
//   });
//   //Plan Updation:
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
// //  POST - Add new color
// //   it("Plan updation -403", function() {
// //     return chai.request(app)
// //       .post("/updatePlan")
// //       .send({
// //         userId:"5b5971e77881b3001483be3e",
// //         subscriptionId:"1mk51eKQyijemdV",
// //         planId:"cbdemo_free",
// //         invoiceId:"9"
// //       })
// //       .then(function(res){
// //         expect(res).to.have.status(403);
// //         expect(res).to.be.json;
// //         //should(res).have.lengthOf(3,24);
// //       });
// // });
//
// it("Plan updation -200", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"cbdemo_free",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Plan updation -200--1", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"cbdemo_free",
//       invoiceId:" "
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
// it("Plan updation -401 subscription id as user id", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"Izy9TD2R0xBYLA4gM",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"cbdemo_free",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(401);
//       expect(res).to.be.json;
//     });
// });
//
// it("Plan updation -401 --1", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"justops-20",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Plan updation -403 wrong subscription ID", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gMsdg",
//       planId:"cbdemo_free",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("Plan updation -400 --2", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"cbdemo_free",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("Plan updation -400 --3", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:" 5b7652039a413f00108b584f",
//       subscriptionId:"",
//       planId:"cbdemo_free",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("Plan updation -400 --4", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:" 5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:" ",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(401);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Plan updation -400 --7", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"5b7652039a413f00108b584f",
//       subscriptionId:"Izy9TD2R0xBYLA4gM",
//       planId:"",
//       invoiceId:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("Plan updation -400 --5", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:" ",
//       subscriptionId:" ",
//       planId:" ",
//       invoiceId:" "
//     })
//     .then(function(res){
//       expect(res).to.have.status(401);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Plan updation -400 --6", function() {
//   return chai.request(app)
//     .post("/updatePlan")
//     .send({
//       userId:"",
//       subscriptionId:"",
//       planId:"",
//       invoiceId:""
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// //GetTrialDays:
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
// //  POST - Add new color
//   it("Get trial days-400 --6", function() {
//     return chai.request(app)
//       .post("/getTrialDays")
//       .send({
//         //userId:"5b4a0b0d0cee890014af9ee6",
//         // subscriptionId:"1mhuIhHQxr5QYDEq6",
//         // planId:"justops-20",
//         // invoiceId:"9"
//       })
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//         //should(res).have.lengthOf(3,24);
//       });
// });
//     it("Get trial days-200", function() {
//     return chai.request(app)
//       .post("/getTrialDays")
//       .send({
//         userId:"5b7652039a413f00108b584f"
//         // subscriptionId:"1mhuIhHQxr5QYDEq6",
//         // planId:"justops-20",
//         // invoiceId:"9"
//       })
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         //should(res).have.lengthOf(3,24);
//       });
// });
//
// it("Get trial days wrong params", function() {
//   return chai.request(app)
//     .post("/getTrialDays")
//     .send({
//     userid:"5b7652039a413f00108b58"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Get trial days userId as firebaseId", function() {
//   return chai.request(app)
//     .post("/getTrialDays")
//     .send({
//     userId:"SZCY9kiaYIbY5i4H0Sd45GHF2tn1"
//     })
//     .then(function(res){
//       expect(res).to.have.status(401);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("Get trial days empty params", function() {
//   return chai.request(app)
//     .post("/getTrialDays")
//     .send({
//     userid:" "
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// });
