import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petSchema = new Schema({
  petName: { type: String },
  breed: { type: String },
  dob: { type: String },
  age: { type: Number },
  gender: { type: String },
  trained: { type: Boolean },
  trainings: { type: String },
  profilepic: { type: String },
  weight: { type: Number },
  active: { type: String },
  vaccinationDetails: { type: Array },
  vacinationCertificates: { type: Array },
  allergies: { type: String },
  customerId: { type: String },
});

const Pet = mongoose.model("pet", petSchema);
export default Pet;
