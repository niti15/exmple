"use strict";

const chai = require("chai");
const expect = require("chai").expect;
chai.use(require("chai-http"));
const app = require("../app.js"); // Our app
describe("Index router", function() {
  this.timeout(5000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {
//process.exit();
  });

  /**
     * this method is To check for empty get function .
      * @param  {String}  req  [jobId]
      *
      * @return {String} res [status]
      * @return {String} res [message]
     */

  it("Example Program in user.js", function() {
    return chai.request(app)
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
      //  console.log("info,data");
      });
  });
});
