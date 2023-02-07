import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async (): Promise<void> => {
  try {
    const uri: string = process.env.MONGODB_URI || "";
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

export default connectToMongoDB;
