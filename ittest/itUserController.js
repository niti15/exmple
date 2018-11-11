"use strict";
const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js");
var configTest = require("../config_test");
var config = require("../config");
//var user_id ;
var userid = configTest.user._id.toString();

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var async = require('async');
  var moment = require("moment");
  var mongoose = require('mongoose');
  var mongoDB = config.mongoDBUrl;
  mongoose.connect(mongoDB);
  mongoose.Promise = global.Promise;
  var db = mongoose.connection;
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

describe("Google_login", function() {
  this.timeout(15000);
  before(function() {});
  after(function() {});
  it("should login -200", function() {
      this.timeout(15000);

   return chai.request(app)
      .post("/users/google_login")
      .send({
        firebaseId: configTest.user.firebaseId,
        firstName: configTest.user.firstName,
        lastName: configTest.user.lastName,
        email: configTest.user.email,
        profileImage: configTest.user.profileImage
      })
      .then(function(res) {
        // var parsedata = JSON.parse(res.text);
        // user_id = parsedata.data._id;
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });
  it("should login -400 --email not given", function() {
    return chai.request(app)
      .post("/users/google_login")
      .send({
        firebaseId: configTest.user.firebaseId,
        firstName: configTest.user.firstName,
        lastName: configTest.user.lastName,
        profileImage: configTest.user.profileImage
      })
      .then(function(res) {
      //  console.log(res);
      //  console.log(res.status);
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
  });
  it("should login -400  firebaseid not given", function() {
    return chai.request(app)
      .post("/users/google_login")
      .send({
        firstName: configTest.user.firstName,
        lastName: configTest.user.lastName,
        email: configTest.user.email,
        profileImage: configTest.user.profileImage
      })
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
  });
  it("should login -400  firstname not given", function() {
    return chai.request(app)
      .post("/users/google_login")
      .send({
        firebaseId: configTest.user.firebaseId,
        lastName: configTest.user.lastName,
        email: configTest.user.email,
        profileImage: configTest.user.profileImage
      })
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
  });
  it("400 scenario all field empty", function() {
    return chai.request(app)
      .post("/users/google_login")
      .send({
        firebaseId:"",
        firstName:"",
        lastName:"",
        email:"",
        profileImage:""
      })
      .then(function(res) {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
      });
  });
  });

describe("View_Profile", function() {
  this.timeout(10000);
  before(function() {});
  after(function() {});
  it("View profile -200 case", function() {
    //console.log(userid);
      return chai.request(app)
      .get("/users/profile/"+userid)
      .then(function(res) {
        //console.log(res);
        if (res.status === 200) {
          console.log(userid);
          //expect(res).to.have.message("welcome to create job engine")
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        }
      });
  });

  it("View profile -401 case", function() {
    this.timeout(10000);
    return chai.request(app)
      .get("/users/profile/0pHghNAzpPWiO1xryxUuBKFFn3a2")
      .then(function(res) {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
      });
  });

});
describe("joblist", function() {
  this.timeout(10000);
  before(function() {});
  after(function() {});
  it("Job list -200 case", function() {

      return chai.request(app)
      .get("/users/job/"+userid+"/list")
      .then(function(res) {
        if (res.status === 200) {
          //expect(res).to.have.message("welcome to create job engine")
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        }
      });
  });
});

describe("profileupdate", function() {
  this.timeout(10000);
  before(function() {});
  after(function() {});

    it("Profile Updation-200 -1", function() {
      this.timeout(15000);
      return chai.request(app)
        .post("/users/profile/update")
        .send({
          userId:userid,
          firstName: configTest.user.firstName,
          lastName: configTest.user.lastName,
          email: configTest.user.email,
          profileImage: configTest.user.profileImage

        })
        .then(function(res) {
        // console.log(res);
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        });
    });

    it("Profile Updation-400 invalid user id", function() {
      this.timeout(15000);
      return chai.request(app)
        .post("/users/profile/update")
        .send({
          userId:"54763984737",
          firstName: configTest.user.firstName,
          lastName: configTest.user.lastName,
          email: configTest.user.email,
          profileImage: configTest.user.profileImage

        })
        .then(function(res) {
          //console.log(res.status);
          expect(res).to.have.status(401);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        });
    });
    it("Profile Updation-400  given empty values", function() {
      this.timeout(15000);
      return chai.request(app)
        .post("/users/profile/update")
        .send({
          userId:"",
          firstName:"",
          lastName:"",
          email: "",
          profileImage:""
        })
        .then(function(res) {
        //  console.log(res.status);
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.an("object");
        });
    });

  });

  //
  // var MongoClient = require('mongodb').MongoClient;
  // var url = "http://mongodb://localhost:27017/mydb";
  // MongoClient.connect(url, function(err, db) {
  //   if (err) throw err;
  //   var query = {age : {$gt: 17} }, name : 'john'};
  //   db.collection("collectionName").find(query).toArray(function(err, result) {
  //     if (err) throw err;
  //     console.log(result);
  //     db.close();
  //   });
  // });


  module.exports = userid;
