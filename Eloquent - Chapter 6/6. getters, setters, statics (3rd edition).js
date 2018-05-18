// It is not necessary for an object to compute and store a property directly
// in the instance. Even properties that are accessed directly may hide a method call.
// Such methods are called getters, and they are defined by writing get in front
// of the method name in an object expression or class declaration.

let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
}
console.log(varyingSize);
console.log(varyingSize.size);
console.log(varyingSize.size);


// The Temperature class allows you to read and write the temperature in either
// degrees Celsius or degrees Fahrenheit, but internally stores only Celsius,
// and automatically converts to Celsius in the fahrenheit getter and setter.

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp);
// the temp object
console.log(temp.celsius);
// → 22
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30


// Inside a class declaration, methods that have static written before their name
// are stored on the constructor. So the Temperature class allows you to write
// Temperature.fromFahrenheit(100) to create a temperature using degrees Fahrenheit.

let tempFahrenheit = Temperature.fromFahrenheit(100);
console.log(tempFahrenheit);
// the temp object
console.log(tempFahrenheit.celsius);
// → 22
console.log(tempFahrenheit.fahrenheit);
// → 71.6
