import express from "express";
import {
  createReply,
  createReview,
  getReview,
} from "../Controllers/BusinessReview.js";
import {
  businessAuthentication,
  customerAuthentication,
} from "../Middleware/authentication.js";

const route = express.Router();

route.post("/create-review/:token", customerAuthentication, createReview);
route.get("/get-review/:businessId", getReview);
route.put("/create-replay/:token", businessAuthentication, createReply);
export default route;
