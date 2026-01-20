db = db.getSiblingDB("group_01_flight_management_system_final");
print(`Using database: ${db.getName()}`);

print("Dropping previous data (if any)...");
db.dropDatabase();

const flights = [
    { 
        flightNumber: "TP101", 
        airlineId: "TAP", 
        origin: "OPO", 
        destination: "LIS", 
        departureDate: new Date("2025-05-15T08:00:00Z"), 
        price: 45.0, 
        totalSeats: 150, 
        availableSeats: 2, 
        status: "scheduled" 
    },
    { 
        flightNumber: "FR202", 
        airlineId: "RYA", 
        origin: "LIS", 
        destination: "MAD", 
        departureDate: new Date("2025-05-15T14:30:00Z"), 
        price: 19.99, 
        totalSeats: 180, 
        availableSeats: 0, 
        status: "last_call" 
    },
    { 
        flightNumber: "IB303", 
        airlineId: "IBE", 
        origin: "MAD", 
        destination: "BCN", 
        departureDate: new Date("2025-05-15T19:00:00Z"), 
        price: 55.0, 
        totalSeats: 120, 
        availableSeats: 15, 
        status: "scheduled" 
    },
    { 
        flightNumber: "BA404", 
        airlineId: "BAW", 
        origin: "LHR", 
        destination: "OPO", 
        departureDate: new Date("2025-05-16T10:00:00Z"), 
        price: 120.5, 
        totalSeats: 200, 
        availableSeats: 10, 
        status: "scheduled" 
    },
    { 
        flightNumber: "AF505", 
        airlineId: "AFR", 
        origin: "CDG", 
        destination: "AMS", 
        departureDate: new Date("2025-05-16T13:00:00Z"), 
        price: 89.0, 
        totalSeats: 160, 
        availableSeats: 50, 
        status: "scheduled" 
    },
    { 
        flightNumber: "LH606", 
        airlineId: "DLH", 
        origin: "FRA", 
        destination: "LIS", 
        departureDate: new Date("2025-05-17T09:15:00Z"), 
        price: 150.0, 
        totalSeats: 180, 
        availableSeats: 5, 
        status: "last_call" 
    },
    { 
        flightNumber: "KL707", 
        airlineId: "KLM", 
        origin: "AMS", 
        destination: "MAD", 
        departureDate: new Date("2025-05-17T16:45:00Z"), 
        price: 95.0, 
        totalSeats: 150, 
        availableSeats: 22, 
        status: "scheduled" 
    },
    { 
        flightNumber: "TP108", 
        airlineId: "TAP", 
        origin: "LIS", 
        destination: "FNC", 
        departureDate: new Date("2025-05-18T21:00:00Z"), 
        price: 65.0, 
        totalSeats: 150, 
        availableSeats: 1, 
        status: "scheduled" 
    },
    { 
        flightNumber: "VY808", 
        airlineId: "VLG", 
        origin: "BCN", 
        destination: "CDG", 
        departureDate: new Date("2025-05-18T07:30:00Z"), 
        price: 35.0, 
        totalSeats: 180, 
        availableSeats: 100, 
        status: "scheduled" 
    },
    { 
        flightNumber: "UA909", 
        airlineId: "UAL", 
        origin: "JFK", 
        destination: "LHR", 
        departureDate: new Date("2025-05-19T23:00:00Z"), 
        price: 450.0, 
        totalSeats: 300, 
        availableSeats: 12, 
        status: "scheduled" 
    }
];

const reservations = [
    { 
        reservationId: "R01", 
        username: "Petunia", 
        flightNumber: "TP101", 
        seat: "12A", 
        bookingDate: new Date("2025-01-10T10:00:00Z") 
    },
    { 
        reservationId: "R02", 
        username: "Meireles", 
        flightNumber: "FR202", 
        seat: "05C", 
        bookingDate: new Date("2025-01-11T09:30:00Z") 
    },
    { 
        reservationId: "R03", 
        username: "João", 
        flightNumber: "IB303", 
        seat: "22F", 
        bookingDate: new Date("2025-01-12T15:00:00Z") 
    },
    { 
        reservationId: "R04", 
        username: "Marta99", 
        flightNumber: "BA404", 
        seat: "01B", 
        bookingDate: new Date("2025-01-13T12:00:00Z") 
    },
    { 
        reservationId: "R05", 
        username: "Tiago_P", 
        flightNumber: "AF505", 
        seat: "10D", 
        bookingDate: new Date("2025-01-14T08:45:00Z") 
    },
    { 
        reservationId: "R06", 
        username: "Ana_S", 
        flightNumber: "LH606", 
        seat: "14A", 
        bookingDate: new Date("2025-01-15T19:20:00Z") 
    },
    { 
        reservationId: "R07", 
        username: "alBerto_2", 
        flightNumber: "KL707", 
        seat: "08E", 
        bookingDate: new Date("2025-01-16T11:10:00Z") 
    },
    { 
        reservationId: "R08", 
        username: "Carla_V", 
        flightNumber: "TP108", 
        seat: "02A", 
        bookingDate: new Date("2025-01-17T14:50:00Z") 
    },
    { 
        reservationId: "R09", 
        username: "Duarte_X", 
        flightNumber: "VY808", 
        seat: "30C", 
        bookingDate: new Date("2025-01-18T10:30:00Z") 
    },
    { 
        reservationId: "R10", 
        username: "Elena_R", 
        flightNumber: "UA909", 
        seat: "15G", 
        bookingDate: new Date("2025-01-19T17:00:00Z") 
    }
];

