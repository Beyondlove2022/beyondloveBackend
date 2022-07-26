import bcrypt from "bcryptjs";
import PetTraining from "../Models/petTraining.js";
import PetClinic from "../Models/petClinic.js";
import PetGrooming from "../Models/petGrooming.js";
import PetFood from "../Models/petFood.js";
import PetBoarding from "../Models/petBoarding.js";
import { generateToken } from "../Utils/jwtToken.js";
import { downloadFile, uploadfile } from "../Utils/s3Bucket.js";

export const register = async (req, res) => {
  let { businessName, email, mobile, password, category } = req.body;

  console.log(req.body);
  let categoryName;
  try {
    // Category Verification and Register by Category
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
    let findEmail = await categoryName.findOne({ email });
    let findMobile = await categoryName.findOne({ mobile });
    console.log({ findMobile });

    if (findEmail || findMobile) {
      if (findEmail && findMobile)
        return res.json({
          success: false,
          msg: "Email And Mobile Number Already Exist",
        });
      if (findEmail)
        return res.json({ success: false, msg: "Email Already Exist" });
      if (findMobile)
        return res.json({
          success: false,
          msg: "Mobile Number Already Exist",
        });
    }
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    let business = await new categoryName({
      businessName,
      password,
      mobile,
      email,
    });
    console.log({ business });
    await business.save();
    const tok = { id: business._id };
    const token = await generateToken(tok);
    let businessDetails = await categoryName.findById(business._id);
    return res.json({
      success: true,
      msg: "Registered Successfully",
      businessDetails,
      token,
    });
  } catch (error) {
    res.json({ success: false, msg: "something Went Wrong", err: error });
  }
};

export const login = async (req, res) => {
  const { mobile, password, category } = req.body;
  console.log(category);
  let categoryName;
  try {
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
    let business = await categoryName.findOne({ mobile });
    console.log({ business });
    if (!business) {
      console.log("pet");
      return res.json({ success: false, msg: "You are not registered" });
    }
    const passwordcrct = await bcrypt.compare(password, business.password);
    if (!passwordcrct)
      return res.json({ success: false, msg: "Incorrect Password" });
    const logintoken = { id: business._id };
    const token = await generateToken(logintoken);
    return res.json({
      success: true,
      msg: "Login Success",
      token: token,
      business,
    });
  } catch (error) {
    res.json({ success: false, msg: "something Went Wrong", err: error });
  }
};

export const updateBusinessProfile = async (req, res, next) => {
  const id = req.user.id;
  const category = req.params.category;
  let categoryName;
  try {
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
    const business = await categoryName.findById(id);
    if (!business)
      return res.json({ success: false, msg: "Profile Not Found" });
    await categoryName.findByIdAndUpdate({ _id: id }, { $set: req.body });
    const businessDetails = await categoryName.findById(id);
    return res.json({
      success: true,
      business: businessDetails,
      msg: "Profile Updated",
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: "something went wrong",
      err: error,
    });
  }
};

export const getBusinessProfile = async (req, res, next) => {
  const id = req.params.id;
  const category = req.params.category;
  console.log({ id });
  let categoryName;
  try {
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
    const business = await categoryName.findById(id);
    console.log({ business });
    if (!business) {
      return res.json({ success: false, msg: "Profile not found" });
    }
    return res.json({ success: true, business });
  } catch (error) {
    return res.json({
      success: false,
      msg: "something went wrong",
      err: error,
    });
  }
};

export const getAllCategoryProfiles = async (req, res) => {
  let profilesArray = [];
  try {
    const petClinic = await PetClinic.find();
    console.log({ petClinic });
    petClinic.map((clinic) => {
      profilesArray.push(clinic);
    });

    const petBoarding = await PetBoarding.find();
    petBoarding.map((boarding) => {
      profilesArray.push(boarding);
    });

    const petGrooming = await PetGrooming.find();
    petGrooming.map((grooming) => {
      profilesArray.push(grooming);
    });

    const petTraining = await PetTraining.find();
    petTraining.map((training) => {
      profilesArray.push(training);
    });

    const petFood = await PetFood.find();
    petFood.map((food) => {
      profilesArray.push(food);
    });
    //   if (petFood.length <= 0) {
    //     return res.json({ success: false, msg: "No Profiles in this category" });
    //   }
    console.log({ profilesArray });
    return res.json({ success: true, profilesArray });
  } catch (error) {
    return res.json({
      success: false,
      msg: "something went wrong",
      err: error,
    });
  }
};

