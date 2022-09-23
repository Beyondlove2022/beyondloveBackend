import express from "express";
import { bookAppointment } from "../Controllers/Appointment.js";

const route = express.Router();

route.post("/book-appointment", bookAppointment);

export default route;
