import express from "express";
import {
  forgetPassword,
  // resetPassword,
  verifyOTP,
} from "../Controllers/ForgetAndReset.js";

const router = express.Router();

router.post("/forget-password/:category/:number", forgetPassword);
router.post("/verify-otp/:otp", verifyOTP);
// router.post("/reset-password/:otp/:number/:category", resetPassword);

export default router;
