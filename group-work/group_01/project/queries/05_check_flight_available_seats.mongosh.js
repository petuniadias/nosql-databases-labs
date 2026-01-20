/**
 * Check the available seats for a flight
 * @param {Object} db - MongoDB database instance
 */
async function checkFlightAvailableSeats(db, flightNumber = "5H2372") {
  try {
    const result = await db.collection("flights")
      .aggregate([
        {
          $match: { flightNumber: flightNumber }
        },
        {
          $lookup: {
            from: "reservations",
            localField: "flightNumber",
            foreignField: "flightNumber",
            as: "reservations"
          }
        },
        {
          $project: {
            flightNumber: 1,
            maxCapacity: 1,
            activeReservations: {
              $size: {
                $filter: {
                  input: "$reservations",
                  as: "reservation",
                  cond: { $eq: ["$$reservation.status", 1] }
                }
              }
            }
          }
        },
        {
          $project: {
            flightNumber: 1,
            maxCapacity: 1,
            activeReservations: 1,
            availableSeats: {
              $subtract: ["$maxCapacity", "$activeReservations"]
            }
          }
        }
      ])
      .toArray();

    if (result.length === 0) {
      console.log(`Flight ${flightNumber} not found`);
      return;
    }

    const flight = result[0];
    console.log(`Available seats for flight ${flightNumber}: ${flight.availableSeats} (${flight.activeReservations} reserved out of ${flight.maxCapacity} total)`);
  } catch (error) {
    console.error(`Error checking available seats for flight ${flightNumber}:`, error);
  }
}

module.exports = { checkFlightAvailableSeats };
