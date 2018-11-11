// "use strict";
// const chai = require("chai");
// const expect = require("chai").expect;
// chai.use(require("chai-http"));
// const app = require("../app.js"); // Our app
//
// describe("checkjobname", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//
//   before(function() {
//   });
//   after(function() {
// //process.exit();
//   });
//    it("checking job name -401 scenario", function() {
//      return chai.request(app)
//        .post("/job/checkJobName")
//        .send({
//          jobRefName:"selvasonarcheck",
//          userId:"5b7652039a413f00108b584f"
//        })
//        .then(function(res){
//          expect(res).to.have.status(401);
//          expect(res).to.be.json;
//          //should(res).have.lengthOf(3,24);
//        });
//    });
//    it("checking job name -200 scenario", function() {
//     return chai.request(app)
//       .post("/job/checkJobName")
//       .send({
//         jobRefName:"selvait",
//         userId:"5b7652039a413f00108b584f"
//          })
//
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//    });
//
//    it("checking job name -200 --1 scenario", function() {
//     return chai.request(app)
//       .post("/job/checkJobName")
//       .send({
//         jobRefName:"selvait",
//         userId:"5b7652039a41"
//          })
//
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//    });
//
//    it("checking job name -400 --1 scenario", function() {
//     return chai.request(app)
//       .post("/job/checkJobName")
//       .send({
//         jobRefName:"",
//         userId:"5b7652039a413f00108b584f"
//          })
//
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//    });
//
//    it("checking job name -400 --2 scenario", function() {
//     return chai.request(app)
//       .post("/job/checkJobName")
//       .send({
//         jobRefName:"selvasonarcheck ",
//         userId:" "
//          })
//
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
//    });
//
//    it("checking job name -400 --3  scenario", function() {
//     return chai.request(app)
//       .post("/job/checkJobName")
//       .send({
//         jobRefName:"",
//         userId:""
//          })
//
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
//    });
// });
//
// describe("deleting job name", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//
//   before(function() {
//
//   });
//
//   after(function() {
//   });
//
//   it("deleting job name -200 scenario", function() {
//     return chai.request(app)
//       .post("/job/deleteJob")
//       .send({
//         jobId:"5b7e799e9d163c00104c73a3",
//         isRegistryDelete:"0",
//         isStageDelete:"0",
//         isStaging:"0"
//
//       })
//       .then(function(res){
//         if(res.status === 200)
//         {
//          //expect(res).to.have.message("welcome to create job engine")
//          expect(res).to.have.status(200);
//          expect(res).to.be.json;
//          expect(res.body).to.be.an("object");
//          return console.log("job deleted successfully");
//        }
//        else{
//          return console.log("something went wrong check your userid and jobid");
//        }
// });
// });
//
//
//   it("deleting job name -200 scenario", function() {
//     return chai.request(app)
//       .post("/job/deleteJob")
//       .send({
//         jobId:"5b7e799e9d163c00104c73a3",
//         isRegistryDelete:"1",
//         isStageDelete:"1",
//         isStaging:"1"
//
//       })
//       .then(function(res){
//         if(res.status === 200)
//         {
//          //expect(res).to.have.message("welcome to create job engine")
//          expect(res).to.have.status(200);
//          expect(res).to.be.json;
//          expect(res.body).to.be.an("object");
//          return console.log("job deleted successfully");
//        }
//        else{
//          return console.log("something went wrong check your userid and jobid");
//        }
// });
// });
//
//
//   it("deleting job name -403 scenario", function() {
//     return chai.request(app)
//       .post("/job/deleteJob")
//       .send({
//         jobId:"5b7e54c19d163c00104",
//         isRegistryDelete:"1",
//         isStageDelete:"1",
//         isStaging:"1"
//
//       })
//       .then(function(res){
//         if(res.status === 403)
//         {
//          //expect(res).to.have.message("welcome to create job engine")
//          expect(res).to.have.status(403);
//          expect(res).to.be.json;
//          expect(res.body).to.be.an("object");
//          return console.log("doApiKey not found");
//        }
//        else{
//          return console.log("something went wrong check your jobid");
//        }
// });
// });
// it("deleting job name -400 scenario", function() {
//   return chai.request(app)
//     .post("/job/deleteJob")
//     .send({
//       jobId:"",
//       isRegistryDelete:"",
//       isStageDelete:"",
//       isStaging:""
//
//     })
//     .then(function(res){
//       if(res.status === 400)
//       {
//        //expect(res).to.have.message("welcome to create job engine")
//        expect(res).to.have.status(400);
//        expect(res).to.be.json;
//        expect(res.body).to.be.an("object");
//        return console.log("job deleted failed");
//      }
//      else{
//        return console.log("something went wrong check your jobId");
//      }
// });
// });
//
// it("deleting job name -400 scenario", function() {
//   return chai.request(app)
//     .post("/job/deleteJob")
//     .send({
//       jobId:"5b7e54c19d163c00104c7396",
//       isRegistryDelete:"",
//       isStageDelete:"",
//       isStaging:""
//
//     })
//     .then(function(res){
//       if(res.status === 400)
//       {
//        //expect(res).to.have.message("welcome to create job engine")
//        expect(res).to.have.status(400);
//        expect(res).to.be.json;
//        expect(res.body).to.be.an("object");
//        return console.log("job deleted failed");
//      }
//      else{
//        return console.log("something went wrong check your isStaging");
//      }
// });
// });
//
// });
//   //checking jobname():
//   /*
//  * this method is To Login or Sign Up as google user using his google Id.
//  * @param  {String} req [firebaseId]
//  * @param  {String} req [userName]
//  * @param  {String} req [email]
//  * @param  {String} req [firstName]
//  * @param  {String} req [lastName]
//  * @param  {String} req [phoneNumber]
//  * @param  {String} req [profileImage]
//  *
//  * @return {String} res [status]
//  * @return {String} res [message]
//  * @return {String} res [data]
//  * */
//   // POST - Add new color
//
// //checkDigitalApi:
//
// describe("digitalApi", function() {
//   this.timeout(10000); // How long to wait for a response (ms)
//   before(function() {
//   });
//   after(function() {
//   });
// it("digitalApi - 200", function() {
//  return chai.request(app)
//    .post("/job/checkDigital")
//    .send({
//     doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc"
//    })
//    .then(function(res){
//      expect(res).to.have.status(200);
//      expect(res).to.be.json;
//    });
// });
// it("digitalApi - 401 given empty space api key", function() {
//  return chai.request(app)
//    .post("/job/checkDigital")
//    .send({
//     doApiKey:"  "
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("digitalApi - 401 given empty api key", function() {
//  return chai.request(app)
//    .post("/job/checkDigital")
//    .send({
//     doApiKey:""
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
// it("digitalApi - 401 invalid api Key", function() {
//  return chai.request(app)
//    .post("/job/checkDigital")
//    .send({
//     doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be654"
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// });
//   // Checking Sonarqube
//   describe("Check sonarQube", function() {
//      this.timeout(10000); // How long to wait for a response (ms)
//      before(function() {
//      });
//      after(function() {
//      });
//
//      it("Check sonarQube-200 --1 ", function() {
//       return chai.request(app)
//         .post("/job/checkSonarQ")
//         .send({
//           sonarqApi:"3d237ce66e59888a61ec5b491612a599b54ddad4",
//           sonarqUrl:" https://sonar-test.justops.io"
//
//         })
//         .then(function(res){
//           expect(res).to.have.status(200);
//           expect(res).to.be.json;
//         });
//      });
//
//     it("Check sonarQube-403 params mismatched", function() {
//      return chai.request(app)
//        .post("/job/checkSonarQ")
//        .send({
//          sonarqUrl:"https://sonar-test.justops",
//          sonarqApi:"3d237ce66e59888a61ec5b491612a599b54ddad4"
//        })
//        .then(function(res){
//          expect(res).to.have.status(403);
//          expect(res).to.be.json;
//        });
//  });
//  it("Check sonarQube-403 --1  params mismatched", function() {
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:"https://sonar-test.justops.io",
//       sonarqApi:"3d237ce66e59888a61ec5b491612a599b54"
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//     });
//  });
//
//  it("Check sonarQube-400 --1 ", function() {
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:"https://sonar-test.justops.io",
//       sonarqApi:" "
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//     });
//  });
//
//  it("Check sonarQube-400 --2 ", function() {
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:"",
//       sonarqApi:"3d237ce66e59888a61ec5b491612a599b54ddad4"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//     });
//  });
//
//  it("Check sonarQube-400 --3 ", function() {
//    this.timeout(15000);
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:"http://165.227.17.82:9000",
//       sonarqApi:"6cbc31a22ea4578a1b6b316e70b85bb3879f7332"
//     })
//     .then(function(res){
//       expect(res).to.have.status(400);
//       expect(res).to.be.json;
//     });
//  });
//
//  it("Check sonarQube-400 --4", function() {
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:" ",
//       sonarqApi:" "
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//     });
//  });
//
//   it("Check sonarQube-400 --5", function() {
//    return chai.request(app)
//      .post("/job/checkSonarQ")
//      .send({
//        sonarqUrl:"",
//        sonarqApi:""
//      })
//      .then(function(res){
//        expect(res).to.have.status(400);
//        expect(res).to.be.json;
//      });
//   });
//
//
//
//  it("Check sonarQube-403 giving spaces in url", function() {
//   return chai.request(app)
//     .post("/job/checkSonarQ")
//     .send({
//       sonarqUrl:"https://sonar-test.justops.io   ",
//       sonarqApi:"3d237ce66e59888a61ec5b491612a599b54ddad4"
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//     });
//  });
//  it("Check sonarQube-400 --4  wrong params", function() {
//   return chai.request(app)
//     .post("/job/checkSonarq")
//     .send({
//       sonarqUrl:"https://sonar-test.justops.io",
//       sonarqApi:"6cbc31a22ea4578a1b6b316e70b85bb3879f7332"
//     })
//     .then(function(res){
//       expect(res).to.have.status(403);
//       expect(res).to.be.json;
//     });
//  });
//  });
// //Createjob Test case:
//   /**
//      * this method is To check for empty get function
//       * @param  {String}  req  [jobId]
//       *
//       * @return {String} res [status]
//       * @return {String} res [message]
//      */
//      describe("create job", function() {
//        this.timeout(150000); // How long to wait for a response (ms)
//
//        before(function() {
//        });
//
//        after(function() {
//        });
//      it("To create job-200 scenario", function() {
//        this.timeout(150000);
//        return chai.request(app)
//        .post("/job/createJob")
//        .send({
//          jobRefName:"selvastage5check",
//          userId:"5b7652039a413f00108b584f",
//          sourceUrl:"https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
//          appTypeId:"0",
//          techStackId:"0",
//          sourceId:"0",
//          destinationId:"0",
//          isUtEnabled:"1",
//          isCodeReviewEnabled:"0",
//          sonarqApi:"bd6623d1e94597a800b8637b794b84ccb7324738",
//          sonarqUrl:"http://159.89.140.184:9000",
//          isE2eEnabled:"0",
//          isPerformanceTestEnabled:"0",
//          isSlackEnabled:"0",
//          slackBaseUrl:"https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//          slackToken:"QsjGy9RYJjHGxM11phqxoMO0",
//          isNotifyEmail:"0",
//          notifyEmail:"justopsct@gmail.com",
//          doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
//          isStaging:"1",
//          branchName:"master",
//          envData:" ",
//          sourceRepo:"selvakumar1994/node-course-2-chat-app"
//        })
//        .then(function(res){
//           if(res.status === 200){
//            //expect(res).to.have.message("welcome to create job engine")
//            expect(res).to.have.status(200);
//            expect(res).to.be.json;
//            expect(res.body).to.be.an("object");
//            return console.log("Job created successfully");
//          }
//          else{
//            return console.log("something went wrong check your job name");
//          }
//      });
//    });
//    it("To create job-200 --1  scenario", function() {
//     this.timeout(150000);
//      return chai.request(app)
//      .post("/job/createJob")
//      .send({
//        jobRefName:"selvastage10check",
//        userId:"5b7652039a413f00108b584f",
//        sourceUrl:"https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
//        appTypeId:"0",
//        techStackId:"0",
//        sourceId:"0",
//        destinationId:"0",
//        isUtEnabled:"1",
//        isCodeReviewEnabled:"0",
//        sonarqApi:"bd6623d1e94597a800b8637b794b84ccb7324738",
//        sonarqUrl:"http://159.89.140.184:9000",
//        isE2eEnabled:"0",
//        isPerformanceTestEnabled:"0",
//        isSlackEnabled:"0",
//        slackBaseUrl:"https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//        slackToken:"QsjGy9RYJjHGxM11phqxoMO0",
//        isNotifyEmail:"0",
//        notifyEmail:"justopsct@gmail.com",
//        doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
//        isStaging:"1",
//        branchName:"master",
//        envData:" ",
//        sourceRepo:"selvakumar1994/node-course-2-chat-app"
//      })
//      .then(function(res){
//         if(res.status === 200){
//          //expect(res).to.have.message("welcome to create job engine")
//          expect(res).to.have.status(200);
//          expect(res).to.be.json;
//          expect(res.body).to.be.an("object");
//          return console.log("Job created successfully");
//        }
//        else{
//          return console.log("something went wrong check your job name");
//        }
//    });
//  });
//
//      it("To create job-400 scenario given empty user id ", function() {
//        this.timeout(150000);
//        return chai.request(app)
//        .post("/job/createJob")
//        .send({
//          jobRefName:"selvastage11check",
//          userId:" ",
//          sourceUrl:"https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
//          appTypeId:"0",
//          techStackId:"0",
//          sourceId:"0",
//          destinationId:"0",
//          isUtEnabled:"1",
//          isCodeReviewEnabled:"0",
//          sonarqApi:"bd6623d1e94597a800b8637b794b84ccb7324738",
//          sonarqUrl:"http://159.89.140.184:9000",
//          isE2eEnabled:"0",
//          isPerformanceTestEnabled:"0",
//          isSlackEnabled:"0",
//          slackBaseUrl:"https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//          slackToken:"QsjGy9RYJjHGxM11phqxoMO0",
//          isNotifyEmail:"0",
//          notifyEmail:"justopsct@gmail.com",
//          doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
//          isStaging:"1",
//          branchName:"master",
//          envData:" ",
//          sourceRepo:"selvakumar1994/node-course-2-chat-app"
//        })
//        .then(function(res){
//           if(res.status !== 400)
//           {
//            //expect(res).to.have.message("welcome to create job engine")
//            expect(res).to.have.status(400);
//            expect(res).to.be.json;
//            expect(res.body).to.be.an("object");
//             console.log("Job created failed");
//          }
//          else{
//             console.log("something went wrong check your job name");
//          }
//      });
//    });
//    it("To create job-401 --2  given empty job name", function() {
//      return chai.request(app)
//      .post("/job/createJob")
//      .send({
//        jobRefName:"",
//        userId:"5b7652039a413f00108b584f",
//        sourceUrl:"https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
//        appTypeId:"0",
//        techStackId:"0",
//        sourceId:"0",
//        destinationId:"0",
//        isUtEnabled:"1",
//        isCodeReviewEnabled:"0",
//        sonarqApi:"bd6623d1e94597a800b8637b794b84ccb7324738",
//        sonarqUrl:"http://159.89.140.184:9000",
//        isE2eEnabled:"0",
//        isPerformanceTestEnabled:"0",
//        isSlackEnabled:"0",
//        slackBaseUrl:"https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//        slackToken:"QsjGy9RYJjHGxM11phqxoMO0",
//        isNotifyEmail:"0",
//        notifyEmail:"justopsct@gmail.com",
//        doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
//        isStaging:"1",
//        branchName:"master",
//        envData:" ",
//        sourceRepo:"selvakumar1994/node-course-2-chat-app"
//      })
//      .then(function(res){
//         if(res.status !== 400)
//         {
//          //expect(res).to.have.message("welcome to create job engine")
//          expect(res).to.have.status(400);
//          expect(res).to.be.json;
//          expect(res.body).to.be.an("object");
//          console.log("Job created successfully");
//        }
//        else{
//           console.log("something went wrong check your job name");
//        }
//    });
//  });
//
//      it("To create job-401 --3  without giving branch", function() {
//        return chai.request(app)
//        .post("/job/createJob")
//        .send({
//          jobRefName:"selvastage5check",
//          userId:"5b7652039a413f00108b584f",
//          sourceUrl:"https://7774a2fb837d028406bc5fdf30c0263d5182cd45@github.com/selvakumar1994/node-course-2-chat-app.git",
//          appTypeId:"0",
//          techStackId:"0",
//          sourceId:"0",
//          destinationId:"0",
//          isUtEnabled:"1",
//          isCodeReviewEnabled:"0",
//          sonarqApi:"bd6623d1e94597a800b8637b794b84ccb7324738",
//          sonarqUrl:"http://159.89.140.184:9000",
//          isE2eEnabled:"0",
//          isPerformanceTestEnabled:"0",
//          isSlackEnabled:"0",
//          slackBaseUrl:"https://cogzidel.slack.com/services/hooks/jenkins-ci/",
//          slackToken:"QsjGy9RYJjHGxM11phqxoMO0",
//          isNotifyEmail:"0",
//          notifyEmail:"justopsct@gmail.com",
//          doApiKey:"342de1a1a26aa0db8a4d96928a425e8a99e8d1932be6548d2ed2a81db2ba9fcc",
//          isStaging:"1",
//          branchName:"master",
//          envData:" ",
//          sourceRepo:"selvakumar1994/node-course-2-chat-app"
//        })
//        .then(function(res){
//            //expect(res).to.have.message("welcome to create job engine")
//            expect(res).to.have.status(400);
//            expect(res).to.be.json;
//            expect(res.body).to.be.an("object");
//          });
//      });
//
//      it("To create job-400 --4 given all empty field", function() {
//        return chai.request(app)
//        .post("/job/createJob")
//        .send({
//          jobRefName:"",
//          userId:"",
//          sourceUrl:"",
//          appTypeId:"",
//          techStackId:"",
//          sourceId:"",
//          destinationId:"",
//          isUtEnabled:"",
//          isCodeReviewEnabled:"",
//          sonarqApi:"",
//          sonarqUrl:"",
//          isE2eEnabled:"",
//          isPerformanceTestEnabled:"",
//          isSlackEnabled:"",
//          slackBaseUrl:"",
//          slackToken:"",
//          isNotifyEmail:"",
//          notifyEmail:"",
//          doApiKey:"",
//          isStaging:"",
//          branchName:"",
//          envData:"",
//          sourceRepo:""
//        })
//        .then(function(res){
//           if(res.status !== 400)
//           {
//            //expect(res).to.have.message("welcome to create job engine")
//            expect(res).to.have.status(400);
//            expect(res).to.be.json;
//            expect(res.body).to.be.an("object");
//            console.log("Job created successfully");
//          }
//          else{
//             console.log("something went wrong check your job name");
//          }
//      });
//    });
// });
//    //Git BranchList:
//   /*
//  * this method is To Login or Sign Up as google user using his google Id.
//  * @param  {String} req [firebaseId]
//  * @param  {String} req [userName]
//  * @param  {String} req [email]
//  * @param  {String} req [firstName]
//  * @param  {String} req [lastName]
//  * @param  {String} req [phoneNumber]
//  * @param  {String} req [profileImage]
//  *
//  * @return {String} res [status]
//  * @return {String} res [message]
//  * @return {String} res [data]
//  * */
//   // POST - Add new color
//
//        describe("Gitbranchlist", function() {
//          this.timeout(10000); // How long to wait for a response (ms)
//          before(function() {
//          });
//          after(function() {
//        //process.exit();
//          });
//    it("Gitbranchlist-400 scenario", function() {
//     return chai.request(app)
//       .post("/job/gitBranchList")
//       .send({
//         jobName:"nodenode",
//       })
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
// });
// it("Gitbranchlist-400 scenario(empty params)", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//      authToken:"",
//      userName:"",
//      repoName:""
//    })
//    .then(function(res){
//      expect(res).to.have.status(400);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e249147af2ef614aa1",
//     userName:"unit-testing-",
//     repoName:"akshayajanani12"
//
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario given wrong auth token", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e",
//     userName:"selvakumar1994",
//     repoName:"node-course-2-chat-app"
//
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario(no username)", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e249147af2ef614aa1",
//     userName:" ",
//     repoName:"node-course-2-chat-app"
//
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario(incorrect username)", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e249147af2ef614aa1",
//     userName:"selv",
//     repoName:"node-course-2-chat-app"
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-200 scenario", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e249147af2ef614aa1",
//     userName:"selvakumar1994",
//     repoName:"node-course-2-chat-app"
//    })
//    .then(function(res){
//      expect(res).to.have.status(200);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario(incorrect reponame)", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"43e4404746268dc8489ba7e249147af2ef614aa1",
//     repoName:"node-node",
//     userName:"selvakumar1994"
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitbranchlist-401 scenario(other access token)", function() {
//  return chai.request(app)
//    .post("/job/gitBranchList")
//    .send({
//     authToken:"9917523137cd91e9392979c28267e3d0e04c63d6",
//     repoName:"node-course-2-chat-app",
//     userName:"selvakumar1994"
//    })
//    .then(function(res){
//      expect(res).to.have.status(200);
//      expect(res).to.be.json;
//    });
// });
//
// });
//    //GitRepoList:
//
//  describe("Gitrepolist", function() {
//    this.timeout(10000); // How long to wait for a response (ms)
//
//    before(function() {
//    });
//    after(function() {
//    });
//
//    it("Gitrepolist-200 scenario", function() {
//     return chai.request(app)
//       .post("/job/gitRepoList")
//       .send({
//         authCode:"c3061f7de266f6191a6a"
//       })
//       .then(function(res){
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//       });
// });
//    it("Gitrepolist-400 scenario given empty authcode", function() {
//     return chai.request(app)
//       .post("/job/gitRepoList")
//       .send({
//        authCode:""
//       })
//       .then(function(res){
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//       });
// });
// it("Gitrepolist-401 scenario given empty space ", function() {
//  return chai.request(app)
//    .post("/job/gitRepoList")
//    .send({
//     authCode:" "
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
// it("Gitrepolist-401 scenario given wrong authcode", function() {
//  return chai.request(app)
//    .post("/job/gitRepoList")
//    .send({
//     authCode:"833e67fa5621f1f10ce9"
//    })
//    .then(function(res){
//      expect(res).to.have.status(401);
//      expect(res).to.be.json;
//    });
// });
//
// });
