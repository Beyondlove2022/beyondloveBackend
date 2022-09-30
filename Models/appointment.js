import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema(
  {
    // Pet Details
    petBreed: {
      type: String,
    },
    petName: {
      type: String,
    },
    petAge: {
      type: String,
    },

    // Date And Time
    date: {
      type: String,
    },
    timeSlot: {
      type: String,
    },

    // Customer Details
    name: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },

    // Business Details
    businessId: {
      type: String,
    },
    category: {
      type: String,
    },
    city: { type: Array },
    state: { type: Array },
    location: { type: Array },
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
