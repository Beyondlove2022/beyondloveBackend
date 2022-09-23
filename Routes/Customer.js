import express from "express";
import {
  // createAppointment,
  customerLogin,
  customerRegister,
  customerRegisterWithOtp,
  getAllCustomers,
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
// route.post(
// 	"/customer/appointment-booking/:token",
// 	customerAuthentication,
// 	createAppointment
// );
route.get("/customer/get-all-customers", getAllCustomers);

export default route;
