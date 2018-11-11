// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js");
// var configTest = require("../config_test");
// var user_id ;

// describe("Google_login", function() {
//   this.timeout(10000);
//   before(function() {});
//   after(function() {});
//   it("should login -200", function() {
//   //  console.log(configTest.user1);
//    return chai.request(app)
//       .post("/users/google_login")
//       .send({
//         firebaseId: configTest.user.firebaseId,
//         firstName: configTest.user.firstName,
//         lastName: configTest.user.lastName,
//         email: configTest.user.email,
//         profileImage: configTest.user.profileImage
//       })
//       .then(function(res) {
//         var parsedata = JSON.parse(res.text);
//         user_id = parsedata.data._id;
//         // var test = user_id;
//         //console.log(test);
//         //console.log(parsedata.data._id);
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//   });
//   it("should login -400 --email not given", function() {
//     return chai.request(app)
//       .post("/users/google_login")
//       .send({
//         firebaseId: configTest.user.firebaseId,
//         firstName: configTest.user.firstName,
//         lastName: configTest.user.lastName,
//         profileImage: configTest.user.profileImage
//       })
//       .then(function(res) {
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//   });
//   it("should login -400  firebaseid not given", function() {
//     return chai.request(app)
//       .post("/users/google_login")
//       .send({
//         firstName: configTest.user.firstName,
//         lastName: configTest.user.lastName,
//         email: configTest.user.email,
//         profileImage: configTest.user.profileImage
//       })
//       .then(function(res) {
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//   });
//   it("should login -400  firstname not given", function() {
//     return chai.request(app)
//       .post("/users/google_login")
//       .send({
//         firebaseId: configTest.user.firebaseId,
//         lastName: configTest.user.lastName,
//         email: configTest.user.email,
//         profileImage: configTest.user.profileImage
//       })
//       .then(function(res) {
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//   });
//   it("400 scenario all field empty", function() {
//     return chai.request(app)
//       .post("/users/google_login")
//       .send({
//         firebaseId:"",
//         firstName:"",
//         lastName:"",
//         email:"",
//         profileImage:""
//       })
//       .then(function(res) {
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//   });
//   });
// //   it("should login -200", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr1",
// //         firstName: "SelvaKumar",
// //         lastName: "S",
// //         email: "selvakumar@cogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401 -1 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr1",
// //         firstName: "SelvaKumar",
// //         email: "selvakumar@cogzidel.com.mj.."
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-2 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr1",
// //         firstName: "SelvaKumar",
// //         email: "selvakumarcogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-3 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr156yu",
// //         firstName: "SelvaKumar",
// //         email: "selvakumarcogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-4 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr156yu",
// //         firstName: "SelvaKumar",
// //         email: "selvakumarcogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-5 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: " ",
// //         firstName: "SelvaKumar",
// //         email: "selvakumarcogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-6 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr1",
// //         firstName: " ",
// //         email: "selvakumarcogzidel.com"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-7 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: "jtt7G5MKh8e1Hhn0lYIbmBWD0Lr1",
// //         firstName: "SelvaKumar",
// //         email: " "
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// //   it("should login -401-8 wrong mailID ", function() {
// //     return chai.request(app)
// //       .post("/users/google_login")
// //       .send({
// //         firebaseId: " ",
// //         firstName: " ",
// //         email: " "
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //       });
// //   });
// // });
// //
// describe("View_Profile", function() {
//   this.timeout(10000);
//   before(function() {});
//   after(function() {});
//   it("View profile -200 case", function() {
//       return chai.request(app)
//       .get("/users/profile/"+user_id)
//       .then(function(res) {
//         if (res.status === 200) {
//           //expect(res).to.have.message("welcome to create job engine")
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//         }
//       });
//   });

//   it("View profile -401 case", function() {
//     this.timeout(10000);
//     return chai.request(app)
//       .get("/users/profile/0pHghNAzpPWiO1xryxUuBKFFn3a2")
//       .then(function(res) {
//         expect(res).to.have.status(401);
//         expect(res).to.be.json;
//         expect(res.body).to.be.an("object");
//       });
//   });

// });
// describe("joblist", function() {
//   this.timeout(10000);
//   before(function() {});
//   after(function() {});
//   it("View profile -200 case", function() {

//       return chai.request(app)
//       .get("/users/job/"+user_id+"/list")
//       .then(function(res) {
//         if (res.status === 200) {
//           //expect(res).to.have.message("welcome to create job engine")
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//         }
//       });
//   });
// });

