/**
 * Cancel all flights at an airport in the database
 * @param {Object} db - MongoDB database instance
 */
async function cancelAllAirportFlights(db, airportIdent = "KSTL") {
  try {
    const result = await db.collection("flights")
      .updateMany({ departureAirportIdent: airportIdent }, { $set: { status: 2 } });

    console.log(`All flights at airport ${airportIdent} cancelled successfully`, result);
  } catch (error) {
    console.error("Error canceling all flights at ${airportIdent} airport:", error);
  }
}

module.exports = { cancelAllAirportFlights };
