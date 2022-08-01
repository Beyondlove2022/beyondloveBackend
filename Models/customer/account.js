import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customerName: { type: String },
  userType: { type: String, default: "Customer" },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  location: { type: Array },
  city: { type: Array },
  state: { type: Array },
  address: { type: Array },
  pincode: { type: String },
  mapLocation: { type: Array },
});

const Customer = mongoose.model("customer", customerSchema);
export default Customer;
