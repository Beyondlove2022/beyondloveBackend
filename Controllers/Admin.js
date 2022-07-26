import bcrypt from "bcryptjs";
import Admin from "../Models/Admin.js";
import Count from "../Models/count.js";
import Customer from "../Models/customer/account.js";
import Pet from "../Models/customer/pet.js";
import PetBoarding from "../Models/petBoarding.js";
import PetClinic from "../Models/petClinic.js";
import PetFood from "../Models/petFood.js";
import PetGrooming from "../Models/petGrooming.js";
import PetTraining from "../Models/petTraining.js";
import { generateToken } from "../Utils/jwtToken.js";
import { updateCount } from "./count.js";

export const createAdmin = async (req, res) => {
  let { email, password, mobile } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const admin = await new Admin({
      email,
      mobile,
      password,
    });
    return await admin.save();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const adminLogin = async (req, res) => {
  const { mobile, password } = req.body;
  console.log(mobile);
  try {
    let admin = await Admin.findOne({ mobile });
    console.log({ admin });
    if (!admin) {
      return res.json({
        success: false,
        msg: "You are not registered as Admin",
      });
    }
    const passwordcrct = await bcrypt.compare(password, admin.password);
    if (!passwordcrct) {
      return res.json({ success: false, msg: "Incorrect Password" });
    }
    const loginToken = { id: admin._id };
    const token = await generateToken(loginToken);
    return res.json({
      success: true,
      msg: "Login Success",
      token: token,
      admin,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const allUsers = await Customer.find();
    return res.json({
      success: true,
      msg: "All Customer Details Sended Successfully",
      allUsers,
      count: allUsers.length,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const getUniqueCustomer = async (req, res) => {
  const { userId } = req.params;
  try {
    const findUniqueCustomer = await Customer.findById(userId);
    if (!findUniqueCustomer)
      return res.json({ success: false, msg: "This User Data Not Found" });
    const pets = await Pet.find({ customerId: userId });
    return res.json({
      success: true,
      msg: "Unique User Data Sended Successfully",
      user: findUniqueCustomer,
      pets,
    });
  } catch (error) {
    console.log(error, "error");
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const createBussinessAccount = async (req, res) => {
  let {
    businessName,
    email,
    mobile,
    password,
    category,
    address,
    location,
    city,
    state,
  } = req.body;
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
      address,
      location,
      city,
      state,
    });
    console.log({ business });
    await business.save();
    const tok = { id: business._id };
    const token = await generateToken(tok);
    let businessDetails = await categoryName.findById(business._id);
    await updateCount(category);
    return res.json({
      success: true,
      msg: "Business Account Created Successfully",
      businessDetails,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "something went wrong" });
  }
};

export const editBussinessAccount = async (req, res) => {
  const { category, businessId } = req.body;
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
    const business = await categoryName.findById(businessId);
    if (!business)
      return res.json({ success: false, msg: "Profile Not Found" });
    await categoryName.findByIdAndUpdate(
      { _id: businessId },
      { $set: req.body }
    );
    const businessDetails = await categoryName.findById(businessId);
    return res.json({
      success: true,
      business: businessDetails,
      msg: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "something went wrong" });
  }
};

export const deleteBusinessAccount = async (req, res) => {
  const { businessId, category } = req.params;
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
    const business = await categoryName.findById(businessId);
    if (!business)
      return res.json({ success: false, msg: "Profile Not Found" });
    const deleteBusiness = await categoryName.findByIdAndDelete(businessId);
    return res.json({ success: true, msg: "Account Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong" });
  }
};

export const blockOrUnblockBusiness = async (req, res) => {
  const { businessId, category, block } = req.body;
  let categoryName;
  const countId = process.env.COUNT_ID;
  try {
    let count = await Count.findById(countId);
    let val;
    console.log(block);
    if (block == "true") {
      console.log("if");
      val = 1;
    } else {
      val = -1;
      console.log("else");
    }
    console.log({ val });
    if (category == "PetClinic") {
      categoryName = PetClinic;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { $inc: { blockedServiceProviders: val, blockedClinics: val } }
      );
    } else if (category == "PetBoarding") {
      categoryName = PetBoarding;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { $inc: { blockedServiceProviders: val, blockedBoardings: val } }
      );
    } else if (category == "PetGrooming") {
      categoryName = PetGrooming;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { $inc: { blockedServiceProviders: val, blockedGroomings: val } }
      );
    } else if (category == "PetTraining") {
      categoryName = PetTraining;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { $inc: { blockedServiceProviders: val, blockedTrainings: val } }
      );
    } else if (category == "PetFood") {
      categoryName = PetFood;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { $inc: { blockedServiceProviders: val, blockedFoods: val } }
      );
    } else {
      return res.json({ success: false, msg: "This category not available" });
    }
    const business = await categoryName.findById(businessId);
    if (!business)
      return res.json({ success: false, msg: "Profile Not Found" });
    await categoryName.findByIdAndUpdate({ _id: businessId }, { block: block });
    const businessDetails = await categoryName.findById(businessId);
    return res.json({
      success: true,
      business: businessDetails,
      msg: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const verifyBusiness = async (req, res) => {
  const { businessId, category } = req.body;
  const countId = process.env.COUNT_ID;
  let categoryName;
  try {
    let count = await Count.findById(countId);
    let verifiedServiceProviders = count.verifiedServiceProviders + 1;
    if (category == "PetClinic") {
      categoryName = PetClinic;
      let verifiedClinics = count.verifiedClinics + 1;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { verifiedServiceProviders, verifiedClinics }
      );
    } else if (category == "PetBoarding") {
      categoryName = PetBoarding;
      let verifiedBoardings = count.verifiedBoardings + 1;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { verifiedServiceProviders, verifiedBoardings }
      );
    } else if (category == "PetGrooming") {
      categoryName = PetGrooming;
      let verifiedGroomings = count.verifiedGroomings + 1;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { verifiedServiceProviders, verifiedGroomings }
      );
    } else if (category == "PetTraining") {
      categoryName = PetTraining;
      let verifiedTrainings = count.verifiedTrainings + 1;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { verifiedServiceProviders, verifiedTrainings }
      );
    } else if (category == "PetFood") {
      categoryName = PetFood;
      let verifiedFoods = count.verifiedFoods + 1;
      await Count.findByIdAndUpdate(
        { _id: countId },
        { verifiedServiceProviders, verifiedFoods }
      );
    } else {
      return res.json({ success: false, msg: "This category not available" });
    }
    const business = await categoryName.findById(businessId);
    if (!business)
      return res.json({ success: false, msg: "Profile Not Found" });
    await categoryName.findByIdAndUpdate(
      { _id: businessId },
      { verified: true }
    );
    const businessDetails = await categoryName.findById(businessId);
    return res.json({
      success: true,
      business: businessDetails,
      msg: "Profile Updated",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const blockedBusiness = async (req, res) => {
  const { pageNo } = req.params;
  let skipClinicAndBoarding = 0;
  let skipGroomingAndTraining = 0;
  for (var i = 1; i < pageNo; i++) {
    skipClinicAndBoarding += 3;
    skipGroomingAndTraining += 2;
  }
  let profilesArray = [];
  try {
    const petClinic = await PetClinic.find({ block: true })
      .skip(skipClinicAndBoarding)
      .limit(3);
    console.log({ petClinic });
    petClinic.map((clinic) => {
      profilesArray.push(clinic);
    });

    const petBoarding = await PetBoarding.find({ block: true })
      .skip(skipClinicAndBoarding)
      .limit(3);
    petBoarding.map((boarding) => {
      profilesArray.push(boarding);
    });

    const petGrooming = await PetGrooming.find({ block: true })
      .skip(skipGroomingAndTraining)
      .limit(2);
    petGrooming.map((grooming) => {
      profilesArray.push(grooming);
    });

    const petTraining = await PetTraining.find({ block: true })
      .skip(skipGroomingAndTraining)
      .limit(2);
    petTraining.map((training) => {
      profilesArray.push(training);
    });

    const petFood = await PetFood.find({ block: true });
    petFood.map((food) => {
      profilesArray.push(food);
    });
    if (profilesArray.length <= 0) {
      return res.json({ success: false, msg: "No Profiles Found" });
    }
    return res.json({
      success: true,
      profilesArray,
      count: profilesArray.length,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

export const verifiedBusiness = async (req, res) => {
  const { pageNo } = req.params;
  let skipClinicAndBoarding = 0;
  let skipGroomingAndTraining = 0;
  for (var i = 1; i < pageNo; i++) {
    skipClinicAndBoarding += 3;
    skipGroomingAndTraining += 2;
  }
  let profilesArray = [];
  try {
    const petClinic = await PetClinic.find({ verified: true })
      .skip(skipClinicAndBoarding)
      .limit(3);
    console.log({ petClinic });
    petClinic.map((clinic) => {
      profilesArray.push(clinic);
    });

    const petBoarding = await PetBoarding.find({ verified: true })
      .skip(skipClinicAndBoarding)
      .limit(3);
    petBoarding.map((boarding) => {
      profilesArray.push(boarding);
    });

    const petGrooming = await PetGrooming.find({ verified: true })
      .skip(skipGroomingAndTraining)
      .limit(2);
    petGrooming.map((grooming) => {
      profilesArray.push(grooming);
    });

    const petTraining = await PetTraining.find({ verified: true })
      .skip(skipGroomingAndTraining)
      .limit(2);
    petTraining.map((training) => {
      profilesArray.push(training);
    });

    const petFood = await PetFood.find({ verified: true });
    petFood.map((food) => {
      profilesArray.push(food);
    });
    if (profilesArray.length <= 0) {
      return res.json({ success: false, msg: "No Profiles Found" });
    }
    return res.json({
      success: true,
      profilesArray,
      count: profilesArray.length,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};

// export const ads = async (req, res) => {
//   const file = req.files;
//   const { bannerType, category, folderName } = req.params;
//   try {
//     console.log(req.params, "cate");
//     const result = await uploadfile(bannerType, bussinessId, folderName);
//     console.log("result Start", result, "result");
//     const image = result.Key;
//     console.log("object");
//     if (folderName === "profile") {
//       console.log("working");
//       await categoryName.findByIdAndUpdate(
//         { _id: bussinessId },
//         { profileImage: image }
//       );
//       const profileImg = await categoryName.findById(bussinessId);
//       return res.json({
//         success: true,
//         msg: "Profile Photo Uploaded Successfully",
//         bussinessProfileImage: profileImg,
//       });
//     } else if (folderName === "cover") {
//       await categoryName.findByIdAndUpdate(
//         { _id: bussinessId },
//         { coverImage: image }
//       );
//       const bussiness = await categoryName.findById(bussinessId);
//       return res.json({
//         success: true,
//         msg: "Cover Photo Uploaded Successfully",
//         bussinessCoverImage: bussiness.coverImage,
//       });
//     } else if (folderName === "allphotos") {
//       const business = await categoryName.findById(bussinessId);
//       const businessImages = business.images;
//       businessImages.push(image);
//       await categoryName.findByIdAndUpdate(
//         { _id: bussinessId },
//         { images: businessImages }
//       );
//       // let img = await
//       return res.json({
//         success: true,
//         msg: "Photos Uploaded Successfully",
//         businessImages,
//       });
//     } else {
//       return res.json({ success: false, msg: "This category not available" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: true, msg: "Something Went Wrong" });
//   }
// };
