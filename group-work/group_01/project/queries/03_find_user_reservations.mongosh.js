/**
 * Find user reservations in the database
 * @param {Object} db - MongoDB database instance
 */
async function findUserReservations(db) {
  try {
    const result = await db.collection("reservations")
      .find({ userEmail: "lucas.collins@example.com" })
      .toArray();

    console.log("User reservations found successfully", result);
  } catch (error) {
    console.error("Error finding user reservations:", error);
  }
}

module.exports = { findUserReservations };
