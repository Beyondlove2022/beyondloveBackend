import express from "express";
import { customerLogin, customerRegister } from "../Controllers/customer.js";

const route = express.Router();

route.post("/customer/register", customerRegister);
route.post("/customer/login", customerLogin);

export default route;
