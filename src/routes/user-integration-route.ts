import { Router } from "express";
import { UserIntegrationController } from "../controllers/user.integration.controller";

const router = Router();

router.post("/lists", UserIntegrationController.fetchLists);
router.post(
  "/unsubscribe",
  UserIntegrationController.unsubscribeContact
);

export default router;
