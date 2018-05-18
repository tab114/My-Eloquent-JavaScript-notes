// The prototype relations of JavaScript objects form a tree-shaped structure,
// and at the root of this structure sits Object.prototype. It provides a few methods
// that show up in all objects, such as toString, which converts an object to a string representation.

console.log(Object.prototype);


console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null


// Functions derive from Function.prototype, and arrays derive from Array.prototype.
console.log(Object.getPrototypeOf(isNaN) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true

// both derive from Object.prototype:
console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype)
// → true


var protoRabbit = {
  speak: function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};


// The this variable will point to the object that it will be called on.
// i.e. below to the killerRabbit

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

let killerRabbit = makeRabbit('killer');
killerRabbit.speak("SKREEEE!");


console.log(Object.getPrototypeOf(killerRabbit));  //the protoRabbit
console.log(killerRabbit.type);  //killer - property applied only to killerRabbit
console.log(killerRabbit.speak); //method derived from its prototype
console.log(protoRabbit.type);   //undefined


// Constructors
function Rabbit(type) {
  this.type = type;
}

// this variable is bound to the new object
var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type); //black


console.log(Object.getPrototypeOf(Rabbit));
// The Function.prototype - the prototype of instances of Function
console.log(Rabbit.prototype);
// The constructor of Rabbit - the prototype of instances of Rabbit

// Every instance created with a constructor will have the constructor as its prototype
console.log(Object.getPrototypeOf(killerRabbit));  // the Rabbit constructor

// So, constructors automatically have a prototype property.
// The constructor's prototype property is the prototype that every (instance) object
// will have when created via a constructor.
Object.getPrototypeOf(killerRabbit) === Rabbit.prototype;
// → true


// To add a speak method to rabbits created with Rabbit constructor:
Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
// this is bound to the object that the speak will be call on:
console.log(killerRabbit.speak("I'm bored"));


// It is important to note the distinction between the way a prototype is associated
// with a constructor (through its prototype property) and the way objects have a prototype
// (which can be retrieved with Object.getPrototypeOf). The actual prototype of a constructor
// is Function.prototype since constructors are functions. Its prototype property will be the
// prototype of instances created through it but is not its own prototype.

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

// When you add a property to an object, whether it is present in the prototype or not, the property
// is added to the object itself, which will henceforth have it as its own property. If there is a
// property by the same name in the prototype, this property will no longer affect the object.
// The prototype itself is not changed.
