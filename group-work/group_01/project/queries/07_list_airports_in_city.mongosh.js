/**
 * List airports in city
 * @param {Object} db - MongoDB database instance 
 * @param {string} municipality 
 */
async function listAirportsInCity(
    db,
    municipality = "Porto"
) {
    try {
        const result = await db.collection("airports").aggregate([
            {
                $match: { municipality }
            },
            {
                $project: { _id: 0, ident: 1, name: 1, country: 1 }
            }
        ]).toArray();

        console.log(`List airports in ${municipality}:`, result);
    } catch (error) {
        console.error(`Error listing airports in ${municipality}`, error);
        throw error;
    }
}

module.exports = { listAirportsInCity };
