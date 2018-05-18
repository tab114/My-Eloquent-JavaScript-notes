// CLASSES
//----------------------

// So JavaScript classes are constructor functions with a prototype property.
// That is how they work, and until 2015, that was how you had to write them.
// These days, we have a less awkward notation.

class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
// The prototype property holds the prototype used for instances created through it.
// This is the constructor function (bound to the name Rabbit)
// and the set of methods packaged into that consructor's prototype.
console.log(Rabbit.prototype);

let purpleRabbit = new Rabbit('purple');
console.log(purpleRabbit.speak());

// The class keyword starts a class declaration, which allows us to define a constructor
// and a set of methods all in a single place. Any number of methods may be written inside
// the declaration’s curly braces. The one named constructor is treated specially.
// It provides the actual constructor function, which will be bound to the name Rabbit.
// The others are packaged into that constructor’s prototype.
// Thus, the class declaration above is equivalent to the constructor definition
// from the previous section. It just looks nicer.


// clsses as expressions:

let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello


// MAP
// ---------------------

// A map (noun) is a data structure that associates values (the keys) with other values.
// For example, you might want to map names to ages. It is possible to use objects for this.

let ages2 = {
  Boris: 39,
  Liang: 22,
  Julia: 62
};

console.log(`Julia is ${ages2["Julia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages2);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages2);
// → Is toString's age known? true


// Here, the object’s property names are the people’s names, and the property values their ages.
// But we certainly didn’t list anybody named toString in our map.
// Yet, because plain objects derive from Object.prototype, it looks like the property is there.

// Also, Object property names must be strings. If you need a map whose keys can’t easily
// be converted to strings—such as objects—you cannot use an object as your map.


// Fortunately, JavaScript comes with a class called Map that is written for this exact purpose.
// It stores a mapping and allows any type of keys.

let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Julia", 62);

console.log(ages)

console.log(`Julia is ${ages.get("Julia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false
