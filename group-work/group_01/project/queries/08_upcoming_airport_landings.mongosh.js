async function upcomingAirportLandings(
    db
) {
    try {
        const now = new Date().toISOString();

        const result = await db.collection("flights")
            .find(
                { 
                    arrivalTime: { $gt: now }
                }
            )
        .sort({ arrivalTime: 1 })
        .toArray();

        console.log(`Upcoming airport landings:`, result);
        return result;
    } catch (error) {
        console.error(`Error finding upcoming airport landings:`, error)
    }
}

module.exports = { upcomingAirportLandings };