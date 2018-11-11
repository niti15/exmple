/**
 * This file BillingSchema.js deals with structuring billing data.
 */

/* Requires dependency npm. */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * [WorkspaceSchema - For Workspace DB operations]
 * @type {Schema}
 */

var WorkspaceSchema = new Schema(
    {
      userId :
      {
        type: String,
        required:true
      },
      workspaceName:
      {
        type: String,
        required:true,
        max: 50
      },
      iconPicture:
      {
        type: String,
        required:true,
        max: 50
      },
      lastUpdated:
      {
        type: String,
        required: true
      },
      createdAt:
      {
        type: String,
        required: true
      }
    }
  );

//Export Module
module.exports = mongoose.model("Workspace", WorkspaceSchema);
