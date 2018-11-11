/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [StageSchema - For Stage DB operations]
 * @type {Schema}
 */
var StageSchema = new Schema({
  job: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  limage: {
    type: String,
    required: true
  }
});

//Export Module
module.exports = mongoose.model("Stage", StageSchema);
