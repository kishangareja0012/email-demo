import express, { Router } from "express";
const router: Router = express.Router();

import UserIntegrationRouter from "./user-integration-route";

router.use("/user/integration", UserIntegrationRouter);

export default router;
