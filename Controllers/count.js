import Count from "../Models/count.js";

// export const countCreate = async (req, res) => {
//   try {
//     const count = new Count({
//       serviceProviders: 8592,
//       petClinics: 3053,
//       petBoardings: 1172,
//       petGroomings: 2062,
//       petTrainings: 2305,
//       petFoods: 0,
//       users: 10,
//       pets: 30,
//     });
//     await count.save();
//     return res.json({ success: true, msg: "Count Created", count });
//   } catch (error) {
//     console.log(error);
//     return res.json({ success: false, msg: "Something Went Wrong" });
//   }
// };

export const updateCount = async (c) => {
  const id = process.env.COUNT_ID;
  try {
    const count = await Count.findById(id);
    if (c === "PetClinic") {
      let petClinics = count.petClinics + 1;
      let serviceProviders = count.serviceProviders + 1;
      const both = {
        petClinics,
        serviceProviders,
      };
      await Count.findByIdAndUpdate({ _id: id }, { $set: both });
    } else if (c === "PetBoarding") {
      let petBoardings = count.petBoardings + 1;
      let serviceProviders = count.serviceProviders + 1;
      const both = {
        petBoardings,
        serviceProviders,
      };
      await Count.findByIdAndUpdate({ _id: id }, { $set: both });
    } else if (c === "PetGrooming") {
      let petGroomings = count.petGroomings + 1;
      let serviceProviders = count.serviceProviders + 1;
      const both = {
        petGroomings,
        serviceProviders,
      };
      await Count.findByIdAndUpdate({ _id: id }, { $set: both });
    } else if (c === "PetTraining") {
      let petTrainings = count.petTrainings + 1;
      let serviceProviders = count.serviceProviders + 1;
      const both = {
        petTrainings,
        serviceProviders,
      };
      await Count.findByIdAndUpdate({ _id: id }, { $set: both });
    } else if (c === "PetFood") {
      let petFoods = count.petFood + 1;
      let serviceProviders = count.serviceProviders + 1;
      const both = {
        petFoods,
        serviceProviders,
      };
      await Count.findByIdAndUpdate({ _id: id }, { $set: both });
    } else if (c === "users") {
      let users = count.users + 1;
      await Count.findByIdAndUpdate({ _id: id }, { users });
    } else if (c === "pets") {
      let pets = count.pets + 1;
      await Count.findByIdAndUpdate({ _id: id }, { pets });
    } else {
      return console.log("Nothing Matched");
    }
    const updatedCount = await Count.findById(id);
    return updatedCount;
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong" });
  }
};

export const getCount = async (req, res) => {
  const id = process.env.COUNT_ID;
  try {
    const count = await Count.findById(id);
    return res.json({
      success: true,
      msg: "All count details sended successfully",
      counts: count,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, msg: "Something Went Wrong", error });
  }
};
