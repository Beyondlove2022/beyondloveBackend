import Appointment from "../Models/appointment.js";
import sendEmail from "../Utils/sendMail.js";

export const bookAppointment = async (req, res) => {
  const {
    petBreed,
    petName,
    petAge,
    date,
    time,
    name,
    email,
    mobile,
    address,
    businessId,
    category,
    city,
    location,
  } = req.body;
  try {
    const appointment = await new Appointment({
      petBreed,
      petName,
      petAge,
      date,
      time,
      name,
      email,
      mobile,
      address,
      businessId,
      category,
      city,
      location,
    });
    await appointment.save();
    const subject = "Beyond Appointment";
    const msg = "You Got An New Appointment";
    const msgType = "Booking";
    const link = process.env.DOMAIN + "budinessId";
    await sendEmail(email, msg, msgType, subject, link);
    return res.json({
      success: true,
      msg: "We will reach you soon",
      appointment,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getUniqueAppointment = async (req, res) => {
  // const id = req.admin.id
  const { appointmentId } = req.params;
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.json({ success: false, msg: "This Appointment Not Found" });
    return res.json({
      success: true,
      msg: "Appointment Sended Successfully",
      appointment,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    return res.json({
      success: true,
      msg: "All Appointment Sended Successfully",
      appointments,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const fixAppointment = async (req, res) => {
  const { appointmentId, appointmentFixed } = req.params;
  try {
    const appointment = await Appointment.find(appointmentId);
    if (!appointment)
      return res.json({ success: false, msg: "This Appointment Not Found" });
    await Appointment.findByIdAndUpdate(
      { _id: appointmentId },
      { appointmentFixed }
    );
    const appointmentData = await Appointment.find(appointmentId);
    return res.json({
      success: true,
      msg: "Appointment Fixed",
      appointment: appointmentData,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      succes: false,
      msg: "Something went wrong on appointment fixing",
    });
  }
};
