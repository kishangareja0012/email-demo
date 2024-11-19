import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

// Configure DB here
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB successfully");
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();

app.listen(port, () => {
  console.log("Server up and running on", port);
});
