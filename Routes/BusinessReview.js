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

const router = express.Router();

router.post("/create-review/:token", customerAuthentication, createReview);
router.get("/get-review/:businessId", getReview);
router.put("/create-replay/:token", businessAuthentication, createReply);
