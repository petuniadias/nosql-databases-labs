/**
 * Get last call flights status
 * @param {Object} db - MongoDB database instance 
 */
async function getLastCallFlightsStatus(
    db,
) {
    try {
        const result = await db.collection("flights")
            .find({ status: 3 })
            .sort({ departureTime: 1})
            .toArray();
        console.log("Last call flights status:", result);
        return result;
    } catch (error) {
        console.error("Error finding last call flights status:", error);
        throw error;
    }
}

module.exports = { getLastCallFlightsStatus };
