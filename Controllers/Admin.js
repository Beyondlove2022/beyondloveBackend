import bcrypt from "bcryptjs";
import Admin from "../Models/Admin.js";
import Customer from "../Models/customer/account.js";
import { generateToken } from "../Utils/jwtToken.js";

export const createAdmin = async (req, res) => {
  let { email, password, mobile } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const admin = await new Admin({
      email,
      mobile,
      password,
    });
    return await admin.save();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const adminLogin = async (req, res) => {
  const { mobile, password } = req.body;
  console.log(mobile);
  try {
    let admin = await Admin.findOne({ mobile });
    console.log({ admin });
    if (!admin) {
      return res.json({
        success: false,
        msg: "You are not registered as Admin",
      });
    }
    const passwordcrct = await bcrypt.compare(password, admin.password);
    if (!passwordcrct) {
      return res.json({ success: false, msg: "Incorrect Password" });
    }
    const loginToken = { id: admin._id };
    const token = await generateToken(loginToken);
    return res.json({
      success: true,
      msg: "Login Success",
      token: token,
      admin,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const allUsers = await Customer.find();
    return res.json({
      success: true,
      msg: "All Customer Details Sended Successfully",
      allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const getUniqueCustomer = async (req, res) => {
  const { userId } = req.body;
  try {
    const findUniqueCustomer = await Customer.findById(userId);
    if (!findUniqueCustomer)
      return res.json({ success: false, msg: "This User Data Not Found" });
    return res.json({
      success: true,
      msg: "Unique User Data Sended Successfully",
      user: findUniqueCustomer,
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};
