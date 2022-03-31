interface Cars {
    Car () : void;
}

class BMW implements Cars {
     Car(): void {
         console.log("BMW CARS");
     }
}

class Mercedes implements Cars {
    Car(): void {
        console.log("Mercedes Cars");
    }
}

type carType = BMW | Mercedes;

const bmw = new BMW();
const mercedes = new Mercedes();

const car_1:carType = bmw;
car_1.Car();

type IndianCars = {
     "CarName": string,
     "Price": string
};

type GermanCars = {
    "CarModel": string,
    "Pricerange": string
};

type CarsType = IndianCars & GermanCars;
const cars:CarsType = {"CarName": "Range Rover", "Price":"80L", "CarModel": "vogue", "Pricerange": "70L-1cr"};
console.log(cars);