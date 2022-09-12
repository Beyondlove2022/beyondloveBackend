import express from "express";
import { getCount } from "../Controllers/count.js";

const route = express.Router();

// route.post("/create-count", countCreate);
route.get("/get-counts", getCount);

export default route;
