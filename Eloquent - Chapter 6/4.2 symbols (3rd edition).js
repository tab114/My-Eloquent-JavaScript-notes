// SYMBOLS

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;

let blackRabbit = new Rabbit('black');

console.log(blackRabbit[sym]);
// → 55

console.log(blackRabbit);



const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2, 4].toString());
// → 1,2,4
console.log([1, 2, 4][toStringSymbol]());
// → 3 cm of blue yarn


// symbols as expressions
let stringObject = {
  [toStringSymbol]() {
    return "a jute rope";
  }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope



// Symbols as unique keys in objects

let collection = {};

collection['a'] = 5;
collection[666] = 'beast';

// I can override a key:
collection[666] = 'iron maiden';


// symbols cannot be overridden
const mySym = Symbol('my test');
collection[mySym] = 'My secret';


// another developer wants to define a sym with the same description:
const hisSym = Symbol('my test');
collection[hisSym] = 'His secret';

// both symbols exist:
console.log(collection);
