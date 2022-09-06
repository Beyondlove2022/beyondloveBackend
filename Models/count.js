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
});

const Count = mongoose.model("count", countSchema);

export default Count;
