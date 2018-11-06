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
        let passengerTrips = this.trips();
        let driverIds = []
        let driversArr = []
        passengerTrips.forEach(function(trip) {
            driverIds.push(trip.driverId);
        });
        for (let i = 0; i < driverIds.length; i++) {
          let drivers = store.drivers.find(driver => driver.id === driverIds[i] )
          driversArr.push(drivers);
        }
        return driversArr;
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