/**
 * Register a new user in the database
 * @param {Object} db - MongoDB database instance
 */
async function registerUser(db) {
  try {
    const result = await db.collection("users").insertOne({
      username: "test",
      email: "test@test.com",
      password: "test",
    });
    console.log("User registered successfully", result);
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

module.exports = { registerUser };
