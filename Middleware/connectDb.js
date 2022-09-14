// import { ProcessCredentials } from "aws-sdk";
import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.LIVE_DB_1, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected sucessfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectdb;
