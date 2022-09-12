import bcrypt from "bcryptjs";

import { generateToken } from "../Utils/jwtToken.js";
import Customer from "../Models/customer/account.js";
import { generateOTP } from "../Utils/sendOtp.js";
import Appointment from "../Models/customer/appointment.js";
import { updateCount } from "./count.js";

export const customerRegisterWithOtp = async (req, res) => {
	const to = req.params.number;
	const userType = req.body.type;
	const msg = process.env.REGISTOR_MESSAGE;
	const template_id = process.env.DLT_REGISTRATION;
	const otpType = "register";
	try {
		console.log(to);
		return await generateOTP(to, msg, template_id, userType, otpType, req, res);
	} catch (error) {
		return res.json({
			success: false,
			msg: "Something Went Wrong",
			error: error,
		});
	}
};

export const customerRegister = async (req, res) => {
	let { mobile, email, password, customerName } = req.body;
	console.log(req.body);
	try {
		let findEmail = await Customer.findOne({ email });
		let findMobile = await Customer.findOne({ mobile });
		// console.log({ findMobile });

		if (findEmail || findMobile) {
			if (findEmail && findMobile)
				return res.json({
					success: false,
					msg: "Email And Mobile Number Already Exist",
				});
			if (findEmail)
				return res.json({ success: false, msg: "Email Already Exist" });
			if (findMobile)
				return res.json({
					success: false,
					msg: "Mobile Number Already Exist",
				});
		}
		const salt = await bcrypt.genSalt(10);
		password = await bcrypt.hash(password, salt);

		let customer = await new Customer({
			customerName,
			password,
			mobile,
			email,
		});
		await customer.save();
		const tok = { id: customer._id };
		const token = await generateToken(tok);
		let customerDetails = await Customer.findById(customer._id);
		await updateCount("users");
		return res.json({
			success: true,
			msg: "Registered Successfully",
			customerDetails,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.json({ success: false, msg: "Something went wrong" });
	}
};

export const customerLogin = async (req, res) => {
	const { mobile, password } = req.body;
	try {
		let customer = await Customer.findOne({ mobile });
		if (!customer) {
			return res.json({ success: false, msg: "You are not registered" });
		}
		const passwordcrct = await bcrypt.compare(password, customer.password);
		if (!passwordcrct)
			return res.json({ success: false, msg: "Incorrect Password" });
		const logintoken = { id: customer._id };
		const token = await generateToken(logintoken);
		return res.json({
			success: true,
			msg: "Login Success",
			token: token,
			customer,
		});
	} catch (error) {
		console.log("error", error);
		return res.json({ success: false, msg: "something went wrong" });
	}
};

export const updateCustomerProfile = async (req, res) => {
	const id = req.user.id;
	try {
		const customer = await Customer.findById(id);
		if (!customer) {
			return res.json({ success: false, msg: "Customer Profile not found" });
		}
		await Customer.findByIdAndUpdate({ _id: id }, { $set: req.body });
		const customerDetails = await Customer.findById(id);
		return res.json({ success: true, customerDetails, msg: "Profile Updated" });
	} catch (error) {
		return res.json({ success: false, msg: "Something went wrong", error });
	}
};

export const getCustomerProfile = async (req, res) => {
	const id = req.params.id;
	try {
		let customer = await Customer.findById(id);
		if (!customer)
			return res.json({ success: false, msg: "Profile not found" });
		return res.json({ success: true, customer: customer });
	} catch (error) {
		return res.json({ success: false, msg: "Something went wrong", error });
	}
};

export const createAppointment = async (req, res) => {
	const customerId = req.user.id;
	const { name, mobile, category, city, location, appointmentDate } = req.body;
	try {
		const customer = await Customer.findById(customerId);
		if (!customer)
			return res.json({
				success: false,
				msg: "Please Login As an customer To Access This Resource",
			});
		const appointment = await new Appointment({
			customerId,
			name,
			mobile,
			category,
			city,
			location,
			appointmentDate,
		});
		await appointment.save();
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

export const getAllCustomers = async (req, res) => {
	try {
		const allCustomers = await Customer.find();
		if (allCustomers.length <= 1) {
			return res.json({ success: false, msg: "No Customers Data" });
		}
		return res.json({ success: true, msg: "All Customers Data", allCustomers });
	} catch (error) {
		console.log(error);
		return res.json({ success: false, msg: "Something went wrong", error });
	}
};