const users = [
    { 
        username: "Petunia", 
        name: "Petunia Flower", 
        email: "petunia@gmail.com",
    },
    { 
        username: "Meireles", 
        name: "João Meireles", 
        email: "rego@gmail.com", 
    },
    { 
        username: "João", 
        name: "João Silva", 
        email: "joaozinho@gmail.com", 
    },
    { 
        username: "Marta99", 
        name: "Marta Lopes", 
        email: "marta@gmail.com",
    },
    { 
        username: "Tiago_P", 
        name: "Tiago Pereira", 
        email: "tiago@hmail.com", 
    },
    { 
        username: "Ana_S", 
        name: "Ana Santos", 
        email: "ana@gmail.com", 
    },
    { 
        username: "alBerto_2", 
        name: "Alberto Costa", 
        email: "beto@gmail.com", 
    },
    { 
        username: "Carla_V", 
        name: "Carla Vaz", 
        email: "carla@gmail.com",
    },
    { 
        username: "Duarte_X", 
        name: "Duarte Xavier", 
        email: "duarte@gmail.com", 
    },
    { 
        username: "Elena_R", 
        name: "Elena Ramos", 
        email: "elena@hmail.com", 
    }
];

const airlines = [
    { 
        airlineId: "TAP", 
        name: "TAP Air Portugal", 
        country: "Portugal" 
    },
    { 
        airlineId: "RYA", 
        name: "Ryanair", 
        country: "Ireland" 
    },
    { 
        airlineId: "IBE", 
        name: "Iberia", 
        country: "Spain" 
    },
    { 
        airlineId: "BAW", 
        name: "British Airways", 
        country: "UK" 
    },
    { 
        airlineId: "AFR", 
        name: "Air France", 
        country: "France" 
    },
    { 
        airlineId: "DLH", 
        name: "Lufthansa", 
        country: "Germany" 
    },
    { 
        airlineId: "KLM", 
        name: "KLM Royal Dutch", 
        country: "Netherlands" 
    },
    { 
        airlineId: "EZY", 
        name: "EasyJet", 
        country: "UK" 
    },
    { 
        airlineId: "VLG", 
        name: "Vueling", 
        country: "Spain" 
    },
    { 
        airlineId: "UAL", 
        name: "United Airlines", 
        country: "USA" 
    }
];

const airports = [
    { 
        airportCode: "OPO", 
        name: "Francisco Sá Carneiro", 
        city: "Porto", 
        country: "Portugal" 
    },
    { 
        airportCode: "LIS", 
        name: "Humberto Delgado", 
        city: "Lisboa", 
        country: "Portugal" 
    },
    { 
        airportCode: "FNC", 
        name: "Cristiano Ronaldo", 
        city: "Funchal", 
        country: "Portugal" 
    },
    { 
        airportCode: "MAD", 
        name: "Adolfo Suárez Barajas", 
        city: "Madrid", 
        country: "Spain" 
    },
    { 
        airportCode: "BCN", 
        name: "El Prat", 
        city: "Barcelona", 
        country: "Spain" 
    },
    { 
        airportCode: "LHR", 
        name: "Heathrow", 
        city: "London", 
        country: "UK" 
    },
    { 
        airportCode: "CDG", 
        name: "Charles de Gaulle", 
        city: "Paris", 
        country: "France" 
    },
    { 
        airportCode: "FRA", 
        name: "Frankfurt Airport", 
        city: "Frankfurt", 
        country: "Germany" 
    },
    { 
        airportCode: "AMS", 
        name: "Schiphol", 
        city: "Amsterdam", 
        country: "Netherlands" },
    { 
        airportCode: "JFK", 
        name: "John F. Kennedy", 
        city: "New York", 
        country: "USA" 
    }
];

print("\nImporting reference data...");
db.flights.insertMany(flights);
db.reservations.insertMany(reservations);
db.users.insertMany(users);
db.airlines.insertMany(airlines);
db.airports.insertMany(airports);

print("\nCreating useful indexes...");
db.flights.createIndex({ flightNumber: 1 }, { unique: true });
db.flights.createIndex({ departureDate: 1 });
db.users.createIndex({ username: 1 }, { unique: true });
db.reservations.createIndex({ username: 1 });
db.airports.createIndex({ airportCode: 1 });