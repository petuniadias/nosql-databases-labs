/**
 * Airlines operating at an airport
 * @param {Object} db - MongoDB database instance
 * @param {string} airportIdent - Airport identifier (e.g., "CDG", "KSYR")
 */
async function airlinesOperatingAtAirport(db, airportIdent = "KSTL") {
  try {
    const result = await db.collection("flights")
      .aggregate([
        {
          $match: {
            $or: [
              { departureAirportIdent: airportIdent },
              { arrivalAirportIdent: airportIdent },
            ],
          },
        },
        {
          $group: {
            _id: "$airlineIata",
          },
        },
        {
          $lookup: {
            from: "airlines",
            localField: "_id",
            foreignField: "iata",
            as: "airline",
          },
        },
        {
          $unwind: "$airline",
        },
        {
          $project: {
            _id: 0,
            iata: "$airline.iata",
            name: "$airline.name",
            country: "$airline.country",
          },
        },
        {
          $sort: { name: 1 },
        },
      ])
      .toArray();

    console.log(`Airlines operating at airport ${airportIdent}:`, result);
    return result;
  } catch (error) {
    console.error("Error airlines operating at airport:", error);
    throw error;
  }
}

module.exports = { airlinesOperatingAtAirport };
