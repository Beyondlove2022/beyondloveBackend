import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
	userType: { type: String, default: "Admin" },
	email: { type: String },
	mobile: { type: String },
	password: { type: String },
});

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
