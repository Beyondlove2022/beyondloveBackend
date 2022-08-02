import bcrypt from "bcryptjs";
import Customer from "../Models/customer/account";
import PetBoarding from "../Models/petBoarding.js";
import PetClinic from "../Models/petClinic.js";
import PetFood from "../Models/petFood.js";
import PetGrooming from "../Models/petGrooming.js";
import PetTraining from "../Models/petTraining.js";
import Otp from "../Models/otp";
import { register } from "./Business";
import { customerRegister } from "./customer";

export const forgetPassword = async (req, res) => {
  const to = req.params.number;
  const userType = req.body.type;
  let msg;
  let template_id;
  const otpType = "reset";

  try {
    return await generateOTP(to, msg, template_id, userType, otpType, req, res);
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const resetPassword = async (req, res) => {
  const mobile = req.params.number;
  let password = req.body.password;
  const userType = req.body.type;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    if (userType == "Business") {
      let categoryName;
      if (category == "PetClinic") {
        console.log("comes");
        categoryName = PetClinic;
      } else if (category == "PetBoarding") {
        categoryName = PetBoarding;
      } else if (category == "PetGrooming") {
        categoryName = PetGrooming;
      } else if (category == "PetTraining") {
        categoryName = PetTraining;
      } else if (category == "PetFood") {
        categoryName = PetFood;
      } else {
        return res.json({
          success: false,
          msg: "This category not available",
        });
      }
      const user = await categoryName.findOne({ mobile });
      await categoryName.findByIdAndUpdate({ _id: user._id }, { password });
      const business = await categoryName.findById(user._id);
      return res.json({
        success: true,
        msg: "Password Resetted Successfully",
        business,
      });
    }
    if (userType == "Customer") {
      const user = await Customer.findOne({ mobile });
      console.log(user, "customer");
      await Customer.findByIdAndUpdate({ _id: user._id }, { password });
      const customer = await Customer.findById(user._id);
      return res.json({
        success: true,
        msg: "Password Resetted Successfully",
        customer: customer,
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      msg: "Something Went Wrong",
      error: error,
    });
  }
};

export const verifyOTP = async (req, res) => {
  const otp = req.params.otp;
  const mobile = req.body.mobile;
  try {
    const mobileOtps = await Otp.find({ mobile });
    let otpFind = mobileOtps.filter((otps) => otps.verified == false);
    let n = otpFind.length;
    console.log(otpFind[n - 1]);

    if (otpFind[n - 1] == undefined)
      return res.json({
        success: false,
        msg: "Otp didn't sent to this number",
      });
    if (otpFind[n - 1].otp == otp) {
      const verified = true;
      await Otp.findByIdAndUpdate({ _id: otpFind[n - 1]._id }, { verified });
      if (otpFind[n - 1].otpType == "register") {
        if (otpFind[n - 1].userType == "Business") {
          return await register(req, res);
        }
        if (otpFind[n - 1].userType == "Customer") {
          return await customerRegister(req, res);
        }
      }
      return res.json({ success: true, msg: "OTP Verified" });
    }
    console.log(otpFind[n - 1].otp, otp);
    if (otpFind[n - 1].otp != otp)
      return res.json({ success: false, msg: "Please Enter Correct Otp" });
  } catch (error) {
    return res.json({
      success: false,
      msg: "Something Went Wrong",
      error: error,
    });
  }
};
