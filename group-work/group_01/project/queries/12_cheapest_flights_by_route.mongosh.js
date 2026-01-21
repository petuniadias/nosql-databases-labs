async function findCheapestFlightsByRoute(
    db,
    departureAirportIdent = "KSTL",
    arrivalAirportIdent = "EGPF",
) {
    try {
        const result = await db.collection("flights")
            .find({
                departureAirportIdent,
                arrivalAirportIdent
            })
            .sort({price: 1})
            .limit(5)
            .toArray();
        
        console.log(`\nFind cheapest flights by route:`, result);
        return result;
    } catch (error) {
        console.error("Error finding cheapest flights by route:", error);
        throw error;
    }
}

module.exports = { findCheapestFlightsByRoute };