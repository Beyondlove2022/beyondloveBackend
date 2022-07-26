import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Business from "./Routes/Business.js";
import Customer from "./Routes/Customer.js";
import Pet from "./Routes/Pet.js";

import connectdb from "./Middleware/connectDb.js";

dotenv.config();

const port = process.env.PORT || 3001;

connectdb();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use("/api", Business);
app.use("/api", Customer);
app.use("api", Pet);

app.listen(port, () => {
  console.log(`http://localhost:${port}, on ${process.env.NODE_ENV} mode`);
});
