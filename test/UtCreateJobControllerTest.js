// "use strict";

// const chai = require("chai");
// var id = require("../models/jobSchema");
// var jobname = require("../models/jobSchema");
// var url = require("../models/jobSchema");
// //var should = require("should");
// //sinon = require("sinon");
// chai.use(require("chai-http"));
// describe("creating registry droplet", function() {
//   this.timeout(100000); // How long to wait for a response (ms)

//   before(function() {

//   });
//   after(function() {
//   });
// //console.log("error");
// describe("Get validation", function () {
//      describe("Validation", function () {
//          it("Should return an Sonarqube URL",function () {
//                  function getvalidation(sonarqUrl) {
//                    return sonarqUrl;
//                  }

//                  function getValidation() {
//                    var sonarqUrl ="http://165.227.17.82:9000" ;
//                    //var y = 1;
//                    var url = sonarqUrl;
//                    var id1 = getvalidation(sonarqUrl);

//                    console.log("getValidation() should return the URL of Sonarqube");
//                    console.log("Expect " + id + " to equal " + id1 + ".");

//                    if ( url === id1 ) {
//                      return console.log("Passed.");
//                    }
//                      else {
//                          console.log("Failed.");
//                      }
//                  }

//                  getValidation();
//       });
//       });
//       });
//       //getValidation():
//       describe("Get validation", function () {
//            describe("Validation", function () {
//                it("Should return an Sonarqube API",function () {
//                        function getvalidation(sonarqApi) {
//                          return sonarqApi;
//                        }

//                        function getValidation() {
//                          var sonarqApi ="6cbc31a22ea4578a1b6b316e70b85bb387" ;
//                          //var y = 1;
//                          var api = sonarqApi;
//                          var id1 = getvalidation(sonarqApi);

//                          console.log("getValidation() should return the URL of Sonarqube");
//                          console.log("Expect " + id + " to equal " + id1 + ".");

//                          if ( api === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }

//                        getValidation();
//             });
//             });
//             });

//             //getGitUserName():
//             //  describe.only("Get validation", function () {
//                    describe("Validation", function () {
//                        it("Should return an get git username",function () {
//                               var myVar;
//                                function getGituserName(accesstoken) {
//                                  myVar = setTimeout(getGitUserName, 5000);
//                                  return accesstoken;
//                                }

//                                function getGitUserName() {
//                                  var accesstoken ="ea326f6d8ecc676b24ec0b996d44be4f62b3f87d" ;
//                                  //var y = 1;
//                                  var api = accesstoken;
//                                  var id1 = getGituserName(accesstoken);

//                                  console.log("getGitUserName() should return the URL of Sonarqube");
//                                  console.log("Expect " + id + " to equal " + id1 + ".");

//                                  if ( api === id1 ) {
//                                    return console.log("Passed.");
//                                  }
//                                    else {
//                                        console.log("Failed.");
//                                    }
//                                   // setImmediate(callback);
//                                }

//                                getGitUserName();
//                     });
//                     });
//                     });
//             //createPipelineJob():
//           //   describe("creating pipeline jobs", function () {
//           //        describe("Job", function () {
//           //            it("should create pipeline job",function () {
//           //                function createpipelineJob(jobName) {
//           //                  return jobName;
//           //                }

//           //                function createPipelineJob() {
//           //                  var jobName ="utajtest" ;
//           //                  //var y = 1;
//           //                  var name = jobname;
//           //                  var id1 = createpipelineJob(jobName);

//           //                  console.log("validateuser() should return the userID of user");
//           //                  console.log("Expect " + name + " to equal " + id1 + ".");

//           //                  if ( name === id1 ) {
//           //                    return console.log("Passed.");
//           //                  }
//           //                    else {
//           //                        console.log("Failed.");
//           //                    }
//           //                }

