import express from "express";
import {
  adminLogin,
  createAdmin,
  getAllCustomers,
  getUniqueCustomer,
} from "../Controllers/Admin.js";
import { adminAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/admin/create", createAdmin);
route.post("/admin/login", adminLogin);
route.get(
  "/admin/get-allcustomers/:token",
  adminAuthentication,
  getAllCustomers
);
route.get(
  "/admin/get-uniquecustomer/:token",
  adminAuthentication,
  getUniqueCustomer
);

export default route;
