import mongoose from "mongoose";

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default airlineSchema;
