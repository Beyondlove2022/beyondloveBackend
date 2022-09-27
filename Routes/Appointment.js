import express from "express";
import {
  bookAppointment,
  getUniqueBusinessAppointment,
  reScheduleAppointment,
} from "../Controllers/Appointment.js";
import { businessAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/book-appointment", bookAppointment);
route.get(
  "/business/get-appointment/:category/:token",
  businessAuthentication,
  getUniqueBusinessAppointment
);
route.put(
  "/business/reschedule-appointment/:category/:appointmentId/:token",
  businessAuthentication,
  reScheduleAppointment
);

export default route;
