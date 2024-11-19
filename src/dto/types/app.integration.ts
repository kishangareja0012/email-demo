import { Document } from "mongoose";

export interface AppIntegrationDTO extends Document {
  uuid: string;
  status: number;
  provider: string;
  auth_type: string;
  credentials: {
    client_id?: string;
    client_secret?: string;
    redirect_url?: string;
    scopes?: string[];
    api_base_url?: string;
    other_meta_data?: any;
  };
  provider_logo: string;
  integration_feature: string[];
  cby: string;
  cdate: Date;
  mby: string;
  mdate: Date;
  dby: string;
  ddate: Date;
  provider_data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    account_name: string;
  };
}

export interface ActiveCampaignTokenDTO {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  account_name: string;
}