//           //                createPipelineJob();
//           //   });
//           //   });
//           // });
//             //configPipelineJob():
//             describe("Validating ConfigPipeline", function () {
//                  describe("sourceUrl", function () {
//                      it("Should specify the SourceUrl",function () {
//                        function configpipelineJob(sourceUrl) {
//                          return sourceUrl;
//                        }
//                        function configPipelineJob() {
//                          var sourceUrl ="https://github.com/raja1313/node-course-2-chat-app";
//                          //var y = 1;
//                          var url = sourceUrl;
//                          var id1 = configpipelineJob(sourceUrl);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + url + " to equal " + id1 + ".");

//                          if ( url === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating job name", function () {
//                  describe("JobName", function () {
//                      it("should specify the jobname",function () {
//                        function configpipelineJob(jobName) {
//                          return jobName;
//                        }
//                        function configPipelineJob() {
//                          var jobName ="utajtest";
//                          //var y = 1;
//                          var name = jobName;
//                          var id1 = configpipelineJob(jobName);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + name + " to equal " + id1 + ".");

//                          if ( url === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating job name", function () {
//                  describe("JobName", function () {
//                      it("should specify the jobname",function () {
//                        function configpipelineJob(registry) {
//                          return registry;
//                        }
//                        function configPipelineJob() {
//                          var registry ="165.227.17.82:8080";
//                          //var y = 1;
//                          var name = registry;
//                          var id1 = configpipelineJob(registry);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + name + " to equal " + id1 + ".");

//                          if ( name === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating dropletApi", function () {
//                  describe("dropletApi", function () {
//                      it("should specify the dropletApi",function () {
//                        function configpipelineJob(dropletApi) {
//                          return dropletApi;
//                        }
//                        function configPipelineJob() {
//                          var dropletApi ="b8321b95fab674611ed13001542d281fbcb2fff25f0dfbdd172c75d9ec591e2c";
//                          //var y = 1;
//                          var api = dropletApi;
//                          var id1 = configpipelineJob(dropletApi);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + api + " to equal " + id1 + ".");

//                          if ( api === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating branchNamei", function () {
//                  describe("branchName", function () {
//                      it("should specify the branchName",function () {
//                        function configpipelineJob(branchName) {
//                          return branchName;
//                        }
//                        function configPipelineJob() {
//                          var branchName ="jenkins_report";
//                          //var y = 1;
//                          var name = branchName;
//                          var id1 = configpipelineJob(branchName);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + name + " to equal " + id1 + ".");

//                          if ( name === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating branchNamei", function () {
//                  describe("branchName", function () {
//                      it("should specify the slackBaseUrl",function () {
//                        function configpipelineJob(slackBaseUrl) {
//                          return slackBaseUrl;
//                        }
//                        function configPipelineJob() {
//                          var slackBaseUrl ="https://akshayajanani.slack.com/services/hooks/jenkins-ci/";
//                          //var y = 1;
//                          var url = slackBaseUrl;
//                          var id1 = configpipelineJob(slackBaseUrl);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + url + " to equal " + id1 + ".");

//                          if ( url === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating slackToken", function () {
//                  describe("slackToken", function () {
//                      it("should specify the slackToken",function () {
//                        function configpipelineJob(slackToken) {
//                          return slackToken;
//                        }
//                        function configPipelineJob() {
//                          var slackToken ="GbPvIwTWVl2Jb6KjiXLsEq2O";
//                          //var y = 1;
//                          var token = slackToken;
//                          var id1 = configpipelineJob(slackToken);

//                          console.log("configPipelineJob() should return the jobName of user");
//                          console.log("Expect " + token + " to equal " + id1 + ".");

//                          if ( token === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating sonarqUrl", function () {
//                  describe("sonarqUrl", function () {
//                      it("should specify the sonarqUrl",function () {
//                        function configpipelineJob(sonarqUrl) {
//                          return sonarqUrl;
//                        }
//                        function configPipelineJob() {
//                          var sonarqUrl ="http://206.189.212.69:9000";
//                          //var y = 1;
//                          var url = sonarqUrl;
//                          var id1 = configpipelineJob(sonarqUrl);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + url + " to equal " + id1 + ".");

