import axios from "axios";
import { Logger } from "../utils/logger";
import { ActiveCampaignTokenDTO } from "../dto/types/app.integration";
import { EncryptionUtil } from "../utils/encryption";
import AppIntegrationSchema from "../schema/AppIntegrationSchema";

export class ActiveCampaignService {
  private baseUrl: string;

  constructor(
    private accountName: string,
    private token: ActiveCampaignTokenDTO
  ) {
    this.baseUrl = `https://${accountName}.api-us1.com/api/3`;
  }

  static async getToken(
    userId: string
  ): Promise<ActiveCampaignTokenDTO> {
    const tokenData = await AppIntegrationSchema.findOne({
      user_id: userId,
    });
    if (!tokenData) throw new Error("Token not found");

    return {
      access_token: EncryptionUtil.decrypt(
        tokenData.provider_data.access_token
      ),
      refresh_token: EncryptionUtil.decrypt(
        tokenData.provider_data.refresh_token
      ),
      expires_in: tokenData.provider_data.expires_in,
      token_type: tokenData.provider_data.token_type,
      account_name: tokenData.provider_data.account_name,
    };
  }

  async fetchLists(): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/lists`, {
      headers: { Authorization: `Bearer ${this.token.access_token}` },
    });
    return response.data.lists;
  }

  async fetchContacts(): Promise<any[]> {
    try {
      const contacts: any[] = [];
      let offset = 0;
      const limit = 100;

      while (true) {
        const response = await axios.get(`${this.baseUrl}/contacts`, {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
          params: { limit, offset, "filters[status]": 1 },
        });

        contacts.push(...response.data.contacts);
        if (response.data.contacts.length < limit) break;

        offset += limit;
      }

      return contacts;
    } catch (error) {
      Logger.error(
        "Error fetching contacts from ActiveCampaign",
        error
      );
      throw error;
    }
  }

  async unsubscribeContact(
    listId: string,
    contactId: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/contactLists`,
        {
          contactList: {
            list: listId,
            contact: contactId,
            status: 2,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.token.access_token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      Logger.error(
        "Error unsubscribing contact in ActiveCampaign",
        error
      );
      throw error;
    }
  }
}
