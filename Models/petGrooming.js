import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petGroomingSchema = new Schema(
  {
    businessName: { type: String },
    userType: { type: String, default: "Business" },
    category: { type: String, default: "PetGrooming" },
    email: { type: String },
    mobile: { type: Number },
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
    coverImage: { type: String, default: "common/cover/grooming.png" },
    profileImage: { type: String, default: "common/profile/grooming.jpg" },
    likes: { type: Array },
    facilities: { type: Array },
    packages: { type: Array },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    twitterUrl: { type: String },
    pincode: { type: String },
    block: { type: Boolean, default: false },
    bookingPerSlot: { type: Number },
    timeSlots: { type: Array },
    packages: { type: Array },
  },
  { timestamps: true }
);

const PetGrooming = mongoose.model("petGrooming", petGroomingSchema);
export default PetGrooming;
