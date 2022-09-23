import nodemailer from "nodemailer";

const sendEmail = async (email, msg, msgType, subject, link = "") => {
	console.log("sendEmail");
	var transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
	});
	// console.log(process.env.EMAIL_PASS);
	console.log("transport");
	const message = {
		from: process.env.EMAIL,
		to: email,
		subject: subject,
		// text: msg,
		html: `<div style="width: 50%; height: 200px; text-align:center; border-radius: 10px;border: 1px solid #000;padding-top: 60px;">
    <h3>${msg}</h3>
    <h1 >${msgType}</h1>
    <p>${link}</p>
    </div>`,
	};
	console.log(message);
	await transporter.sendMail(message);
};

export default sendEmail;
