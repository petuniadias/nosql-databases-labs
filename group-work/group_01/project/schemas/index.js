import mongoose from "mongoose";

import userSchema from "./users";
import flightSchema from "./flights";
import airlineSchema from "./airlines";
import airportSchema from "./airports";
import reservationSchema from "./reservations";

import createdPlugin from "./plugins/created";
import updatedPlugin from "./plugins/updated";
import deletedPlugin from "./plugins/deleted";

// Schemas Plugins
mongoose.plugin(createdPlugin);
mongoose.plugin(updatedPlugin);
mongoose.plugin(deletedPlugin);

// Schemas Models
const User = mongoose.model("User", userSchema);
const Flight = mongoose.model("Flight", flightSchema);
const Airline = mongoose.model("Airline", airlineSchema);
const Airport = mongoose.model("Airport", airportSchema);
const Reservation = mongoose.model("Reservation", reservationSchema);

export default { User, Flight, Airline, Airport, Reservation };
