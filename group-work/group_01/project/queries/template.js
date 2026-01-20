/* eslint-disable no-undef */
db = db.getSiblingDB("group_01_db");

const reservations = db.reservations.findOne({});

console.log(reservations);