export const getUniqueCategoryProfiles = async (req, res) => {
  const { category } = req.params;
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
  const business = await categoryName.find();
  console.log({ business });
  if (business.length <= 0) {
    return res.json({ success: false, msg: "No Profiles in this category" });
  }
  return res.json({ success: true, business });
};

export const getServiceProvidersCount = async (req, res) => {
  try {
    let serviceProvidersCount = 0;
    let petClinicCount = 0;
    let petBoardingCount = 0;
    let petTrainingCount = 0;
    let petGroomingCount = 0;
    let petFoodCount = 0;
    const petClinic = await PetClinic.find();
    for (var i = 0; i < petClinic.length; i++) {
      serviceProvidersCount = serviceProvidersCount + 1;
      petClinicCount = petClinicCount + 1;
    }
    const petBoarding = await PetBoarding.find();
    for (var i = 0; i < petBoarding.length; i++) {
      serviceProvidersCount = serviceProvidersCount + 1;
      petBoardingCount = petBoardingCount + 1;
    }
    const petGrooming = await PetGrooming.find();
    for (var i = 0; i < petGrooming.length; i++) {
      serviceProvidersCount = serviceProvidersCount + 1;
      petGroomingCount = petGroomingCount + 1;
    }
    const petTraining = await PetTraining.find();
    for (var i = 0; i < petTraining.length; i++) {
      serviceProvidersCount = serviceProvidersCount + 1;
      petTrainingCount = petTrainingCount + 1;
    }
    const petFood = await PetFood.find();
    for (var i = 0; i < petFood.length; i++) {
      serviceProvidersCount = serviceProvidersCount + 1;
      petFoodCount = petFoodCount + 1;
    }
    console.log(serviceProvidersCount, "serviceProvider");
    return res.json({
      success: true,
      msg: "Service Provider Count Sent Successfully",
      serviceProvidersCount,
      petClinicCount,
      petBoardingCount,
      petGroomingCount,
      petTrainingCount,
      petFoodCount,
    });
  } catch (error) {
    return res.json({ success: false, msg: "something went wrong" });
  }
};

export const uploadPhoto = async (req, res) => {
  const file = req.files;
  const { bussinessId, category, folderName } = req.params;
  try {
    console.log(category, "cate");
    let categoryName;
    if (category == "petclinic") {
      console.log("comes");
      categoryName = PetClinic;
    } else if (category == "petboarding") {
      categoryName = PetBoarding;
    } else if (category == "petgrooming") {
      categoryName = PetGrooming;
    } else if (category == "pettraining") {
      categoryName = PetTraining;
    } else if (category == "petfood") {
      categoryName = PetFood;
    } else {
      return res.json({ success: false, msg: "This category not available" });
    }
    const result = await uploadfile(file, bussinessId, folderName);
    const image = result.Key;
    if (folderName === "profile") {
      const bussiness = await categoryName.findByIdAndUpdate(
        { _id: bussinessId },
        { profileImage: image }
      );
      return res.json({
        success: true,
        msg: "Profile Photo Uploaded Successfully",
        bussinessProfileImage: bussiness.profileImage,
      });
    } else if (folderName === "cover") {
      const bussiness = await categoryName.findByIdAndUpdate(
        { _id: bussinessId },
        { coverImage: image }
      );
      return res.json({
        success: true,
        msg: "Cover Photo Uploaded Successfully",
        bussinessCoverImage: bussiness.coverImage,
      });
    } else if (folderName === "allphotos") {
      const business = await categoryName.findById(bussinessId);
      const businessImages = business.images;
      businessImages.push(image);
      await categoryName.findByIdAndUpdate(
        { _id: bussinessId },
        { images: businessImages }
      );
      return res.json({
        success: true,
        msg: "Photos Uploaded Successfully",
        businessImages,
      });
    } else {
      return res.json({ success: false, msg: "This category not available" });
    }
  } catch (error) {
    return res.json({
      success: false,
      msg: "Something went wrong on image upload",
      err: error,
    });
  }
};

export const getPhoto = async (req, res) => {
  try {
    const { bussinessId, folderName, fileName } = req.params;
    if (
      bussinessId != "undefined" &&
      folderName != "undefined" &&
      fileName != "undefined"
    ) {
      const readStream = await downloadFile(bussinessId, folderName, fileName);
      console.log("working");
      return await readStream.pipe(res);
    } else {
      return console.log(key);
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};

export const profile