import { NextFunction, Request, Response } from "express";
import { ActiveCampaignService } from "../services/activecampaign.service";
import AppIntegrationSchema from "../schema/AppIntegrationSchema";

export class UserIntegrationController {
  static async fetchLists(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.body;

      // Fetch token as ActiveCampaignTokenDTO
      const tokenData = await ActiveCampaignService.getToken(userId);

      // Pass full token object to service
      const service = new ActiveCampaignService(
        tokenData.account_name,
        tokenData
      );
      const lists = await service.fetchLists();

      res.status(200).json(lists);
    } catch (error) {
      next(error);
    }
  }

  static async unsubscribeContact(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const { accountName, userId, listId, contactId } = req.body;
      const tokenData = await AppIntegrationSchema.findOne({
        user_id: userId,
      });

      if (!tokenData)
        return res.status(404).json({ message: "Token not found" });

      const service = new ActiveCampaignService(
        accountName,
        tokenData.provider_data
      );
      const result = await service.unsubscribeContact(
        listId,
        contactId
      );
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
