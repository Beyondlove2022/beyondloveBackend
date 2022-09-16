import mongoose from "mongoose";

const Schema = mongoose.Schema;

const petFoodSchema = new Schema(
  {
    businessName: { type: String },
    userType: { type: String, default: "Business" },
    category: { type: String, default: "PetFood" },
    email: { type: String },
    mobile: { type: Number },
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
    images: { type: Array, default: [] },
    coverImage: { type: String, default: "common/cover/food.png" },
    profileImage: { type: String, default: "common/profile/food.jpg" },
    likes: { type: Array },
    veg: { type: Boolean },
    nonVeg: { type: Boolean },
    Both: { type: Boolean },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    twitterUrl: { type: String },
    pincode: { type: String },
    block: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PetFood = mongoose.model("petFood", petFoodSchema);
export default PetFood;
