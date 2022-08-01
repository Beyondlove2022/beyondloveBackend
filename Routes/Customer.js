import express from "express";
import {
  customerLogin,
  customerRegister,
  getCustomerProfile,
  updateCustomerProfile,
} from "../Controllers/customer.js";
import { customerAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/customer/register", customerRegister);
route.post("/customer/login", customerLogin);
route.put(
  "/customer/update-profile/:token",
  customerAuthentication,
  updateCustomerProfile
);
route.get("/customer/get-profile", getCustomerProfile);

export default route;
