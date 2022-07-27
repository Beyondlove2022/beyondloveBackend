import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petGroomingSchema = new Schema({
  businessName: { type: String },
  category: { type: String, default: "PetGrooming" },
  email: { type: String },
  mobile: { type: String },
  password: { type: String },
  description: { type: String },
  location: { type: Array },
  city: { type: Array },
  state: { type: Array },
  address: { type: Array },
  landmark: { type: String },
  establishedYear: { type: String },
  mapLocation: { type: Array },
  verified: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  images: { type: Array, default: [] },
  coverImage: { type: String, default: "common/cover/grooming.jpg" },
  profileImage: { type: String, default: "common/profile/grooming.jpg" },
  likes: { type: Array },
  facilities: { type: Array },
  packages: { type: Array },
  facebookUrl: { type: String },
  instagramUrl: { type: String },
  twitterUrl: { type: String },
  pincode: { type: String },
});

const PetGrooming = mongoose.model("petGrooming", petGroomingSchema);
export default PetGrooming;
