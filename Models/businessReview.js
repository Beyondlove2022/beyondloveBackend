import mongoose from "mongoose";

const businessReviewSchema = new mongoose.Schema(
  {
    businessId: {
      type: String,
    },
    customerId: {
      type: String,
    },
    customerEmail: {
      type: String,
    },
    customerProfilePic: {
      type: String,
    },
    customerReview: {
      type: String,
    },
    customerRating: {
      type: String,
    },
    reply: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BusinessReviews = mongoose.model("businessReviews", businessReviewSchema);
export default BusinessReviews;
