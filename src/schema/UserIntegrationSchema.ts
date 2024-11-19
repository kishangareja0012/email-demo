import mongoose, { Schema } from "mongoose";
import { UserIntegrationDTO } from "../dto/types/user.integration";

const UserIntegrationSchema = new Schema<UserIntegrationDTO>(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    organization_id: {
      type: String,
      required: false,
    },
    workspace_id: {
      type: String,
      required: false,
    },
    provider_id: {
      type: String, // id from tools master schema
      required: true,
      index: true,
    },
    integration_feature: {
      type: [String], // campaign, email_verifier, true_verifier ...
      required: false,
      index: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
    },
    variant: {
      type: String,
      required: true, // Mailchimp, Hubspot, Active Campaign.....
    },
    auth_type: {
      type: String,
      required: true, // Oauth, key ...
    },
    account_data: {
      type: Schema.Types.Mixed,
    },
    provider_data: {
      type: Schema.Types.Mixed, // Flexibility to store additional provider-specific data - access_token , refresh_token , api_key .. etc
    },

    cby: {
      type: String,
      default: null,
    },
    cdate: {
      type: Date,
      default: Date.now,
    },
    mby: {
      type: String,
      default: null,
    },
    mdate: {
      type: Date,
      default: null,
    },
    dby: {
      type: String,
      default: null,
    },
    ddate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserIntegrationSchema.index({ uuid: 1, user_id: 1, provider_id: 1 });

export default mongoose.model(
  "UserIntegration",
  UserIntegrationSchema,
  "user_integration"
);
