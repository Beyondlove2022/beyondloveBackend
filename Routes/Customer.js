import express from "express";
import {
  customerLogin,
  customerRegister,
  customerRegisterWithOtp,
  getCustomerProfile,
  updateCustomerProfile,
} from "../Controllers/customer.js";
import { customerAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/customer/register-otp/:number", customerRegisterWithOtp);
route.post("/customer/register", customerRegister);
route.post("/customer/login", customerLogin);
route.put(
  "/customer/update-profile/:token",
  customerAuthentication,
  updateCustomerProfile
);
route.get("/customer/get-profile/:id", getCustomerProfile);

export default route;
