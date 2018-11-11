/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [BuildHistorySchema - For BuildHistory DB operations]
 * @type {Schema}
 */

var BuildHistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
    max: 50
  },
  jobId: {
    type: String,
    required: true,
    max: 50
  },
  jobJenkinsName: {
    type: String,
    required: true,
    max: 50
  },
  buildNumber: {
    type: String,
    required: false,
    max: 50
  },
  buildStatus: {
    type: String,
    required: false
  },
  buildStartTime: {
    type: String,
    required: true
  },
  buildEndTime: {
    type: String,
    required: true
  },
  buildDuration: {
    type: String,
    required: true
  },
  utStatus: {
    type: String,
    required: true
  },
  ccStatus: {
    type: String,
    required: true
  },
  crStatus: {
    type: String,
    required: true
  },
  e2eStatus: {
    type: String,
    required: true
  },
  ptStatus: {
    type: String,
    required: true
  },
  lastUpdated: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

// Virtual for this BuildHistorySchema instance URL.
BuildHistorySchema
  .virtual("buildHistoryId")
  .get(function() {
    return this._id;
  });

// Export model.
module.exports = mongoose.model("BuildHistory", BuildHistorySchema);
