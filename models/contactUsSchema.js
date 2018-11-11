/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [ContactUsSchema - For ContactUs DB operations]
 * @type {Schema}
 */
var ContactUsSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String,
    required: true,
    max: 50
  },
  subject: {
    type: String,
    required: true
  },
  subjectStatus: {
    type: String,
    required: true
  },
  messageContent: {
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

// Export model.
module.exports = mongoose.model("ContactUs", ContactUsSchema);
