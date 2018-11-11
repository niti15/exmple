

"use strict";
const assert = require("chai").assert;
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/pricingController');
var configTest = require("../config_test");
var config = require("../config");
var buildhistoryidd = configTest.buildhistories._id.toString();
var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;
//configTest.billings.userId

describe("validateBillingDetail to given valid userId",  async function (){
         it("check getBillingDetail",async function (){
           var result = await url.validateBillingDetail(configTest.billings.userId);
           console.log(result);
          assert.equal(true, Array.isArray(result));
          assert.isNotNull(result);

});
it("validateBillingDetail given empty userId",async function (){
  var result = await url.validateBillingDetail("");
  console.log(result);
 assert.equal(result,null);

});
});

describe("retrieveTrialInfo",  async function (){
  this.timeout(50000);
         it("retrieveTrialInfo",async function (){
           var result = await url.retrieveTrialInfo(configTest.billings.subscriptionId);
           console.log(result);
          assert.isNotNull(result);
          assert.isObject(result);
});

it("retrieveTrialInfo to given wrong subscriptionId",async function (){
  this.timeout(50000);
  var result = await url.retrieveTrialInfo("sds446567");
  //console.log(result);
  console.log(result.status);
  assert.equal(result.status,403);

});
});
