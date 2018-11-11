// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js"); // Our app
//
// describe("Activity Info", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//
//   before(function() {
//
//   });
//   after(function() {
//   });
//
//  //POST - Add new color
//  it("To show the activity info-200-1", function() {
//    return chai.request(app)
//      .post("/job/activityInfo")
//      .send({
//      jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//      buildHistoryId:"5b77ec6acef0eb0011aa2a03",
//      buildNumber:"1"
//      })
//      .then(function(res){
//        expect(res).to.have.status(200);
//        expect(res).to.be.json;
//        });
// });
//
// it("To show the activity info -400 --1", function() {
//   return chai.request(app)
//     .post("/job/activityInfo")
//     .send({
//       jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//       buildHistoryId:"5b77ec6acef0eb0011aa2a03"
//     //  buildNumber:"1"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("To show the activity info -401 No BuildHistory found", function() {
//   return chai.request(app)
//     .post("/job/activityInfo")
//     .send({
//       jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//       //buildHistoryId:"5b77ec6acef0eb0011aa2a03",
//       buildNumber:"1"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
//
// it("To show the activity info -400 --2", function() {
//   return chai.request(app)
//     .post("/job/activityInfo")
//     .send({
//       //jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//       buildHistoryId:"5b77ec6acef0eb0011aa2a03",
//       buildNumber:"1"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("To show the activity info -401 --1", function() {
//   return chai.request(app)
//     .post("/job/activityInfo")
//     .send({
//       jobJenkinsName:"selvatest",
//       buildHistoryId:"5b77ec6a",
//       buildNumber:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(401);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// it("To show the activity info -400 --3", function() {
//   return chai.request(app)
//     .post("/job/activityInfo")
//     .send({
//       jobJenkinsName:"",
//       buildHistoryId:"",
//       buildNumber:""
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
//
// });
