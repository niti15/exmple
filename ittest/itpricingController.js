"use strict";
const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js"); // Our app
var configTest = require("../config_test");
var config = require("../config");

describe("Plan updation", function() {
  this.timeout(10000); // How long to wait for a response (ms)
  before(function() {
  });
  after(function() {
  });

 it("Plan updation -200", function() {
    return chai.request(app)
      .post("/updatePlan")
      .send({
        userId:configTest.billings.userId,
        subscriptionId:configTest.billings.subscriptionId,
        planId:configTest.billings.planId,
        invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});

 it("Plan updation -200 -1", function() {
    return chai.request(app)
      .post("/updatePlan")
      .send({
        userId:configTest.billings.userId,
        subscriptionId:configTest.billings.subscriptionId,
        planId:configTest.billings.planId
        //invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});



 it("Plan updation -400 -1", function() {
    return chai.request(app)
      .post("/updatePlan")
      .send({
        userId:"",
        subscriptionId:"",
        planId:"",
        //invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});


 it("Plan updation -401 given invalid userid", function() {
    return chai.request(app)
      .post("/updatePlan")
      .send({
        userId:"5b8a8bddd533af0010bd",
        subscriptionId:configTest.billings.subscriptionId,
        planId:configTest.billings.planId
        //invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});

 it("Plan updation -403 given invalid subscriptionId", function() {
    return chai.request(app)
      .post("/updatePlan")
      .send({
        userId:configTest.billings.userId,
        subscriptionId:"HngToR2ZWZ",
        planId:configTest.billings.planId
        //invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(403);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});

it("Plan updation -400 given empty subscriptionId", function() {
   return chai.request(app)
     .post("/updatePlan")
     .send({
       userId:configTest.billings.userId,
       subscriptionId:"",
       planId:configTest.billings.planId
       //invoiceId:"9"
     })
     .then(function(res){
       console.log(res);
       expect(res).to.have.status(400);
       expect(res).to.be.json;
       //should(res).have.lengthOf(3,24);
     });
});


it("Plan updation -400 given empty userId", function() {
   return chai.request(app)
     .post("/updatePlan")
     .send({
       userId:"",
       subscriptionId:configTest.billings.subscriptionId,
       planId:configTest.billings.planId
       //invoiceId:"9"
     })
     .then(function(res){
       console.log(res);
       expect(res).to.have.status(400);
       expect(res).to.be.json;
       //should(res).have.lengthOf(3,24);
     });
});

it("Plan updation -400 given empty planId", function() {
   return chai.request(app)
     .post("/updatePlan")
     .send({
       userId:configTest.billings.userId,
       subscriptionId:configTest.billings.subscriptionId,
       planId:""
       //invoiceId:"9"
     })
     .then(function(res){
       console.log(res);
       expect(res).to.have.status(400);
       expect(res).to.be.json;
       //should(res).have.lengthOf(3,24);
     });
});

});

describe("getTrialDays", function() {
  this.timeout(10000); // How long to wait for a response (ms)
  before(function() {
  });
  after(function() {
  });

  it("Get trial days-400 --6", function() {
    return chai.request(app)
      .post("/getTrialDays")
      .send({
        //userId:"5b4a0b0d0cee890014af9ee6",
        // subscriptionId:"1mhuIhHQxr5QYDEq6",
        // planId:"justops-20",
        // invoiceId:"9"
      })
      .then(function(res){
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});


    it("Get trial days-200", function() {
    return chai.request(app)
      .post("/getTrialDays")
      .send({
        userId:configTest.billings.userId
        // subscriptionId:"1mhuIhHQxr5QYDEq6",
        // planId:"justops-20",
        // invoiceId:"9"
      })
      .then(function(res){
        console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        //should(res).have.lengthOf(3,24);
      });
});

it("Get trial days wrong params", function() {
  return chai.request(app)
    .post("/getTrialDays")
    .send({
    userid:"5b7652039a413f00108b58"
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
it("Get trial days empty params", function() {
  return chai.request(app)
    .post("/getTrialDays")
    .send({
    userid:""
    })
    .then(function(res){
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      //should(res).have.lengthOf(3,24);
    });
});
});
