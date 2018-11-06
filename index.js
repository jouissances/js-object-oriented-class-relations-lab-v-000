let store = {
    passengers: [],
    drivers: [],
    trips: []
}

let id = 0;

class Driver {
    constructor (name) {
        this.name = name;
        this.id = ++id;
        store.drivers.push(this)
    }

    trips() {
        let selectedTrips = store.trips.filter(trip => trip.driverId === this.id);
        return selectedTrips;
    }

    passengers() {
        // Manual searching and pushing
        let driverTrips = this.trips();
        let passengerIds = []
        let passengersArr = []
        driverTrips.forEach(function(trip) {
          passengerIds.push(trip.passengerId);
        });
        for (let i = 0; i < passengerIds.length; i++) {
          let passengers = store.passengers.find(passenger => passenger.id === passengerIds[i] )
          passengersArr.push(passengers);
        }
        return passengersArr;
    }
}


class Passenger {
    constructor (name) {
        this.name = name;
        this.id = ++id;
        store.passengers.push(this)
    }

    trips() {
        let selectedTrips = store.trips.filter(trip => trip.passengerId === this.id);
        return selectedTrips;
    }

    drivers() {
        // Makes use of existing functions
        return this.trips().map(trip => {
            return trip.driver();
        })
    }
}

class Trip {
    constructor (driver, passenger) {
        this.id = ++id;
        if (driver) {
            this.driverId = driver.id
        };
        if (passenger) {
            this.passengerId = passenger.id
        };
        store.trips.push(this)
    }

    passenger() {
        let selectedTrip = store.trips.filter(trip => trip.id === this.id)[0];
        let selectedPassenger = selectedTrip.passengerId;
        let passenger = store.passengers.filter(passenger => passenger.id === selectedPassenger)[0];
        return passenger;
    }

    driver() {
        let selectedTrip = store.trips.filter(trip => trip.id === this.id)[0];
        let selectedDriver = selectedTrip.driverId;
        let driver = store.drivers.filter(driver => driver.id === selectedDriver)[0];
        return driver;
    }
}