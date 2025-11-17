//working with objects and methods
//methods are functions in an object, they are properties of an object
const cars = {
    make: "Toyota", model: "Camri", year: 2020,
    Processing: function () {
        console.log(`The car that you have bought is a ${this.make} ${this.model} of the year ${this.year}`)
    },
    carMake() {
        console.log(this.make)
    }
}

cars.Processing();
cars.carMake();