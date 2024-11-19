import { Schema, Document } from "mongoose";

export interface UserIntegrationDTO extends Document {
  uuid: string;
  user_id: Schema.Types.ObjectId;
  provider_id: String;
  status: number;
  variant: String;
  auth_type: String;
  provider_data: any;
  account_id: string;
  cby: String;
  cdate: Date;
  mby: String;
  mdate: Date;
  dby: String;
  ddate: Date;
  organization_id: String;
  workspace_id: String;
  account_data: any;
  integration_feature?: string[];
}
