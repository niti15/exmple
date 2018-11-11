
"use strict";
const assert = require("chai").assert;
var async = require("async");
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/jobController');
var configTest = require("../config_test");
var config = require("../config");
var userid = configTest.user._id.toString();
var buildhistoryidd = configTest.buildhistories._id.toString();


var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;


describe("getbuild",  async function (){
      it("check given valid Jobname",async function (){
      var result = await url.getbuild(configTest.buildhistories.jobJenkinsName);
      //assert.isNotNaN(result);
      console.log(result);
      assert.isNumber(result);
});

it("check given empty Jobname",async function (){
  var result = await url.getbuild("");
  assert.equal(result,null);
  console.log(result);

});

it("check given wrong Jobname",async function (){

  var result = await url.getbuild("selv-5b7652039a413f00108b");
  assert.equal(result,null);
  console.log(result);

});
});

describe("validateJob",  async function (){
      it("check given valid jobid",async function (){
      var result =await url.validateJob(configTest.buildhistories.jobId);
      console.log(result);
      assert.isNotNull(result);
      assert.isArray(result);
});
      it("check given invalid Jobid",async function (){
      var result =await url.validateJob("5467389545");
      console.log(result);
      assert.equal(result,null);
//assert.isArray(result);
});
      it("check given empty Jobid",async function (){
      var result =await url.validateJob("");
      console.log(result);
      assert.equal(result,null);
      //assert.isArray(result);
});

});


describe("updateJobStatus",  async function (){
      it("check given valid Jobid",async function (){
      var result = await url.updateJobStatus(configTest.buildhistories.jobId);
      assert.equal(result,true);
      console.log(result);
});
      it("check given invalid Jobid",async function (){
      var result = await url.updateJobStatus("56896434");
      assert.equal(result,false);
      console.log(result);

      });

      it("check given empty Jobid",async function (){
      var result = await url.updateJobStatus("");
      assert.equal(result,false);
      console.log(result);

      });

});


describe("getStageUrl",  async function (){
         it("check given valid Jobname",async function (){
          // var result =await url.getStageUrl(configTest.buildhistories.jobJenkinsName);
          var result =await url.getStageUrl("rajeshdemo8-5b6be166decdb10010c8c934-stage");

        //  rajeshdemo8-5b6be166decdb10010c8c934-stage
          console.log(result);
          assert.isNotNull(result);
          assert.isArray(result);
});
          it("check given invalid Jobname",async function (){
           var result =await url.getStageUrl("fhgh");
           console.log(result);
           assert.equal(result,null);

});

it("check given empty Jobname",async function (){
 var result =await url.getStageUrl("");
 console.log(result);
 assert.equal(result,null);

});
});


describe("getJobInfo",  async function (){
         it("getJobInfo given valid jobid",async function (){
           var result =await url.getJobInfo(configTest.buildhistories.jobId);
           console.log(result);
           assert.isNotNull(result);
           assert.isObject(result);

});
it("getJobInfo given invalid jobid",async function (){
  var result =await url.getJobInfo("34r56789");
  console.log(result);
  assert.equal(result,null);
});

it("getJobInfo given empty jobid",async function (){
  var result =await url.getJobInfo("");
  assert.equal(result,null);
});
});


  describe("getReportStatus",  async function (){
           it("getReportStatus given valid buildHistoryId",async function (){
             console.log(buildhistoryidd);
             var result =await url.getReportStatus(buildhistoryidd);
             console.log(result);
             assert.isNotNull(result);
             assert.isObject(result);

  });
  it("getReportStatus given invalid buildHistoryId",async function (){
    var result =await url.getReportStatus("34r56789");
    console.log(result);
    assert.equal(result,null);
  });

  it("getReportStatus given empty buildHistoryId",async function (){
    var result =await url.getReportStatus("");
    console.log(result);
    assert.equal(result,null);
  });
  });

  // async function startBuildHistory(resultJob, buildNumber) {


    describe("startBuildHistory",  async function (){
             it("startBuildHistory given valid buildHistoryId",async function (){

            var resultJob =[{
                   _id: configTest.buildhistories.jobId,
                   jobJenkinsName:configTest.buildhistories.jobJenkinsName,
                   userId: configTest.buildhistories.userId

             }];
               //console.log(resultJob);
               var result =await url.startBuildHistory(resultJob,configTest.buildhistories.buildNumber);
              // console.log(result);
               assert.isNotNull(result);
               assert.isObject(result);

    });

  it("startBuildHistory given empty buildHistoryId",async function (){
   var resultJob =[{
          _id: "",
          jobJenkinsName: '',
          userId: ''
    }];
      var result =await url.startBuildHistory(resultJob,configTest.buildhistories.buildNumber);
      console.log(result);
      assert.equal(result,null);
    //  assert.isObject(result);

   });

});

//
//
//   describe("getReportCondition",  async function (){
//            it("getReportCondition given valid parsedata",async function (){
//              console.log(buildhistoryidd);
//              var result =await url.getReportStatus(parsedata);
//              console.log(result);
//              assert.isNotNull(result);
//              assert.isObject(result);
//
//   });
// });
