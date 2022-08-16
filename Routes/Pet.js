import express from "express";
import multer from "multer";
import {
  createPetProfile,
  getAllPetProfile,
  getAllPetProfilebyCustomer,
  getPetProfilePhoto,
  getUniquePetProfile,
  updatePetProfile,
  uploadPetProfilePic,
  uploadPetVaccinationCertificationImage,
} from "../Controllers/Pet.js";
import { customerAuthentication } from "../Middleware/authentication.js";

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

route.post(
  "/customer/pet/create/:token",
  customerAuthentication,
  createPetProfile
);
route.put(
  "/customer/pet/update/:petId/:token",
  customerAuthentication,
  updatePetProfile
);
route.get("/customer/pet/get-unique-profile/:petId", getUniquePetProfile);
route.get(
  "/customer/pet/get-allprofiles-by-customer/:customerId",
  getAllPetProfilebyCustomer
);
route.get("/customer/pet/get-allprofiles", getAllPetProfile);
route.put(
  "/customer/pet/upload-profile-pic/:token/:petId",
  upload.array("file", 100),
  customerAuthentication,
  uploadPetProfilePic
);
route.get("/customer/pet/get-pet-profile-pic/:id", getPetProfilePhoto);
route.put(
  "/customer/pet/vaccination-pic/:token/:petId",
  upload.array("file", 100),
  customerAuthentication,
  uploadPetVaccinationCertificationImage
);

export default route;
