import mongoose from "mongoose";

import { COUNTRIES, COUNTRY_NAMES } from "../constants/countries";

const countryEnum = {
  values: Object.values(COUNTRIES),
  message: "{VALUE} is not a valid country",
};

const airportSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: Number,
    enum: countryEnum,
    get: (value) => COUNTRY_NAMES[value],
    validate: (value) => Object.values(COUNTRIES).includes(value),
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
});

export default airportSchema;
