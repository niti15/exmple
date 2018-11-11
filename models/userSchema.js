/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [UserSchema - For user DB operations]
 * @type {Schema}
 */
var UserSchema = new Schema({
  email: {
    type: String,
    max: 50
  },
  userName: {
    type: String,
    required: false,
    max: 50,
  },
  firstName: {
    type: String,
    required: false,
    max: 50,
  },
  lastName: {
    type: String,
    required: false,
    max: 50,
  },
  profileImage: {
    type: String
  },
  firebaseId: {
    type: String
  },
  sourceLogin: {
    type: String,
    required: false
  },
  isEmailVerified: {
    type: String,
    required: false
  },
  referenceToken: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: String
  },
  lastUpdated: {
    type: String
  }
});

//Export Module
module.exports = mongoose.model("User", UserSchema);
