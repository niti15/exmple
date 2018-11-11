/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [SlaveSchema - For Slave DB operations]
 * @type {Schema}
 */
var SlaveSchema = new Schema({
  job: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  }
});

//Export module
module.exports = mongoose.model("Slave", SlaveSchema);
