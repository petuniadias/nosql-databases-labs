const { MongoClient } = require("mongodb");

const { registerUser } = require("./queries/01_register_user.mongosh.js");
const { lastCallFlightsStatus } = require("./queries/09_last_call_flights_status.mongosh.js");
const { airlinesOperatingAtAirport } = require("./queries/10_airlines_operating_at_airport.mongosh.js");

const MONGODB_URI = "mongodb://admin:admin123@localhost:27017/?authSource=admin";
const dbName = "group_01_flight_management_system_final";

async function runQueries() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db(dbName);

    console.log("\n========================================");
    console.log("QUERIES");
    console.log("========================================\n");

    console.log("\n01. Register a new user:");
    console.log("-".repeat(50));
    await registerUser(db);

    // ========================================
    // AGGREGATION COUNTS
    // ========================================
    console.log("\n========================================");
    console.log("COLLECTION STATISTICS");
    console.log("========================================\n");

    const airlinesCount = await db.collection("airlines").countDocuments();
    const airportsCount = await db.collection("airports").countDocuments();
    const countriesCount = await db.collection("countries").countDocuments();
    const flightsCount = await db.collection("flights").countDocuments();
    const reservationsCount = await db.collection("reservations").countDocuments();
    const usersCount = await db.collection("users").countDocuments();

    console.log(`Total airlines: ${airlinesCount}`);
    console.log(`Total airports: ${airportsCount}`);
    console.log(`Total countries: ${countriesCount}`);
    console.log(`Total flights: ${flightsCount}`);
    console.log(`Total reservations: ${reservationsCount}`);
    console.log(`Total users: ${usersCount}`);

    console.log("\n========================================");
    console.log("Queries completed successfully!");
    console.log("========================================");
  } catch (error) {
    console.error("Error running queries:", error);
  } finally {
    await client.close();
    console.log("\nDisconnected from MongoDB");
  }
}

// Run the queries
runQueries().catch(console.error);
