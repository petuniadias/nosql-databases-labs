/**
 * Group 01 - Data Import Script
 *
 * This script imports data from JSON files into MongoDB collections.
 */

const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const path = require("path");

const DATABASE_NAME = "group_01_flight_management_system_final";
const MONGODB_URI = "mongodb://admin:admin123@localhost:27017/?authSource=admin";

// Collection names and their corresponding JSON files
const COLLECTIONS = [
  "users",
  "airlines",
  "airports",
  "countries",
  "flights",
  "reservations",
];

/**
 * Read a JSON file from disk and parse it into JavaScript objects.
 *
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<object[]>} Parsed JSON contents.
 */
async function loadJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Handle connection errors with helpful messages.
 *
 * @param {Error} error - The error object.
 * @returns {boolean} True if error was handled.
 */
function handleConnectionError(error) {
  if (
    error?.name === "MongoServerSelectionError" ||
    error?.message?.includes("ECONNREFUSED")
  ) {
    console.error("Unable to connect to MongoDB at", MONGODB_URI);
    return true;
  }
  return false;
}

/**
 * Main import function that loads all JSON files and inserts them into MongoDB.
 *
 * @returns {Promise<void>}
 */
async function importData() {
  let client;

  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected successfully to MongoDB");

    // Get database reference
    const db = client.db(DATABASE_NAME);

    // Import data for each collection
    console.log("\nImporting data...");
    const dataDir = path.join(__dirname, "data");

    for (const collectionName of COLLECTIONS) {
      const filePath = path.join(dataDir, `${collectionName}.json`);

      try {
        console.log(`\nImporting ${collectionName}...`);
        const documents = await loadJSONFile(filePath);

        if (!Array.isArray(documents) || documents.length === 0) {
          console.log(`Warning: No documents found in ${filePath}`);
          continue;
        }

        // Convert Extended JSON format if needed
        const processedDocs = documents.map((doc) => {
          return JSON.parse(JSON.stringify(doc), (key, value) => {
            // Convert $oid to ObjectId
            if (value && value.$oid) {
              const { ObjectId } = require("mongodb");
              return new ObjectId(value.$oid);
            }
            // Convert $date to Date
            if (value && value.$date) {
              return new Date(value.$date);
            }
            return value;
          });
        });

        // Delete all existing documents before importing
        const collection = db.collection(collectionName);
        const deleteResult = await collection.deleteMany({});
        if (deleteResult.deletedCount > 0) {
          console.log(`Deleted ${deleteResult.deletedCount} existing documents from ${collectionName}`);
        }

        const result = await db.collection(collectionName).insertMany(processedDocs);
        console.log(`Imported ${result.insertedCount} documents into ${collectionName}`);
      } catch (error) {
        console.error(`Error importing ${collectionName}:`, error.message);
        throw error;
      }
    }

    // Verify import
    console.log("\nVerifying data import...");
    for (const collectionName of COLLECTIONS) {
      const count = await db.collection(collectionName).countDocuments();
      console.log(`${collectionName}: ${count} documents`);
    }

    console.log("Data import completed successfully!");
    console.log(`Database "${DATABASE_NAME}" is ready for use.`);
  } catch (error) {
    if (!handleConnectionError(error)) {
      console.error("Error during import:", error.message || error);
    }
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log("Disconnected from MongoDB");
    }
  }
}

// Run the import
if (require.main === module) {
  importData().catch(console.error);
}

module.exports = { importData, DATABASE_NAME };
