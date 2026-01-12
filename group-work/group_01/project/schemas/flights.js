import mongoose from "mongoose";

import { FLIGHT_STATUS, FLIGHT_STATUS_NAMES } from "../constants/flights";

const flightStatusEnum = {
  values: Object.values(FLIGHT_STATUS),
  message: "{VALUE} is not a valid flight status",
};

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  airline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
    required: true,
  },
  departureAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  arrivalAirport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  maxCapacity: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    enum: flightStatusEnum,
    default: FLIGHT_STATUS.SCHEDULED,
    get: (value) => FLIGHT_STATUS_NAMES[value],
    validate: (value) => Object.values(FLIGHT_STATUS).includes(value),
    required: true,
  },
});

export default flightSchema;
