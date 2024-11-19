import { ActiveCampaignService } from "../../src/services/activecampaign.service";
import axios from "axios";

jest.mock("axios");

describe("ActiveCampaignService", () => {
  let service: ActiveCampaignService;

  beforeEach(() => {
    service = new ActiveCampaignService("test-account", {
      access_token: "test-access-token",
      refresh_token: "test-refresh-token",
      expires_in: 3600,
    });
  });

  it("should fetch lists successfully", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: { lists: [{ id: "1", name: "Test List" }] },
    });

    const lists = await service.fetchLists();
    expect(lists).toEqual([{ id: "1", name: "Test List" }]);
  });

  it("should handle fetchLists errors", async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error("API Error")
    );

    await expect(service.fetchLists()).rejects.toThrow("API Error");
  });
});
