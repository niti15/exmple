/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [RegistrySchema - For Registry DB operations]
 * @type {Schema}
 */
var RegistrySchema = new Schema({
  job: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  }
});

// Export model.
module.exports = mongoose.model("Registry", RegistrySchema);
