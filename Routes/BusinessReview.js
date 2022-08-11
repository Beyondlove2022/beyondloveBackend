import express from "express";
import {
  createReply,
  createReview,
  getReview,
  reviewDelete,
} from "../Controllers/BusinessReview.js";
import {
  businessAuthentication,
  customerAuthentication,
} from "../Middleware/authentication.js";

const route = express.Router();

route.post("/create-review/:token", customerAuthentication, createReview);
route.get("/get-review/:businessId", getReview);
route.put(
  "/create-replay/:token/:category",
  businessAuthentication,
  createReply
);
route.delete(
  "/delete-review/:reviewId/:token",
  customerAuthentication,
  reviewDelete
);
export default route;
