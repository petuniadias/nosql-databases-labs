import mongoose from "mongoose";

import { RESERVATION_STATUS, RESERVATION_STATUS_NAMES } from "../constants/reservations";

const reservationStatusEnum = {
  values: Object.values(RESERVATION_STATUS),
  message: "{VALUE} is not a valid reservation status",
};

const reservationSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    enum: reservationStatusEnum,
    default: RESERVATION_STATUS.PENDING,
    get: (value) => RESERVATION_STATUS_NAMES[value],
    validate: (value) => Object.values(RESERVATION_STATUS).includes(value),
    required: true,
  },
});

export default reservationSchema;
