import Pet from "../Models/customer/pet.js";

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
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getUniquePetProfile = async (req, res) => {
  const {} = req.body;
  try {
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getAllPetProfilebyCustomer = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const getAllPetProfile = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something went wrong" });
  }
};

export const petProfile = () => {};
