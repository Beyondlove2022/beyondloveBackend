import express from "express";
import {
  forgetPassword,
  resetPassword,
  verifyOTP,
} from "../Controllers/ForgetAndReset";

const router = express.Router();

router.post("/forget-password/otp/:number", forgetPassword);
router.post("/verify/otp/:otp", verifyOTP);
router.post("/reset-password/otp/:number", resetPassword);

export default router;
