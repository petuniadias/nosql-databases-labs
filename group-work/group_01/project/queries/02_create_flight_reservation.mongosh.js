/**
 * Create a new flight reservation in the database
 * @param {Object} db - MongoDB database instance
 */
async function createFlightReservation(db) {
  try {
    const result = await db.collection("reservations")
      .insertOne({
        flightNumber: "KL1234",
        userEmail: "sarah.johnson@example.com",
        seatNumber: "1A",
        status: 1,
      });
    console.log("Flight reservation created successfully", result);
  } catch (error) {
    console.error("Error creating flight reservation:", error);
  }
}

module.exports = { createFlightReservation };
