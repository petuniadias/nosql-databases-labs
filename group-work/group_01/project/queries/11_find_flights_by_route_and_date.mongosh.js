/**
 * Find flights by route and date
 * @param {Object} db - MongoDB database instance
 * @param {string} departureAirportIdent - Departure airport identifier (e.g., "CDG", "KSYR")
 * @param {string} arrivalAirportIdent - Arrival airport identifier (e.g., "CDG", "KSYR")
 * @param {Date} date - Date of the flight (e.g., "2026-01-01")
 */
async function findFlightsByRouteAndDate(
  db,
  departureAirportIdent = "KSTL",
  arrivalAirportIdent = "EGPF",
  date = new Date("2022-01-26")
) {
  try {
    // Create start and end of day as ISO strings for string comparison
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const result = await db.collection("flights")
      .find({
        departureAirportIdent,
        arrivalAirportIdent,
        departureTime: {
          $gte: startOfDay.toISOString(),
          $lte: endOfDay.toISOString(),
        },
      })
      .toArray();

    console.log(`Flights by route and date ${departureAirportIdent} to ${arrivalAirportIdent} on ${date}:`, result);
    return result;
  } catch (error) {
    console.error("Error finding flights by route and date:", error);
    throw error;
  }
}

module.exports = { findFlightsByRouteAndDate };
