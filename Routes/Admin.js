import express from "express";
import {
  adminLogin,
  blockOrUnblockBusiness,
  createAdmin,
  createBussinessAccount,
  deleteBusinessAccount,
  editBussinessAccount,
  getAllCustomers,
  getUniqueCustomer,
  verifyBusiness,
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
route.post(
  "/admin/create-business/:token",
  adminAuthentication,
  createBussinessAccount
);
route.put(
  "/admin/update-business/:token",
  adminAuthentication,
  editBussinessAccount
);
route.delete(
  "/admin/delete-business/:token",
  adminAuthentication,
  deleteBusinessAccount
);
route.put(
  "/admin/block-unblock/business/:token",
  adminAuthentication,
  blockOrUnblockBusiness
);

route.put("/admin/verify/business/:token", adminAuthentication, verifyBusiness);

export default route;
