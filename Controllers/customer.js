import bcrypt from "bcryptjs";

import { generateToken } from "../Utils/jwtToken.js";
import Customer from "../Models/customer/account.js";

export const customerRegister = async (req, res) => {
  let { mobile, email, password, customerName } = req.body;
  console.log(req.body);
  try {
    let findEmail = await Customer.findOne({ email });
    let findMobile = await Customer.findOne({ mobile });
    // console.log({ findMobile });

    if (findEmail || findMobile) {
      if (findEmail && findMobile)
        return res.json({
          success: false,
          msg: "Email And Mobile Number Already Exist",
        });
      if (findEmail)
        return res.json({ success: false, msg: "Email Already Exist" });
      if (findMobile)
        return res.json({
          success: false,
          msg: "Mobile Number Already Exist",
        });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let customer = await new Customer({
      customerName,
      password,
      mobile,
      email,
    });
    await customer.save();
    const tok = { id: customer._id };
    const token = await generateToken(tok);
    let customerDetails = await Customer.findById(customer._id);
    return res.json({
      success: true,
      msg: "Registered Successfully",
      customerDetails,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const customerLogin = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    let customer = await Customer.findOne({ mobile });
    if (!customer) {
      return res.json({ success: false, msg: "You are not registered" });
    }
    const passwordcrct = await bcrypt.compare(password, customer.password);
    if (!passwordcrct)
      return res.json({ success: false, msg: "Incorrect Password" });
    const logintoken = { id: customer._id };
    const token = await generateToken(logintoken);
    return res.json({
      success: true,
      msg: "Login Success",
      token: token,
      customer,
    });
  } catch (error) {
    console.log("error", error);
    return res.json({ success: false, msg: "something went wrong" });
  }
};

export const updateCustomerProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.json({ success: false, msg: "Customer Profile not found" });
    }
    await Customer.findByIdAndUpdate({ _id: id }, { $set: req.body });
    const customerDetails = await Customer.findById(id);
    return res.json({ success: true, customerDetails, msg: "Profile Updated" });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getCustomerProfile = async (req, res) => {
  const id = req.params.id;
  try {
    let customer = await Customer.findById(id);
    if (!customer)
      return res.json({ success: false, msg: "Profile not found" });
    return res.json({ success: true, customer: customer });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};
