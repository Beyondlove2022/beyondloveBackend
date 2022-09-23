import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adsSchema = new Schema(
  {
    splashAd: {
      type: String,
    },
    splashAdStartDate: {
      type: String,
    },
    splashAdEndDate: {
      type: String,
    },
    BannerRightAd: {
      type: String,
    },
    BannerRightAdStartDate: {
      type: String,
    },
    BannerRightAdEndDate: {
      type: String,
    },
    BannerLeftAd: {
      type: String,
    },
    BannerLeftAdStartDate: {
      type: String,
    },
    BannerLeftAdEndDate: {
      type: String,
    },
    catagoryAds: {
      type: Array,
    },
    catagoryAdsStartDate: {
      type: Array,
    },
    catagoryAdsEndDate: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Ads = mongoose.model("ads", adsSchema);
export default Ads;
