import express from "express";
import { adminLogin } from "../Controllers/Admin.js";

const route = express.Router();
route.post("/admin/login", adminLogin);

export default route;
