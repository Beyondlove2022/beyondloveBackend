import express from "express";
import { createReview, getReview } from "../Controllers/BusinessReview";
import { customerAuthentication } from "../Middleware/authentication";

const router = express.Router();

router.post("/create-review/:token", customerAuthentication, createReview);
router.get("/get-review/:businessId", getReview);
