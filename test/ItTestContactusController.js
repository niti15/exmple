// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js"); // Our app
//
// describe("Contactus page", function() {
//   this.timeout(80000); // How long to wait for a response (ms)
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
//   it("Contactus Report-200 scenario", function() {
//     return chai.request(app)
//       .post("/contactUs")
//       .send({
//         userId:"5b5971e77881b3001483be3e",
//         userName:"janani",
//         email:"janani@cogzidel.com",
//         subject:"Schedule demo for PHP",
//         subjectStatus:"0",
//         messageContent:"Need to discuss the Process of JO Merida"
//       })
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       //  console.log(res);
//         //should(res).have.lengthOf(3,24);
//       });
// });
//
// it("Contactus Report-400 scenario-not giving userName", function() {
//   return chai.request(app)
//     .post("/contactUs")
//     .send({
//       userId:"5b5971e77881b3001483be3e",
//       userName:"",
//       email:"rajesh@cogzidel.com",
//       subject:"Schedule demo",
//       subjectStatus:"0",
//       messageContent:"I need to do schedule demo"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Contactus Report-400 scenario-email is not valid", function() {
//   return chai.request(app)
//     .post("/contactUs")
//     .send({
//       userId:"5b5971e77881b3001483be3e",
//       userName:"rajesh",
//       email:"rajesh@cogzidelcom",
//       subject:"Schedule demo",
//       subjectStatus:"0",
//       messageContent:"I need to do schedule demo"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Contactus Report-400 scenario-params is not given", function() {
//   return chai.request(app)
//     .post("/contactUs")
//     .send({
//       userId:"5b5971e77881b3001483be3e",
//       userName:"rajesh",
//     //  email:"rajesh@cogzidelcom",
//       subject:"Schedule demo",
//       subjectStatus:"0",
//       messageContent:"I need to do schedule demo"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Contactus Report-200 scenario- adding another unwanted param", function() {
//   return chai.request(app)
//     .post("/contactUs")
//     .send({
//       userId:"5b5971e77881b3001483be3e",
//       userName:"rajesh",
//       email:"janani@cogzidel.com",
//       subject:"Schedule demo-for contact us page",
//       subjectStatus:"0",
//       messageContent:"I need to do schedule demo for making schedule there",
//       authToken:"871bc5ee9eebd18e98f0"
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("Contactus Report- wrong UID", function() {
//   return chai.request(app)
//     .post("/contactUs")
//     .send({
//       userId:"4nOlEl94D0XLVbKhIjGukyxSx383",
//       userName:"janani",
//       email:"janani@cogzidel.com",
//       subject:"Schedule demo for PHP",
//       subjectStatus:"0",
//       messageContent:"Need to discuss the Process of JO Merida"
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       console.log(res);
//       //should(res).have.lengthOf(3,24);
//     });
// });
// });
