"use strict";
const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js"); // Our app
var configTest = require("../config_test");
var config = require("../config"); // Our app
var buildhistoryidd = configTest.buildhistories._id.toString();



describe("deploy_job", function() {
  this.timeout(100000); // How long to wait for a response (ms)

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
  // DeployJob:
//   it.only("deploying job name-1", function() {
//     return chai.request(app)
//       .post("/job/deployJob")
//       .send({
//        jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//        jobId:"5b77e9d5cef0eb0011aa2a01"
//       })
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         //should(res).have.lengthOf(3,24);
//       });
//
// });
it("deploying job name-1", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
     jobJenkinsName:configTest.buildhistories.jobJenkinsName,
     jobId:configTest.buildhistories.jobId
    })
    .then(function(res){
    //  console.log(res.status);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});


it("deploying job name-400 build failed", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
       jobJenkinsName:configTest.buildhistories.jobJenkinsName
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});

it("deploying job name-400 build failed", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
       jobId:configTest.buildhistories.jobId
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});

it("deploying job name-403 build failed --1", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
      jobJenkinsName:"selvat",
      jobId:"5b77e9d5cef0eb0011aa2a01"
    })
    .then(function(res){
      // console.log(res);
      // console.log(res.status);
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});

it("deploying job name-400 given empty field", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
      jobJenkinsName:"",
      jobId:""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});

it("deploying job name-400 given empty space", function() {
  return chai.request(app)
    .post("/job/deployJob")
    .send({
      jobJenkinsName:" ",
      jobId:" "
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });

});
  //
  // POST - Add new color
  //
  //
  it("Staging Info-111 200 scenario", function() {
    return chai.request(app)
      .post("/job/stageInfo")
      .send({
        jobJenkinsName:configTest.buildhistories.jobJenkinsName,
        buildNumber:configTest.buildhistories.buildNumber,
        jobId:configTest.buildhistories.jobId,
        buildHistoryId : buildhistoryidd
      })
      .then(function(res){
        console.log(res.status);
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
  });

    //
    // it("Staging Info-1 200 scenario", function() {
    //   return chai.request(app)
    //     .post("/job/stageInfo")
    //     .send({
    //       jobJenkinsName:"vpnewpacker-5b8a7c200aaadd0010f3de71 ",
    //       buildNumber:"1",
    //       jobId:"5b8a7d2a0aaadd0010f3de76"
    //     })
    //     .then(function(res){
    //       console.log(res.status);
    //       expect(res).to.have.status(200);
    //       expect(res).to.be.json;
    //       //should(res).have.lengthOf(3,24);
    //     });
    // });


  it("Staging Info-1 - 400 jobJenkinsName not found", function() {
    return chai.request(app)
      .post("/job/stageInfo")
      .send({
      //  jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
      buildNumber:configTest.buildhistories.buildNumber,
      jobId:configTest.buildhistories.jobId,
      buildHistoryId : buildhistoryidd
      })
      .then(function(res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});
it("Staging Info-1 400 scenario buildNumber not found", function() {
  return chai.request(app)
    .post("/job/stageInfo")
    .send({
      jobJenkinsName:configTest.buildhistories.jobJenkinsName,
      //buildNumber:configTest.buildhistories.buildNumber,
      jobId:configTest.buildhistories.jobId,
      buildHistoryId : buildhistoryidd
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});

it("Staging Info-1 400 scenario jobId not found", function() {
  return chai.request(app)
    .post("/job/stageInfo")
    .send({
      jobJenkinsName:configTest.buildhistories.jobJenkinsName,
      buildNumber:configTest.buildhistories.buildNumber,
      buildHistoryId : buildhistoryidd
      //jobId:configTest.buildhistories.jobId
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});



it("Staging Info-1 403 scenario(given empty space to all field)", function() {
  return chai.request(app)
    .post("/job/stageInfo")
    .send({
      jobJenkinsName:" ",
      buildNumber:" ",
      jobId:" ",
      buildHistoryId :" "
    })
    .then(function(res){
      console.log(res.status);
      expect(res).to.have.status(403);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});


it("Staging Info-1 403 scenario(given empty to all field)", function() {
  return chai.request(app)
    .post("/job/stageInfo")
    .send({
      jobJenkinsName:"",
      buildNumber:"",
      jobId:"",
      buildHistoryId :""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});


it("Staging Info-1 403 scenario", function() {
  return chai.request(app)
    .post("/job/stageInfo")
    .send({
      jobJenkinsName:"selvatest",
      buildNumber:"9",
      jobId:"5b77e9d5cef0e",
      buildHistoryId : "12345"
    })
    .then(function(res){
      expect(res).to.have.status(403);
      console.log(res);
      console.log(res.status);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
   //BuildStream:
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
  //POST - Add new color


//   it("BuildStream(App not in DB -1 )", function() {
//     return chai.request(app)
//       .post("/job/buildStream")
//       .send({
//         jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//         buildNumber:"1"
//       })
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         //should(res).have.lengthOf(3,24);
//       });
// });


it("BuildStream(App not in DB -1 )", function() {
  return chai.request(app)
    .post("/job/buildStream")
    .send({
        jobJenkinsName:configTest.buildhistories.jobJenkinsName,
        buildNumber:configTest.buildhistories.buildNumber
    })
    .then(function(res){
      // console.log(res);
      // console.log(res.status);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
// it("BuildStream(error in params )", function() {
//   return chai.request(app)
//     .post("/job/buildStream")
//     .send({
//       jobJenkinsName:"selvatest-5b7652039a413f00108b584f",
//       buildNumber:"9"
//     })
//     .then(function(res){
//       expect(res).to.have.status(200);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
it("BuildStream(missing params )", function() {
  return chai.request(app)
    .post("/job/buildStream")
    .send({
      jobJenkinsName:"",
      buildNumber:"1"
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
it("BuildStream 400 --1 scenario", function() {
  return chai.request(app)
    .post("/job/buildStream")
    .send({
      jobJenkinsName:"selvatestreport-5b7652039a413f00108b584f",
      buildNumber:""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
it("BuildStream --2 scenario", function() {
  return chai.request(app)
    .post("/job/buildStream")
    .send({
      jobJenkinsName:"",
      buildNumber:""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
//
// it.only("BuildStream --3 scenario", function() {
//   return chai.request(app)
//     .post("/job/buildStream")
//     .send({
//       jobJenkinsName:"selvatestrep",
//       buildNumber:"1"
//     })
//     .then(function(res){
//       console.log(res.status);
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//       //should(res).have.lengthOf(3,24);
//     });
// });
});
