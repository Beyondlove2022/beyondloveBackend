import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
    },
    otp: {
      type: Number,
    },
    otpType: {
      type: String,
    },
    userType: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Otp = mongoose.model("otp", otpSchema);

export default Otp;
