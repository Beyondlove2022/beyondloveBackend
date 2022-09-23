import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    customerId: {
      type: String,
    },
    name: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    category: {
      type: String,
    },
    city: { type: Array },
    state: { type: Array },
    appointmentDate: { type: String },
    appoinmentFixed: { type: Boolean, default: false },
    appoinmentStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("appointment", appointmentSchema);

export default Appointment;
