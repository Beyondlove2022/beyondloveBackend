import mongoose from "mongoose";

const countSchema = mongoose.Schema({
  serviceProviders: {
    type: Number,
  },
  petClinics: {
    type: Number,
  },
  petBoardings: {
    type: Number,
  },
  petGroomings: {
    type: Number,
  },
  petTrainings: {
    type: Number,
  },
  petFoods: {
    type: Number,
  },
  users: {
    type: Number,
  },
  pets: {
    type: Number,
  },
  verifiedServiceProviders: {
    type: Number,
  },
  verifiedClinics: {
    type: Number,
  },
  verifiedBoardings: {
    type: Number,
  },
  verifiedGroomings: {
    type: Number,
  },
  verifiedTrainings: {
    type: Number,
  },
  verifiedFoods: {
    type: Number,
  },
  // blockedServiceProviders: {
  //   type: Number,
  // },
  // blockedClinics: {
  //   type: Number,
  // },
  // blockedBoardings: {
  //   type: Number,
  // },
  // blockedGrooming: {
  //   type: Number,
  // },
  // blockedTrainings: {
  //   type: Number,
  // },
  // blockedFoods: {
  //   type: Number,
  // },
});

const Count = mongoose.model("count", countSchema);

export default Count;
