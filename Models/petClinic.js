import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petClinicSchema = new Schema({
  businessName: { type: String },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  description: { type: String },
  location: { type: Array },
  city: { type: Array },
  state: { type: Array },
  doctorsInfo: { type: Array },
  address: { type: Array },
  landmark: { type: String },
  establishedYear: { type: String },
  mapLocation: { type: Array },
  verified: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  images: { type: Array },
  coverImage: { type: String },
  profileImage: { type: String },
  likes: { type: Array },
  facebookUrl: { type: String },
  instagramUrl: { type: String },
  twitterUrl: { type: String },
  pincode: { type: String },
});

const PetClinic = mongoose.model("petClinic", petClinicSchema);
export default PetClinic;
