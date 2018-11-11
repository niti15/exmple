
"use strict";
const assert = require("chai").assert;
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/buildHistoryController');
var configTest = require("../config_test");
var config = require("../config");
var buildhistoryidd = configTest.buildhistories._id.toString();
var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

var userid = configTest.user._id.toString();


describe("validateUser",  async function (){
         it("check validateUser",async function (){
           var result = await url.validateUser(userid);
           console.log(result);
             assert.equal(true, Array.isArray(result));
           assert.isNotNull(result);
});

it(" validateUser given invalid userid",async function (){
  var result = await url.validateUser("123456");
  //assert.isNotNull(result);
   assert.equal(result,null);

});

it(" validateUser given empty userid",async function (){
  var result = await url.validateUser("");
   assert.equal(result,null);

});
});
describe("validateJob",  async function (){
         it("check validateJob",async function (){
           var result = await url.validateJob(configTest.buildhistories.jobId);
           console.log(result);
            assert.equal(true, Array.isArray(result));
            assert.isNotNull(result);

});

it(" validateJob given empty jobid",async function (){
  var result = await url.validateJob("");
  console.log(result);
   assert.equal(result,null);

});
});

describe("findBuild",  async function (){
         it("findBuild given correct jenkinsjobname and buildnumber",async function (){
           var result = await url.findBuild(configTest.buildhistories.jobJenkinsName,configTest.buildhistories.buildNumber);
           console.log(result);
            assert.equal(true, Array.isArray(result));
            assert.isNotNull(result);

});

it(" findBuild given empty jenkinsjobname",async function (){
  var result = await url.findBuild("");
  console.log(result);
   assert.equal(result,null);

});

it(" findBuild given empty jenkinsjobname",async function (){
  var result = await url.findBuild("jenkinsjobnamee","buildnumberr");
  console.log(result);
   assert.equal(result,null);

});

});


describe("getJobInfo",  async function (){
         it("getJobInfo given correct jobId ",async function (){
           var result = await url.getJobInfo(configTest.buildhistories.jobId);
           console.log(result);
           assert.isNotNull(result);
          //assert.isArray(result);
           assert.isObject(result);

});

it("getJobInfo given wrong jobId ",async function (){
  var result = await url.getJobInfo("567845674");
  console.log(result);
  assert.equal(result,null);

});

it("getJobInfo given empty jobId ",async function (){
  var result = await url.getJobInfo("");
  console.log(result);
  assert.equal(result,null);

});
});


describe("getBuildStatus",  async function (){
         it("getBuildStatus given correct values ",async function (){
           var result = await url.getBuildStatus(configTest.buildhistories.jobJenkinsName,configTest.buildhistories.buildNumber,"SUCCESS");

           console.log(result);
           assert.isNotNull(result);
           assert.isObject(result);

});
//
it("getBuildStatus given empty details ",async function (){
  var result = await url.getBuildStatus("","","SUCCESS");

  console.log(result);
 // assert.isNotNull(result);
  assert.equal(result,null);


});
});

describe("updateBuildStatus",  async function (){
         it("updateBuildStatus given correct details ",async function (){


           var resultBuildId =[{
                  _id: configTest.buildhistories._id,

            }];
            var parseData ={};
            parseData.buildStatus= "0" ;
            parseData.buildStartTime = configTest.buildhistories.buildStartTime ;
            parseData.buildEndTime = configTest.buildhistories.buildEndTime;
            parseData.buildDuration = configTest.buildhistories.buildDuration ;

            var jobDetail ={};
            jobDetail.overAllBuildTime = "2303634";
            jobDetail.noOfDeploy ="3";
            jobDetail._id = configTest.buildhistories.jobId;

           var result = await url.updateBuildStatus(resultBuildId,parseData,jobDetail);
           console.log(result);
           assert.equal(result,true);

});

it("updateBuildStatus given empty details ",async function (){


  var resultBuildId =[{
         _id:"",

   }];
   var parseData ={};
   parseData.buildStatus= "" ;
   parseData.buildStartTime ="" ;
   parseData.buildEndTime = "";
   parseData.buildDuration = "";

   var jobDetail ={};
   jobDetail.overAllBuildTime = "";
   jobDetail.noOfDeploy ="";
   jobDetail._id = "";

  var result = await url.updateBuildStatus(resultBuildId,parseData,jobDetail);
  console.log(result);
  assert.equal(result,false);

});
});




describe("addBuildHistory",  async function (){
      it("check given valid details",async function (){
        var req = {};
        req.body = {};
        req.body.jobId = configTest.buildhistories.jobId;
        req.body.userId = configTest.buildhistories.userId;
        req.body.buildNumber = configTest.buildhistories.buildNumber;
        req.body.buildStatus = configTest.buildhistories.buildStatus;
        req.body.buildStartTime = configTest.buildhistories.buildStartTime;
        req.body.buildEndTime = configTest.buildhistories.buildEndTime;
        req.body.buildDuration = configTest.buildhistories.buildDuration;

        var resultJob =[{
               overAllBuildTime: configTest.buildhistories._id,
               noOfDeploy :"4",
               jobJenkinsName :configTest.buildhistories.jobJenkinsName

         }];


      var result = await url.addBuildHistory(req,resultJob);

      console.log(result);
      assert.isNotNull(result);
      // assert.isObject(result);

    });

    it("check given empty details",async function (){
      var req = {};
      req.body = {};
      req.body.jobId = "";
      req.body.userId = '';
      req.body.buildNumber = "";
      req.body.buildStatus = "";
      req.body.buildStartTime = "";
      req.body.buildEndTime = "";
      req.body.buildDuration = "";

      var resultJob =[{
             overAllBuildTime: "",
             noOfDeploy :"",
             jobJenkinsName :""

       }];

    var result = await url.addBuildHistory(req,resultJob);

    console.log(result);
    assert.equal(result,null);

  });

  });