//                          if ( url === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating sonarqLogin", function () {
//                  describe("sonarqLogin", function () {
//                      it("should specify the sonarApi",function () {
//                        function configpipelineJob(sonarApi) {
//                          return sonarApi;
//                        }
//                        function configPipelineJob() {
//                          var sonarApi ="16f904a3f7929e9bd168f264ccb5134f6279119d";
//                          //var y = 1;
//                          var login = sonarApi;
//                          var id1 = configpipelineJob(sonarApi);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + login + " to equal " + id1 + ".");

//                          if ( login === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating notifyEmail", function () {
//                  describe("notifyEmail", function () {
//                      it("should specify the notifyEmail",function () {
//                        function configpipelineJob(notifyEmail) {
//                          return notifyEmail;
//                        }
//                        function configPipelineJob() {
//                          var notifyEmail ="janani@cogzidel.com";
//                          //var y = 1;
//                          var email = notifyEmail;
//                          var id1 = configpipelineJob(notifyEmail);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + email + " to equal " + id1 + ".");

//                          if ( email === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating stagingScript", function () {
//                  describe("stagingScript", function () {
//                      it("should specify the stagingScript",function () {
//                        function configpipelineJob(stagingScript) {
//                          return stagingScript;
//                        }
//                        function configPipelineJob() {
//                          var stagingScript ="server/server.js";
//                          //var y = 1;
//                          var script = stagingScript;
//                          var id1 = configpipelineJob(stagingScript);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating envShell", function () {
//                  describe("envShell", function () {
//                      it("should specify the envShell",function () {
//                        function configpipelineJob(envShell) {
//                          return envShell;
//                        }
//                        function configPipelineJob() {
//                          var envShell ="0";
//                          //var y = 1;
//                          var script = envShell;
//                          var id1 = configpipelineJob(envShell);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isUtEnabled", function () {
//                  describe("isUtEnabled", function () {
//                      it("should specify the isUtEnabled",function () {
//                        function configpipelineJob(isUtEnabled) {
//                          return isUtEnabled;
//                        }
//                        function configPipelineJob() {
//                          var isUtEnabled ="1";
//                          //var y = 1;
//                          var script = isUtEnabled;
//                          var id1 = configpipelineJob(isUtEnabled);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isCodeReviewEnabled", function () {
//                  describe("isCodeReviewEnabled", function () {
//                      it("should specify the isCodeReviewEnabled",function () {
//                        function configpipelineJob(isCodeReviewEnabled) {
//                          return isCodeReviewEnabled;
//                        }
//                        function configPipelineJob() {
//                          var isCodeReviewEnabled ="1";
//                          //var y = 1;
//                          var script = isCodeReviewEnabled;
//                          var id1 = configpipelineJob(isCodeReviewEnabled);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isE2eEnabled", function () {
//                  describe("isE2eEnabled", function () {
//                      it("should specify the isE2eEnabled",function () {
//                        function configpipelineJob(isE2eEnabled) {
//                          return isE2eEnabled;
//                        }
//                        function configPipelineJob() {
//                          var isE2eEnabled ="1";
//                          //var y = 1;
//                          var script = isE2eEnabled;
//                          var id1 = configpipelineJob(isE2eEnabled);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isPerformanceTestEnabled", function () {
//                  describe("isPerformanceTestEnabled", function () {
//                      it("should specify the isPerformanceTestEnabled",function () {
//                        function configpipelineJob(isPerformanceTestEnabled) {
//                          return isPerformanceTestEnabled;
//                        }
//                        function configPipelineJob() {
//                          var isPerformanceTestEnabled ="1";
//                          //var y = 1;
//                          var script = isPerformanceTestEnabled;
//                          var id1 = configpipelineJob(isPerformanceTestEnabled);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isSlackEnabled", function () {
//                  describe("isSlackEnabled", function () {
//                      it("should specify the isSlackEnabled",function () {
//                        function configpipelineJob(isSlackEnabled) {
//                          return isSlackEnabled;
//                        }
//                        function configPipelineJob() {
//                          var isSlackEnabled ="1";
//                          //var y = 1;
//                          var script = isSlackEnabled;
//                          var id1 = configpipelineJob(isSlackEnabled);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isStaging", function () {
//                  describe("isStaging", function () {
//                      it("should specify the isStaging",function () {
//                        function configpipelineJob(isStaging) {
//                          return isStaging;
//                        }
//                        function configPipelineJob() {
//                          var isStaging ="0";
//                          //var y = 1;
//                          var script = isStaging;
//                          var id1 = configpipelineJob(isStaging);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //configPipelineJob():
//             describe("Validating isNotifyEmail", function () {
//                  describe("isNotifyEmail", function () {
//                      it("should specify the isNotifyEmail",function () {
//                        function configpipelineJob(isNotifyEmail) {
//                          return isNotifyEmail;
//                        }
//                        function configPipelineJob() {
//                          var isNotifyEmail ="1";
//                          //var y = 1;
//                          var script = isNotifyEmail;
//                          var id1 = configpipelineJob(isNotifyEmail);

