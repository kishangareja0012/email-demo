import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
// Configure DB here

app.listen(port, async () => {
  console.log(" Server up and running on ", port);
});
