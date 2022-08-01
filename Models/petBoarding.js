import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petBoardingSchema = new Schema(
  {
    businessName: { type: String },
    category: { type: String, default: "PetBoarding" },
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
    coverImage: { type: String, default: "common/cover/boarding.jpg" },
    profileImage: { type: String, default: "common/profile/boarding.jpg" },
    likes: { type: Array },
    facilities: { type: Array },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    twitterUrl: { type: String },
    pincode: { type: String },
  },
  { timestamps: true }
);

const PetBoarding = mongoose.model("petBoarding", petBoardingSchema);
export default PetBoarding;
