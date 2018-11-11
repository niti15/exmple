"use strict";
const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js"); // Our app
var configTest = require("../config_test");
var config = require("../config");
var buildhistoryidd = configTest.buildhistories._id.toString();


describe("Build creation functionality", function() {
  this.timeout(10000); // How long to wait for a response (ms)
  before(function() {
  });
  after(function() {
  });
  //
  // it("Create Build functionality-success case", function() {
  //     return chai.request(app)
  //       .post("/createBuild")
  //       .send({
  //         userId:"5b7652039a413f00108b584f",
  //         jobId:"5b77e9d5cef0eb0011aa2a01",
  //         buildNumber:"1",
  //         buildStatus:"2",
  //         buildStartTime:"1534585365340",
  //         buildEndTime:"1534585983319",
  //         buildDuration:"10 minutes"
  //       })
  //       .then(function(res){
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //       });
  // });


it("updateBuildHistory 200 scenario", function() {
    return chai.request(app)
      .post("/job/updateBuildHistory")
      .send({
        jobJenkinsName :configTest.buildhistories.jobJenkinsName,
        buildNumber :configTest.buildhistories.buildNumber,
        testCase :configTest.buildhistories.utStatus

      })
      .then(function(res){

        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
});


it("updateBuildHistory 400 scenario", function() {
    return chai.request(app)
      .post("/job/updateBuildHistory")
      .send({
        jobJenkinsName :"",
        buildNumber :configTest.buildhistories.buildNumber,
        testCase :""

      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
});

it("updateBuildHistory 400 scenario", function() {
    return chai.request(app)
      .post("/job/updateBuildHistory")
      .send({
        jobJenkinsName :"",
        buildNumber :"",
        testCase :""
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
});
});

describe("updateFinalBuild", function() {
  //this.timeout(10000); // How long to wait for a response (ms)
  before(function() {
  });
  after(function() {
  });
  it("updateFinalBuild 200 scenario", function() {
      return chai.request(app)
        .post("/job/updateFinalBuild")
        .send({
          jobJenkinsName :configTest.buildhistories.jobJenkinsName,
          buildNumber :configTest.buildhistories.buildNumber,
          buildStatus :configTest.buildhistories.buildStatus
        })
        .then(function(res){
          console.log(res);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
        });
  });

    it("updateFinalBuild 403 scenario", function() {
        return chai.request(app)
          .post("/job/updateFinalBuild")
          .send({
            jobJenkinsName :"asdfghjk",
            buildNumber :configTest.buildhistories.buildNumber,
            buildStatus :configTest.buildhistories.buildStatus
          })
          .then(function(res){
            //console.log(res);
            expect(res).to.have.status(403);
            expect(res).to.be.json;
          });
    });

        it("updateFinalBuild 400 scenario", function() {
            return chai.request(app)
              .post("/job/updateFinalBuild")
              .send({
                jobJenkinsName :"",
                buildNumber :"",
                buildStatus :""
              })
              .then(function(res){
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res).to.be.json;
              });
        });
  });


  describe("reportStatus", function() {
    //this.timeout(10000); // How long to wait for a response (ms)
    before(function() {
    });
    after(function() {
    });

    it(" reportStatus -200 case", function() {
      //this.timeout(10000);
      console.log(buildhistoryidd);
      return chai.request(app)
        // .get("/job/"+buildhistoryidd/+"reportStatus")
        .get("/job/"+buildhistoryidd+"/reportStatus")
        //.get("/users/profile/"+user_id)

        .then(function(res) {
          console.log(res);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        });
    });
    it(" reportStatus -401 case given invalid buildhistoryid", function() {
      //this.timeout(10000);
      console.log(buildhistoryidd);
      return chai.request(app)
        // .get("/job/"+buildhistoryidd/+"reportStatus")
        .get("/job/4579033/reportStatus")
        //.get("/users/profile/"+user_id)
        .then(function(res) {
          console.log(res.status);
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        });
    });
  });

    describe("createBuild", function() {
      //this.timeout(10000); // How long to wait for a response (ms)
      before(function() {
      });
      after(function() {
      });
   it("Create Build functionality -200 scenario ", function() {
    return chai.request(app)
      .post("/job/createBuild")
      .send({
        userId:configTest.buildhistories.userId,
        jobId:configTest.buildhistories.jobId,
        buildNumber:configTest.buildhistories.buildNumber,
        buildStatus:configTest.buildhistories.buildStatus,
        buildStartTime:configTest.buildhistories.buildStartTime,
        buildEndTime:configTest.buildhistories.buildEndTime,
        buildDuration:configTest.buildhistories.buildDuration
        // userId:"",
        // jobId:"",
        // buildNumber:"",
        // buildStatus:"",
        // buildStartTime:"",
        // buildEndTime:"",
        // buildDuration:""
      })
      .then(function(res){
        console.log(res);
        console.log(res.status);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
});

it("Create Build functionality -400 scenario ", function() {
 return chai.request(app)
   .post("/job/createBuild")
   .send({
     userId:configTest.buildhistories.userId,
     jobId:"",
     buildNumber:configTest.buildhistories.buildNumber,
     buildStatus:configTest.buildhistories.buildStatus,
     buildStartTime:configTest.buildhistories.buildStartTime,
     buildEndTime:configTest.buildhistories.buildEndTime,
     buildDuration:configTest.buildhistories.buildDuration

   })
   .then(function(res){
     console.log(res);
     expect(res).to.have.status(400);
     expect(res).to.be.json;
   });
});

it("Create Build functionality -401 scenario given mismatch jobid", function() {
 return chai.request(app)
   .post("/job/createBuild")
   .send({
     userId:configTest.buildhistories.userId,
     jobId:"5b8e028182c02420279deae4",
     buildNumber:configTest.buildhistories.buildNumber,
     buildStatus:configTest.buildhistories.buildStatus,
     buildStartTime:configTest.buildhistories.buildStartTime,
     buildEndTime:configTest.buildhistories.buildEndTime,
     buildDuration:configTest.buildhistories.buildDuration

   })
   .then(function(res){
     console.log(res);
     expect(res).to.have.status(401);
     expect(res).to.be.json;
   });
});


it("Create Build functionality -401 scenario given invaliduser ", function() {
 return chai.request(app)
   .post("/job/createBuild")
   .send({
     userId:"5b8cd2991c56115742gt564f",
     jobId:configTest.buildhistories.jobId,
     buildNumber:configTest.buildhistories.buildNumber,
     buildStatus:configTest.buildhistories.buildStatus,
     buildStartTime:configTest.buildhistories.buildStartTime,
     buildEndTime:configTest.buildhistories.buildEndTime,
     buildDuration:configTest.buildhistories.buildDuration

   })
   .then(function(res){
     console.log(res);
     expect(res).to.have.status(401);
     expect(res).to.be.json;
   });
});

});

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
