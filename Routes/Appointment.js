import express from "express";
import {
  bookAppointment,
  getUniqueBusinessAppointment,
} from "../Controllers/Appointment.js";
import { businessAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/book-appointment", bookAppointment);
route.get(
  "/business/get-appointment/:category/:token",
  businessAuthentication,
  getUniqueBusinessAppointment
);

export default route;
