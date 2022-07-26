import express from "express";
import {
  createPetProfile,
  getAllPetProfile,
  getAllPetProfilebyCustomer,
  getUniquePetProfile,
} from "../Controllers/Pet.js";
import { customerAuthentication } from "../Middleware/authentication.js";

const route = express.Router();

route.post("/customer/pet/create", customerAuthentication, createPetProfile);
route.post("/customer/pet/get-unique-profile", getUniquePetProfile);
route.post(
  "/customer/pet/get-allprofiles-by-customer",
  getAllPetProfilebyCustomer
);
route.post("/customer/pet/get-allprofiles", getAllPetProfile);
// route.post("/customer/", customerLogin);s

export default route;
