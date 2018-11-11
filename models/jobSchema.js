/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [JobSchema - For Job DB operations]
 * @type {Schema}
 */
var jobSchema = new Schema({
  jobRefName: {
    type: String,
    required: true,
    max: 50
  },
  jobJenkinsName: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  userId: {
    type: String,
    required: true,
    max: 50,
  },
  noOfDeploy: {
    type: String,
    required: true,
    max: 50,
  },
  lastDeployStatus: {
    type: String,
    required: true,
    max: 50,
  },
  overAllBuildTime: {
    type: String,
    required: true,
    max: 50,
  },
  sourceRepo: {
    type: String,
    required: true,
    max: 50,
  },
  branchName: {
    type: String,
    required: true,
    max: 50,
  },
  sourceUrl: {
    type: String,
    required: true,
    max: 50,
  },
  appTypeId: {
    type: String,
    required: true,
  },
  techStackId: {
    type: String,
    required: true,
  },
  sourceId: {
    type: String,
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  },
  isUtEnabled: {
    type: String,
    required: true,
    max: 50,
  },
  isCodeReviewEnabled: {
    type: String,
    required: true,
    max: 50,
  },
  sonarqApi: {
    type: String,
    required: false,
    max: 50,
  },
  sonarqUrl: {
    type: String,
    required: false,
    max: 50,
  },
  isE2eEnabled: {
    type: String,
    required: true,
    max: 50,
  },
  isPerformanceTestEnabled: {
    type: String,
    required: true,
    max: 50,
  },
  isSlackEnabled: {
    type: String,
    required: true,
    max: 50,
  },
  slackBaseUrl: {
    type: String
  },
  slackToken: {
    type: String
  },
  isNotifyEmail: {
    type: String,
    required: true,
  },
  notifyEmail: {
    type: String
  },
  isStaging: {
    type: String,
    required: true,
  },
  doApiKey: {
    type: String,
    required: true,
  },
  envData: {
    type: String
  },
  createdAt: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: String,
    required: true,
  },
  triggerStatus: {
    type: String
  }
});

//Export Model
module.exports = mongoose.model("Job", jobSchema);
