/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


/**
 * [BillingSchema - For Pricing DB operations]
 * @type {Schema}
 */
var BillingSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  customerId: {
    type: String,
    required: true
  },
  subscriptionId: {
    type: String,
    required: true
  },
  subscriptionStatus: {
    type: String,
    required: true
  },
  planId: {
    type: String
  },
  planUnitPrice: {
    type: String
  },
  nextBillingAt: {
    type: String
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

// Export model.
module.exports = mongoose.model("Billing", BillingSchema);
