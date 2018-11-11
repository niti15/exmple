
"use strict";
const assert = require("chai").assert;
const chai = require("chai");
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/activityController');
var configTest = require("../config_test");
var config = require("../config");
var buildhistoryidd = configTest.buildhistories._id.toString();
var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;

describe("validateBuildHistory",  async function (){
           it("check buildhistoryid given empty buildhistoryid",async function (){
           var result = await url.validateBuildHistory("");
           assert.equal(result,null);
           });
           it("check buildhistoryid given valid buildhistory id",async function (){

           var result = await url.validateBuildHistory(buildhistoryidd);
           assert.isNotNull(result);
           assert.equal(true, Array.isArray(result));
           console.log(result);

           });
});

describe("validateJobDetails",  async function (){
         it("check Jobid",async function (){
           var result = await url.validateJobDetails(configTest.buildhistories.jobId);
           console.log(configTest.buildhistories.jobId);
           console.log(result);
           assert.equal(true, Array.isArray(result));
           assert.isNotNull(result);
                      //  assert.equal(result,true);
          });

          it("check Jobid",async function (){
          var result = await url.validateJobDetails("");
          console.log(result);
          assert.equal(result,null);

              //assert.isNotNull(result);
          });
});


describe("getReportList",  async function (){
         it(" getReportList given correct details",async function (){

         var buildHistory =[{
         utStatus: "0",
         jobJenkinsName: configTest.buildhistories.jobJenkinsName,
         buildNumber: configTest.buildhistories.buildNumber,
         ccStatus:"0",
         crStatus:"0",
         e2eStatus:"0",
         ptStatus:"0"

         }];

         var jobDetails =[{
         sonarqUrl: configTest.createjob.sonarqUrl

         }];

           var result = await url.getReportList(buildHistory,jobDetails);
           console.log(result);
            assert.isObject(result);
            assert.isNotNull(result);
                      //  assert.equal(result,true);
          });

});


describe("getGradeDetails",  async function (){
         it("getGradeDetails the successRate rate is 1 ",async function (){
           var result = await url.getGradeDetails("1");

           console.log(result.gradeValue);
            assert.equal(result.gradeValue,"E");

          });
          it("getGradeDetails the successRate rate is 2 ",async function (){
            var result = await url.getGradeDetails("2");

            console.log(result.gradeValue);
             assert.equal(result.gradeValue,"E");

           });
           it("getGradeDetails the successRate rate is 2.5",async function (){
             var result = await url.getGradeDetails("2.5");

             console.log(result.gradeValue);
              assert.equal(result.gradeValue,"D");

            });
           it("getGradeDetails the successRate rate is 3 ",async function (){
             var result = await url.getGradeDetails("3");

             console.log(result.gradeValue);
              assert.equal(result.gradeValue,"C");

            });
            it("getGradeDetails the successRate rate is 3.5 ",async function (){
              var result = await url.getGradeDetails("3.5");

              console.log(result.gradeValue);
               assert.equal(result.gradeValue,"B");

             });
            it("getGradeDetails the successRate rate is 4 ",async function (){
              var result = await url.getGradeDetails("4");

              console.log(result.gradeValue);
               assert.equal(result.gradeValue,"A");

             });
             it("getGradeDetails the successRate rate is 5 ",async function (){
               var result = await url.getGradeDetails("5");

               console.log(result.gradeValue);
                assert.equal(result.gradeValue,"A+");

              });

        });