// // describe("test", function() {
// //   it("test", function() {
// //     return chai.request(app);
// //     request(url)
// //       .get("/")
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         //done();
// //       });
// //   });
// //   // JobList:
// //   /**
// //    * this method is To delete job using its Id.
// //    * @param  {String}  req  [jobId]
// //    *
// //    * @return {String} res [status]
// //    * @return {String} res [message]
// //    */
// //   it("Job list -200 -1", function() {
// //     return chai.request(app)
// //       .get("/users/job/5b7652039a413f00108b584f/list")
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   it("Job list -401 authentication failed", function() {
// //     return chai.request(app)
// //       .get("/users/job/5b603ea25c67590010a15b8b/list")
// //       .then(function(res) {
// //         expect(res).to.have.status(401);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   it("Job list", function() {
// //     return chai.request(app)
// //       .get("/users/job/5b7652039a413f00108b5/list")
// //       .then(function(res) {
// //         expect(res).to.have.status(500);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //   it("Job list -wrong user id", function() {
// //     return chai.request(app)
// //       .get("/users/job/12345678/list")
// //       .then(function(res) {
// //         expect(res).to.have.status(500);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //   it("Job list -wrong user id", function() {
// //     return chai.request(app)
// //       .get("/users/job/5b498f6dd87f28/list")
// //       .then(function(res) {
// //         expect(res).to.have.status(500);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   //Profile Update:
// //   /**
// //    * this method is To delete job using its Id.
// //    * @param  {String}  req  [userId]
// //    * @param {string} req [firstName]
// //    *
// //    * @return {String} res [status]
// //    * @return {String} res [message]
// //    */
// //
// //
// describe("profileupdate", function() {
//   this.timeout(10000);
//   before(function() {});
//   after(function() {});

//     it("Profile Updation-200 -1", function() {
//       this.timeout(15000);
//       return chai.request(app)
//         .post("/users/profile/update")
//         .send({
//           userId:user_id,          
//           firstName: configTest.user.firstName,
//           lastName: configTest.user.lastName,
//           email: configTest.user.email,
//           profileImage: configTest.user.profileImage

//         })
//         .then(function(res) {
//           console.log(res);
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//           expect(res.body).to.be.an("object");
//         });
//     });
//   });


// //
// //
// //   it("Profile Updation-200 -1", function() {
// //     this.timeout(15000);
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: "SelvaKumar",
// //         lastName: "S",
// //         email: "selvakumar@cogzidel.com",
// //         userId: "5b7652039a413f00108b584f",
// //         profileImage: "https://lh6.googleusercontent.com/-hdwIeU07tSs/AAAAAAAAAAI/AAAAAAAAABw/tpaCjJ3S7sg/photo.jpg"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //   it("Profile Updation-200 -2", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: "SelvaKumar",
// //         userId: "5b7652039a413f00108b584f"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //   it("Profile Updation-space in name field", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: " ",
// //         userId: "5b7652039a413f00108b584f"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(200);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //   it("Profile Updation- given user id in empty space -2", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: "SelvaKumar",
// //         userId: " "
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(401);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   it("Profile Updation- given empty firstname and userid", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: "",
// //         userId: ""
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   it("Profile Updation (wrong ID)", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         firstName: "SelvaKumar",
// //         userId: "5b2782085289410014a",
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(401);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   it("Profile Updation- userid only given", function() {
// //     return chai.request(app)
// //       .post("/users/profile/update")
// //       .send({
// //         userId: "5b7652039a413f00108b584f"
// //       })
// //       .then(function(res) {
// //         expect(res).to.have.status(400);
// //         expect(res).to.be.json;
// //         expect(res.body).to.be.an("object");
// //       });
// //   });
// //
// //   //DeleteJob:
// //   /**
// //    * this method is To delete job using its Id.
// //    * @param  {String}  req  [jobId]
// //    *
// //    * @return {String} res [status]
// //    * @return {String} res [message]
// //    */
// //   // it("Delete job", function() {
// //   //   return chai.request(app)
// //   //     .get("/users/job/id/delete")
// //   //     .then(function(res) {
// //   //       expect(res).to.have.status(401);
// //   //       expect(res).to.be.json;
// //   //       expect(res.body).to.be.an("object");
// //   //     });
// //   // });
// //   // it("Delete job -200", function() {
// //   //   return chai.request(app)
// //   //     .get("/users/job/5b603ea25c67590010a15b8b/delete")
// //   //     .then(function(res) {
// //   //       expect(res).to.have.status(200);
// //   //       expect(res).to.be.json;
// //   //       expect(res.body).to.be.an("object");
// //   //     });
// //   // });
// //   // it("Delete job -200", function() {
// //   //   return chai.request(app)
// //   //     .get("/users/job/5b5ab88490550c062b19111e/delete")
// //   //     .then(function(res) {
// //   //       expect(res).to.have.status(200);
// //   //       expect(res).to.be.json;
// //   //       expect(res.body).to.be.an("object");
// //   //     });
// //   // });
// //   // it("Delete job -200", function() {
// //   //   return chai.request(app)
// //   //     .get("/users/job/5b603ea25c67590010a15b8b/delete")
// //   //     .then(function(res) {
// //   //       expect(res).to.have.status(200);
// //   //       expect(res).to.be.json;
// //   //       expect(res.body).to.be.an("object");
// //   //     });
// //   // });
// //   // it("Delete job -200", function() {
// //   //   return chai.request(app)
// //   //     .get("/users/job/5b603ea25c67590010a15b8b/delete")
// //   //     .then(function(res) {
// //   //       expect(res).to.have.status(200);
// //   //       expect(res).to.be.json;
// //   //       expect(res.body).to.be.an("object");
// //   //     });
// //   // });
// //   it("Job list -200", function() {
// //     this.timeout(15000);
// //     return chai.request(app)
// //       .get("/users/job/5b7652039a413f00108b584f/list");
// //     if (res.status === 200) {
// //       //expect(res).to.have.message("welcome to create job engine")
// //       expect(res).to.have.status(200);
// //       expect(res).to.be.json;
// //       expect(res.body).to.be.an("object");
// //     }
// //   });
// //
