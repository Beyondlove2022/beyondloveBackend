import express from "express";
import {
  adminLogin,
  blockedBusiness,
  blockOrUnblockBusiness,
  createAdmin,
  createBussinessAccount,
  deleteBusinessAccount,
  editBussinessAccount,
  getAllCustomers,
  getUniqueCustomer,
  verifiedBusiness,
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
  "/admin/delete-business/:category/:businessId/:token",
  adminAuthentication,
  deleteBusinessAccount
);
route.put(
  "/admin/block-unblock/business/:token",
  adminAuthentication,
  blockOrUnblockBusiness
);
route.put("/admin/verify/business/:token", adminAuthentication, verifyBusiness);
route.get(
  "/admin/get-blocked-business/:pageNo/:token",
  adminAuthentication,
  blockedBusiness
);

route.get(
  "/admin/get-verified-business/:pageNo/:token",
  adminAuthentication,
  verifiedBusiness
);

export default route;