//                          console.log("configPipelineJob() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        configPipelineJob();
//             });
//             });
//             });
//             //getDigitalApiKey():
//             describe("Validating DigitalAPI Key", function () {
//                  describe("Digital API", function () {
//                      it("should specify the Digital api key",function () {
//                        function getDigitalApiKey(jobId) {
//                          return jobId;
//                        }
//                        function getDigitalApiKey() {
//                          var jobId ="5b62c79ab9bc8a00114716da";
//                          //var y = 1;
//                          var script = jobId;
//                          var id1 = getDigitalApiKey(jobId);

//                          console.log("getDigitalApiKey() should return the sonarqUrl of user");
//                          console.log("Expect " + script + " to equal " + id1 + ".");

//                          if ( script === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }
//                        getDigitalApiKey();
//             });
//             });
//             });
//             //slaveDbDelete():
//             describe("Validating slavedelete", function () {
//                  describe("salvedelete", function () {
//                      it("should delete slave ",function () {
//                        function slaveDbDelete(jobName) {
//                          return jobName;
//                        }

//                        function slaveDbDelete() {
//                          var jobName ="devops" ;
//                          //var y = 1;
//                          var id = jobName;
//                          var id1 = slaveDbDelete(jobName);

//                          console.log("slaveDbDelete() should return the jobID of user");
//                          console.log("Expect " + id + " to equal " + id1 + ".");

//                          if ( id === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }

//                        slaveDbDelete();
//             });
//             });
//             });
//             //registryDbDelete():
//             describe.skip("Validating registryDbDelete", function () {
//                  describe("registryDbDelete", function () {
//                      it("should delete registry ",function () {
//                        function registryDbDelete(jobName) {
//                          return jobName;
//                        }

//                        function registryDbDelete() {
//                          var jobName ="nodealladdon" ;
//                          //var y = 1;
//                          var id = jobName;
//                          var id1 = registryDbDelete(jobName);

//                          console.log("registryDbDelete() should return the jobID of user");
//                          console.log("Expect " + id + " to equal " + id1 + ".");

//                          if ( id === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }

//                        registryDbDelete();
//             });
//             });
//             });
//             //stageDbDelete():
//             describe.skip("Validating stageDbDelete", function () {
//                  describe("stageDbDelete", function () {
//                      it("should delete satge ",function () {
//                        function stageDbDelete(jobName) {
//                          return jobName;
//                        }

//                        function stageDbDelete() {
//                          var jobName ="nodealladdon" ;
//                          //var y = 1;
//                          var id = jobName;
//                          var id1 = stageDbDelete(jobName);

//                          console.log("registryDbDelete() should return the jobID of user");
//                          console.log("Expect " + id + " to equal " + id1 + ".");

//                          if ( id === id1 ) {
//                            return console.log("Passed.");
//                          }
//                            else {
//                                console.log("Failed.");
//                            }
//                        }

//                        stageDbDelete();
//             });
//             });
//             });
