
"use strict";
const assert = require("chai").assert;
var async = require("async");
var configTest = require("../config_test");
var config = require("../config");
var requireFrom = require('require-from');
var url = requireFrom('testExports',module,'../controllers/userController');
//var utuserid = configTest.utuser._id.toString();
var userid = configTest.user._id.toString();

var mongoose = require("mongoose");
var mongoDB = config.mongoDBUrl;
mongoose.connect(mongoDB,{ useNewUrlParser: true });
mongoose.Promise = global.Promise;


describe("getBillingDetail",  async function (){
      it("check given valid userid",async function (){
      var result = await url.getBillingDetail(userid);

      assert.isNotNull(result);
      assert.isArray(result);

    });
    it("check given wrong userid",async function (){
    var result = await url.getBillingDetail("334567904667789");
    console.log(result);
    assert.equal(result,null);

    // assert.isNotNull(result);
    // assert.isArray(result);

  });

  it("check given empty userid",async function (){
  var result = await url.getBillingDetail("");
  console.log(result);
  assert.equal(result,null);

});
});


describe("checkFirebaseUser",  async function (){
      it("check given valid firebaseId",async function (){
        console.log(configTest.user.firebaseId);
      var result = await url.checkFirebaseUser(configTest.user.firebaseId);
      console.log(result);
      assert.isNotNull(result);
    //  assert.isObject(result);
      assert.isObject(result);

    });
    it("check given invalid firebaseId",async function (){
    var result = await url.checkFirebaseUser("987654356");
    console.log(result.status);
    assert.equal(result.status,401);
    //assert.isObject(result);
    //assert.isArray(result);

  });
  it("check given empty firebaseId",async function (){
  var result = await url.checkFirebaseUser("");
  console.log(result);
  console.log(result.status);
  assert.equal(result.status,401);
  //assert.equal(result.status,401);
  //assert.isObject(result);
  //assert.isArray(result);

});
  });


  describe("addBillingDetails",  async function (){
        it("check given valid details",async function (){
          var mUserInfo = {};
          mUserInfo.email= configTest.user.email ;
          mUserInfo.firstName = configTest.user.firstName;
          mUserInfo.lastName = configTest.user.lastName;
          mUserInfo._id =  configTest.user._id ;

        var result = await url.addBillingDetails(mUserInfo);
        console.log(result);
        assert.isNotNull(result);
      //  assert.isObject(result);
        assert.isObject(result);

      });
      it("check given empty details",async function (){
        var mUserInfo = {};
        mUserInfo.email= "" ;
        mUserInfo.firstName = "";
        mUserInfo.lastName = "";
        mUserInfo._id = "";

      var result = await url.addBillingDetails(mUserInfo);
      console.log(result);
      assert.equal(result,null);


    });
    });


      describe("addGoogleUser",  async function (){
            it("check given valid details",async function (){
              var req = {};
              req.body = {};

               req.body.email = configTest.addnewgoogleuser;
               req.body.userName = "sel1994";
               req.body.firstName = configTest.user.firstName;
               req.body.lastName = configTest.user.lastName;
               req.body.profileImage = configTest.user.profileImage;
               req.body.firebaseId = "123867544";
               console.log("testttttt");
               console.log(req);


            var result = await url.addGoogleUser(req);
            console.log(result);
            assert.isNotNull(result);
            assert.isObject(result);

          });
          it("check the 401 scenrio",async function (){
            var req = {};
            req.body = {};

             req.body.email = configTest.addnewgoogleuser;
             req.body.userName = "sel1994";
             req.body.firstName = configTest.user.firstName;
             req.body.lastName = configTest.user.lastName;
             req.body.profileImage = configTest.user.profileImage;
             req.body.firebaseId = "123867544";
             // console.log("testttttt");
             // console.log(req);


          var result = await url.addGoogleUser(req);
          console.log(result);
          console.log(result.status);
          assert.equal(result.status,"401");

        });

        });

          describe("googleUser",  async function (){
                it("check given valid details",async function (){
                  var req = {};
                  req.body = {};
                  req.body.firebaseId = configTest.user.firebaseId;

                var result = await url.googleUser(req);
                console.log(result);
                assert.equal(result.status,"200");
                // assert.isNotNull(result);
                // assert.isObject(result);

              });

            });


      describe("getReferenceToken",  async function (){
            it("check given valid details",async function (){
            var result = await url.getReferenceToken();
            console.log(result);
            //assert.isNull(result);
             assert.isNotNull(result);
            // assert.isObject(result);

          });

        });



        describe("addGithubUser",  async function (){
              it("check given valid details",async function (){
                var req = {};
                req.body = {};
                 req.body.userName = configTest.githubnewuser;
                 req.body.email = "user1234@gmail.com";

                 req.body.firstName = configTest.user.firstName;
                 req.body.lastName = configTest.user.lastName;
                 req.body.profileImage = configTest.user.profileImage;
                 req.body.firebaseId = "7654321";

              var result = await url.addGithubUser(req);
              console.log("jjjjjjjj");
              console.log(result);
              assert.isNotNull(result);
              assert.isObject(result);

            });

            it("check 401 scenerio",async function (){
               var req = {};
               req.body = {};
               req.body.userName = configTest.githubnewuser;
               req.body.email = "user1234@gmail.com";

               req.body.firstName = configTest.user.firstName;
               req.body.lastName = configTest.user.lastName;
               req.body.profileImage = configTest.user.profileImage;
               req.body.firebaseId = "7654321";


            var result = await url.addGithubUser(req);
            console.log("cccccccccc");
            console.log(result);
            console.log(result.status);
            assert.equal(result.status,"401");

          });
          });

        describe("updateAutoUser",  async function (){
              it("check given valid details",async function (){
                var req = {};
                req.body = {};

                 req.body.email = configTest.user.email;
                 req.body.userName = "testuser";
                 req.body.firstName = configTest.user.firstName;
                 req.body.lastName = configTest.user.lastName;
                 req.body.profileImage = configTest.user.profileImage;
                 req.body.firebaseId = configTest.user.firebaseId;

                 var userResult =[{
                        _id : userid,

                  }];

              var result = await url.updateAutoUser(userResult,req);
              console.log(result);
              assert.isNotNull(result);
              assert.isObject(result);

            });

            it("check given empty details",async function (){
              var req = {};
              req.body = {};

               req.body.email = "";
               req.body.userName = "";
               req.body.firstName = "";
               req.body.lastName = "";
               req.body.profileImage = "";
               req.body.firebaseId = "";

               var userResult =[{
                      _id : "",

                }];

            var result = await url.updateAutoUser(userResult,req);
            console.log(result);
            assert.equal(result,null);

    });

          it("check given wrong userid ",async function (){
            var req = {};
            req.body = {};

             req.body.email = "";
             req.body.userName = "";
             req.body.firstName = "";
             req.body.lastName = "";
             req.body.profileImage = "";
             req.body.firebaseId = "";

             var userResult =[{
                    _id : "45789654",

              }];

          var result = await url.updateAutoUser(userResult,req);
          console.log(result);
          assert.equal(result,null);

          });

          });


        describe("checkAutoUserExist",  async function (){
              it("check given valid details",async function (){
                var req = {};
                req.body = {};
                req.body.userName = "testuser";
              var result = await url.checkAutoUserExist(req);
              console.log(result);
              assert.equal(result.status,"200");

            });
            it("check given empty details",async function (){
              var req = {};
              req.body = {};
              req.body.userName = "";
            var result = await url.checkAutoUserExist(req);
            assert.equal(result.status,"200");

          });

          });

        describe("githubUser",  async function (){
              it("check given valid details",async function (){
                var req = {};
                req.body = {};
              req.body.firebaseId =  configTest.user.firebaseId ;
              var result = await url.githubUser(req);
              // assert.equal(result.status,"200");
                assert.equal(result.status,"200");
            });

            it("check given empty details",async function (){
              var req = {};
              req.body = {};
            req.body.firebaseId = "";
            var result = await url.githubUser(req);
            console.log(result);
            // assert.equal(result.status,"200");
            assert.equal(result.status,"200");


          });
          });

        describe("checkReferenceToken",  async function (){
          it("check 200 scenario",async function (){

          var result = await url.checkReferenceToken("s3s3s3s3");
          console.log(result);
          assert.equal(result.status,"200");
          });
              it("check 401 scenario",async function (){

              var result = await url.checkReferenceToken(configTest.user.referenceToken);
              console.log(result);
              assert.equal(result.status,"401");
            });

          });

          describe("addAutomatedUser",  async function (){
                it("check given valid details",async function (){
                  var req = {};
                  req.body = {};
                  req.body.userName = configTest.addautomatedutuser;
                  req.body.email ="utatuser@gmail.com";
                  req.body.firstName =configTest.user.firstName;
                  req.body.lastName =configTest.user.lastName;
                  req.body.profileImage =configTest.user.profileImage;
                  req.body.referenceToken ="5698741k";


                var result = await url.addAutomatedUser(req);
                console.log(result);
                assert.isObject(result);

                //assert.equal(result.status,"200");

              });

              it("check 401 scenario ",async function (){
                var req = {};
                req.body = {};
                req.body.userName = configTest.addautomatedutuser;
                req.body.email ="utatuser@gmail.com";
                req.body.firstName =configTest.user.firstName;
                req.body.lastName =configTest.user.lastName;
                req.body.profileImage =configTest.user.profileImage;
                req.body.referenceToken ="5698741k";


              var result = await url.addAutomatedUser(req);
              console.log(result);
              assert.equal(result.status,"401");

            });

            it("check given empty details",async function (){
              var req = {};
              req.body = {};
              req.body.userName = "";
              req.body.email ="";
              req.body.firstName ="";
              req.body.lastName ="";
              req.body.profileImage ="";
              req.body.referenceToken ="";

            var result = await url.addAutomatedUser(req);
            console.log(result);
            assert.equal(result,null);

            //assert.equal(result.status,"200");

          });

            });
