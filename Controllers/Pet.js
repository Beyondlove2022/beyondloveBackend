import Pet from "../Models/customer/pet.js";
import { uploadfile } from "../Utils/s3Bucket.js";

export const createPetProfile = async (req, res) => {
  const customerId = req.user.id;
  const {
    petName,
    breed,
    dob,
    age,
    gender,
    trained,
    trainings,
    weight,
    active,
    vaccinationDetails,
    allergies,
  } = req.body;
  try {
    const pet = new Pet({
      petName,
      breed,
      dob,
      age,
      gender,
      trained,
      trainings,
      weight,
      active,
      vaccinationDetails,
      allergies,
      customerId,
    });
    await pet.save();
    const petDetails = await Pet.findById(pet.id);
    console.log(petDetails);
    return res.json({
      success: true,
      msg: "Pet Details Created Successfully",
      petDetails,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const updatePetProfile = async (req, res) => {
  const id = req.user.id;
  const { petId } = req.params;
  console.log("petId:", petId);
  try {
    const pet = await Pet.findByIdAndUpdate({ _id: petId }, { $set: req.body });
    const petProfile = Pet.findById(petId);
    return res.json({ success: true, msg: "Pet Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getUniquePetProfile = async (req, res) => {
  const { petId } = req.params;
  try {
    const pet = await Pet.findById(petId);
    if (!pet) return res.json({ success: false, msg: "Pet Data Not Found" });
    return res.json({
      success: true,
      msg: "Pet Profile Sended SuccessFully",
      pet,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getAllPetProfilebyCustomer = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customerPets = await Pet.find({ customerId });
    console.log("pets", customerPets);
    if (customerPets.length < 0)
      return res.json({ success: false, msg: "Pets Not Found" });
    return res.json({ success: true, msg: "Pets data Sended", customerPets });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getAllPetProfile = async (req, res) => {
  try {
    const pets = await Pet.find();
    return res.json({ success: true, msg: "Overall Pets Data", pets });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const uploadPetProfilePic = async (req, res) => {
  const file = req.files;
  const customerId = req.user.id;
  const petId = req.params;
  try {
    const result = await uploadfile(file, customerId, petId);
    const profilePic = result.Key;
    await Pet.findByIdAndUpdate({ _id: id }, { profilePic });
    const pet = await Pet.findById(petId);
    return res.json({
      success: true,
      msg: "Profile Image uploaded successfully",
      pet,
    });
  } catch (error) {
    return res.json({ success: false, msg: "Something went wrong", error });
  }
};

export const getPetProfilePhoto = async (req, res, next) => {
  try {
    const key = req.params.id;
    console.log(key, "key");
    if (key != "undefined") {
      const readStream = await downloadFile(key);
      return await readStream.pipe(res);
    } else {
      return console.log(key);
    }
  } catch (error) {
    return req.json({
      success: false,
      msg: "Something went wrong",
      error: error,
    });
  }
};
