import mongoose, { Schema } from "mongoose";
import { AppIntegrationDTO } from "../dto/types/app.integration";
import { EncryptionUtil } from "../utils/encryption";

const AppIntegrationSchema = new Schema<AppIntegrationDTO>(
  {
    uuid: { type: String, required: true, unique: true, index: true },
    status: { type: Number, enum: [0, 1, 2], default: 1 },
    provider: { type: String, required: true, index: true },
    auth_type: { type: String, required: true },
    credentials: {
      client_id: { type: String, required: false },
      client_secret: { type: String, required: false },
      redirect_url: { type: String, required: false },
      scopes: { type: [String], required: false },
      api_base_url: { type: String, required: false },
      other_meta_data: { type: Schema.Types.Mixed, required: false },
    },
    provider_logo: { type: String, required: false },
    integration_feature: {
      type: [String],
      required: false,
      index: true,
    },
    provider_data: {
      access_token: { type: String, required: true },
      refresh_token: { type: String, required: true },
      expires_in: { type: Number, required: true },
      token_type: { type: String, required: true },
      account_name: { type: String, required: true },
    },
    cby: { type: String, default: null },
    cdate: { type: Date, default: Date.now },
    mby: { type: String, default: null },
    mdate: { type: Date, default: null },
    dby: { type: String, default: null },
    ddate: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

AppIntegrationSchema.pre("save", function (next) {
  const data: any = this;
  if (data.isModified("provider_data")) {
    data.provider_data.access_token = EncryptionUtil.encrypt(
      data.provider_data.access_token
    );
    data.provider_data.refresh_token = EncryptionUtil.encrypt(
      data.provider_data.refresh_token
    );
  }
  next();
});

AppIntegrationSchema.index({ uuid: 1, provider: 1 });

export default mongoose.model(
  "AppIntegration",
  AppIntegrationSchema,
  "app_integration"
);
