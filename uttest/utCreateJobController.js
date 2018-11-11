
"use strict";
const assert = require("chai").assert;
var async = require("async");
var configTest = require("../config_test");
var config = require("../config");
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/createJobController');
var jobid = configTest.createjob._id.toString();

var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;


describe("checkJenkinsJobName",  async function (){
  this.timeout(15000);
         it("check Jobname",async function (){
           this.timeout(15000);
           var result = await url.checkJenkinsJobName(configTest.createjob.jobJenkinsName);
           console.log(result);
           assert.equal(result,true);
});

it("check given wrong Jobname",async function (){
  this.timeout(15000);
  var result = await url.checkJenkinsJobName("test-5b7652039a413f0");
   console.log("sample" + result);
  assert.equal(result,false);
});

it("check given  empty Jobname",async function (){
  this.timeout(15000);
  var result = await url.checkJenkinsJobName("");
   console.log("sample11" + result);
  assert.equal(result,false);
});

it("check given  wrong Jobname1",async function (){
  this.timeout(15000);
  var result = await url.checkJenkinsJobName("check test ");
   console.log(result);
  assert.equal(result,false);
});
});


describe("checkSonarQUrl",  async function (){
  this.timeout(150000);
         it("checkSonarQUrl correct",async function (){
           this.timeout(150000);
           var result = await url.checkSonarQUrl(configTest.createjob.sonarqUrl);
           console.log(configTest.createjob.sonarqUrl);
           console.log(result);
           assert.equal(result,200);
});

         it("checkSonarQUrl wrong",async function (){
           this.timeout(15000);
           var result = await url.checkSonarQUrl("https://sonar-test.just");
           console.log(result);
           assert.equal(result,null);
         });

           it("checkSonarQUrl empty",async function (){
             this.timeout(15000);
             var result = await url.checkSonarQUrl("");
             console.log(result);
             assert.equal(result,null);

});
});


describe("checkSonarQToken",  async function (){
         it("checkSonarQToken correct",async function (){
           var result = await url.checkSonarQToken(configTest.createjob.sonarqUrl,configTest.createjob.sonarqApi);
           console.log(result);
           assert.equal(result,200);
});

it(" wrong checkSonarQToken given",async function (){
  var result = await url.checkSonarQToken('https://sonar-test.justop',configTest.createjob.sonarqApi);
  console.log(result);
  assert.equal(result,null);
});

it("empty checkSonarQToken given",async function (){
  var result = await url.checkSonarQToken(' ',' ');
  console.log(result);
  assert.equal(result,null);
});

it(" empty checkSonarQToken given",async function (){
  var result = await url.checkSonarQToken("","");
  console.log(result);
  assert.equal(result,null);
});
});


describe("jobJenkinsDelete",  async function (){
         it("valid jobname given",async function (){
           var result = await url.jobJenkinsDelete('selvajobtest19-5b934cbcc82def265cdeb97e');
           console.log(result);
           assert.equal(result,true);

});
it("wrong jobname given",async function (){
  this.timeout(1500000);
  var result = await url.jobJenkinsDelete('te-5b7652039a413f00108b584f');
  console.log(result);
  assert.equal(result,false);

});

it("empty jobname given",async function (){
  this.timeout(1500000);
  var result = await url.jobJenkinsDelete(' ');
  console.log(result);
  assert.equal(result,false);
});

});


describe("getDigitalApiKey",  async function (){
           it("valid jobid given",async function (){

           var result = await url.getDigitalApiKey(configTest.buildhistories.jobId);
           console.log(result);
           assert.isNotNull(result);
           assert.isObject(result);

});

it("invalid jobid given",async function (){
    var result = await url.getDigitalApiKey('5b7e799e9d163c0010');
  console.log(result);
  assert.equal(result,null);

});
it("empty jobid given",async function (){
  var result = await url.getDigitalApiKey(' ');
  console.log(result);
  assert.equal(result,null);

});
});

// describe("slaveDbDelete",  async function (){
//   this.timeout(15000);
//          it("valid jobname given",async function (){
//            this.timeout(15000);
//            var result = await url.slaveDbDelete('selvastage3check-5b7652039a413f00108b584f');
//             //
//            console.log("test" + result);
//            assert.equal(result,true);
//          });
// });
// describe("registryDbDelete",  async function (){
//   this.timeout(15000);
//          it("valid jobname given",async function (){
//            this.timeout(15000);
//            var result = await url.registryDbDelete('selvastage3check-5b7652039a413f00108b584f');
//             //
//            console.log("test" + result);
//            assert.equal(result,false);
//          });
// });
//
// describe("stageDbDelete",  async function (){
//   this.timeout(15000);
//          it("valid jobname given",async function (){
//            this.timeout(15000);
//            var result = await url.stageDbDelete("selvastage3check-5b7652039a413f00108b584f-stage");
//            console.log("test" + result);
//            assert.equal(result,false);
//          });
// });
//

//
// it.only("empty jobname given",async function (){
//   this.timeout(15000);
//   var result = await url.slaveDbDelete(' ');
//   // console.log(result);
//   assert.equal(result,null);
//
// });
//
// it.only("invalid jobname given",async function (){
//   this.timeout(15000);
//   var result = await url.slaveDbDelete('selvastage7chec');
// //   console.log(result);
//   assert.equal(result,true);
//
// });
// });


//
// "use strict";
// const assert = require("chai").assert;
// var async = require("async");
// const createjobcontrollerut = require('../controllers/createJobController');
//
// describe("registryDbDelete",  async function (){
//          it("should not delete  Jobname",async function (){
//            var result = createjobcontrollerut._private_.registryDbDelete('%^&sdfg*&^-5b7652039a413f00108b584f');
//            assert.isNull(result);
// });
// it("should not delete  Jobname",async function (){
//   var result = createjobcontrollerut._private_.registryDbDelete('%^&sdfg*&^-5b7652039a413f00108b584f');
//   assert.isNotNull(result);
// });
//
// });
