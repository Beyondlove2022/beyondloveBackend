import bcrypt from "bcryptjs";
import Admin from "../Models/Admin.js";
import { generateToken } from "../Utils/jwtToken.js";

export const adminLogin = async (req, res) => {
	const { mobile, password } = req.body;
	try {
		let admin = await Admin.findOne({ mobile });
		if (!admin) {
			return res.json({
				success: false,
				msg: "You are not registered as Admin",
			});
		}
		const passwordcrct = await bcrypt.compare(password, admin.password);
		if (!passwordcrct) {
			return res.json({ success: false, msg: "Incorrect Password" });
		}
		const loginToken = { id: admin._id };
		const token = await generateToken(loginToken);
		return res.json({
			success: true,
			msg: "Login Success",
			token: token,
			admin,
		});
	} catch (error) {
		return res.json({ success: false, msg: "Something went wrong", error });
	}
};
