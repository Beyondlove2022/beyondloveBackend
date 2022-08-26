import express from "express";
import multer from "multer";
import {
  customerLikeOrUnlike,
  deleteBusinessImages,
  getAllCategoryProfiles,
  getBusinessProfile,
  getPhoto,
  getServiceProvidersByCity,
  getServiceProvidersByCityAndCategory,
  getServiceProvidersByLocation,
  getServiceProvidersByLocationAndCategory,
  getServiceProvidersByState,
  getServiceProvidersByStateAndCategory,
  getServiceProvidersCount,
  getUniqueCategoryProfiles,
  login,
  register,
  registerWithOtp,
  updateBusinessProfile,
  uploadPhoto,
} from "../Controllers/Business.js";
import {
  businessAuthentication,
  customerAuthentication,
} from "../Middleware/authentication.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

const route = express.Router();

route.post("/business/register-otp/:category/:number", registerWithOtp);
route.post("/business/register", register);
route.post("/business/login", login);
route.put(
  "/business/update-profile/:category/:token",
  businessAuthentication,
  updateBusinessProfile
);
route.get("/business/get-profile/:category/:id", getBusinessProfile);
route.get(
  "/business/get-profiles-from-unique-category/:category/:pageNo",
  getUniqueCategoryProfiles
);
route.get(
  "/business/get-profiles-from-all-categories/:pageNo",
  getAllCategoryProfiles
);
route.get("/business/get-serviceproviderscount", getServiceProvidersCount);
route.post(
  "/business/update-profile-cover-picture/:bussinessId/:category/:folderName",
  upload.array("file", 100),
  uploadPhoto
);
route.get("/business/get-photos/:bussinessId/:folderName/:fileName", getPhoto);
route.put(
  "/business/like-unlike/:category/:token",
  customerAuthentication,
  customerLikeOrUnlike
);
route.put(
  "/business/delete-image/:category/:token",
  businessAuthentication,
  deleteBusinessImages
);
route.get(
  "/business/get-profiles-by-state/:state0/:state1/:pageNo",
  getServiceProvidersByState
);
route.get(
  "/business/get-profiles-by-city/:city0/:city1/:city2/:pageNo",
  getServiceProvidersByCity
);
route.get(
  "/business/get-profiles-by-location/:location0/:location1/:location2/:location3/:pageNo",
  getServiceProvidersByLocation
);
route.get(
  "/business/get-profiles-by-state-category/:state0/:state1/:category/:pageNo",
  getServiceProvidersByStateAndCategory
);
route.get(
  "/business/get-profiles-by-city-category/:city0/:city1/:city2/:category/:pageNo",
  getServiceProvidersByCityAndCategory
);
route.get(
  "/business/get-profiles-by-location-category/:location0/:location1/:location2/:location3/:category/:pageNo",
  getServiceProvidersByLocationAndCategory
);

export default route;
