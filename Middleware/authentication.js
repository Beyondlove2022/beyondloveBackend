import jwt from "jsonwebtoken";
import PetTraining from "../Models/petTraining.js";
import PetClinic from "../Models/petClinic.js";
import PetGrooming from "../Models/petGrooming.js";
import PetFood from "../Models/petFood.js";
import PetBoarding from "../Models/petBoarding.js";
import Customer from "../Models/customer/account.js";

export const businessAuthentication = async (req, res, next) => {
  try {
    const token = req.params.token;
    const category = req.params.category;
    console.log(category);
    let categoryName;
    if (category == "PetClinic") {
      categoryName = PetClinic;
    } else if (category == "PetBoarding") {
      categoryName = PetBoarding;
    } else if (category == "PetGrooming") {
      categoryName = PetGrooming;
    } else if (category == "PetTraining") {
      categoryName = PetTraining;
    } else if (category == "PetFood") {
      categoryName = PetFood;
    } else {
      return res.json({ success: false, msg: "This category not available" });
    }

    if (!token) {
      return res.json({
        success: false,
        msg: "Please login for access this resource",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await categoryName.findById(decode.id);
    if (!req.user) {
      return res.json({
        success: false,
        msg: "Account Not Found Please Register",
      });
    }
    next();
  } catch (err) {
    return res.json({ success: false, msg: "Authentication Failed", err: err });
  }
};

export const customerAuthentication = async (req, res, next) => {
  try {
    const token = req.params.token;
    const category = req.params.category;
    if (!token) {
      return res.json({
        success: false,
        msg: "Please login for access this resource",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Customer.findById(decode.id);
    if (!req.user) {
      return res.json({
        success: false,
        msg: "Account Not Found Please Register",
      });
    }
    next();
  } catch (err) {
    return res.json({ success: false, msg: "Authentication Failed", err: err });
  }
};
