import fetch from "node-fetch";
import PetBoarding from "../Models/petBoarding.js";
import PetClinic from "../Models/petClinic.js";
import PetFood from "../Models/petFood.js";
import PetGrooming from "../Models/petGrooming.js";
import PetTraining from "../Models/petTraining.js";
import Customer from "../Models/customer/account.js";

const generateOTP = async (
  to,
  msg,
  template_id,
  userType,
  otpType,
  req,
  res,
  category
) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const key = process.env.API_KEY;
  const sender = process.env.SENDER;
  const message = otp + " " + msg;
  const mobile = to;
  const email = req.body.email;

  try {
    let findUser;
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
      findUser = await categoryName.findOne({ mobile });
    }
    if (userType == "Customer") {
      findUser = await Customer.findOne({ mobile });
    }
    if (otpType == "reset") {
      if (!findUser) {
        return res.json({
          success: false,
          msg: "Account doesn't exist, Please Register",
        });
      }
      if (otpType == "register") {
        if (!findUser) {
          return res.json({
            success: false,
            msg: "Account already exist, Please Login",
          });
        }
      }
    }
    const sendOtp =
      "http://thesmsbuddy.com/api/v1/sms/send?key=" +
      key +
      "&type=1&to=" +
      to +
      "&sender=" +
      sender +
      "&message=" +
      message +
      "&flash=0&template_id=" +
      template_id;
    fetch(sendOtp, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((response) => {
        otpResponse(response, otp, mobile, userType, otpType, res);
      });
    const otpResponse = async (
      response,
      otp,
      mobile,
      userType,
      otpType,
      res
    ) => {
      if (response.status == "200") {
        console.log(otp);
        const newOtp = await new Otp({
          otp,
          mobile,
          otpType,
          userType,
        });
        console.log(newOtp);
        await newOtp.save();
        return res.json({ success: true, msg: "Otp Sent Successfully" });
      } else {
        return res.json({ success: false, msg: response });
      }
    };
  } catch (error) {
    return res.json({ success: false, error });
  }
};
