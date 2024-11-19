import { UserIntegrationController } from "../../src/controllers/user.integration.controller";
import { Request, Response } from "express";
import { ActiveCampaignService } from "../../src/services/activecampaign.service";

jest.mock("../../src/services/activecampaign.service");

describe("UserIntegrationController", () => {
  it("should fetch lists and return them in the response", async () => {
    const mockFetchLists = jest
      .fn()
      .mockResolvedValue([{ id: "1", name: "Test List" }]);
    ActiveCampaignService.prototype.fetchLists = mockFetchLists;

    const req = {
      body: { accountName: "test-account", userId: "test-user" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await UserIntegrationController.fetchLists(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "1", name: "Test List" },
    ]);
  });

  it("should handle errors during fetchLists", async () => {
    const mockFetchLists = jest
      .fn()
      .mockRejectedValue(new Error("Fetch Error"));
    ActiveCampaignService.prototype.fetchLists = mockFetchLists;

    const req = {
      body: { accountName: "test-account", userId: "test-user" },
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await UserIntegrationController.fetchLists(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Fetch Error" });
  });
});
