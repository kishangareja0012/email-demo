import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";

const app: Application = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(`/api/v1`, routes);

export default app;
