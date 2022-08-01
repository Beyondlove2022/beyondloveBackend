import express from "express";
import {
  createPetProfile,
  getAllPetProfile,
  getAllPetProfilebyCustomer,
  getPetProfilePhoto,
  getUniquePetProfile,
  updatePetProfile,
  uploadPetProfilePic,
} from "../Controllers/Pet.js";
import { customerAuthentication } from "../Middleware/authentication.js";

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
  customerAuthentication,
  uploadPetProfilePic
);
route.get("/customer/pet/get-pet-profile-pic/:id", getPetProfilePhoto);

export default route;
