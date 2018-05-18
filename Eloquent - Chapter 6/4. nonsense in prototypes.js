// from squirel, storing phi values per event
var map = {};

function storePhi(event, phi) {
  map[event] = phi;
}

storePhi("pizza", 0.069);
storePhi("touched tree", -0.081);
console.log(map);

// names in map objects
for (name in map) {
  console.log(name);
}
  //pizza
  //touched tree

// Any property we create in the Object.prototype
// will show up in the map object as well (in fact in all objects).
// it will be an enumerable property.

Object.prototype.nonsense = "hi";

for (name in map) {
  console.log(name);
}

  //pizza
  //touched tree
  //nonsense

// Also, all default properties in the Object.prototype will also show up when
// using the in operator as non-enumerable properties:

console.log("nonsense" in map);
// → true
console.log("toString" in map);
// → true

// toString did not show up in the for/in loop, but the in operator did return true for it


// Solve creating enumerable properties in the Object.prototype:
Object.defineProperty(Object.prototype, "hiddenNonsense",
                      {enumerable: false, value: "hi"});
for (var name in map)
  console.log(name);
// → pizza
// → touched tree
console.log(map.hiddenNonsense);
// → hi

// however we still have the problem with the regular in operator
// claiming that the Object.prototype properties exist in our object.

// This method tells us whether the object itself has the property,
// without looking at its prototypes.
console.log(map.hasOwnProperty("toString"));
// → false

//Best solution:
for (var name in map) {
  if (map.hasOwnProperty(name)) {
    console.log(name);
  }
}
// This when worried that someone (some other code you loaded into your program)
// might have messed with the base object prototype

// What if someone registered the name hasOwnProperty in our map object
// and set it to the value 42? Now the call to map.hasOwnProperty will try to call
// the local property, which holds a number, not a function

// Object.create is used to create an object with a specific prototype.
// In the case below the prototype is null, hence the map object doesn't
// have a prototype.


var map = Object.create(null);
map['pizza'] = 0.69;
console.log("toString" in map);
// → false
console.log("pizza" in map);
// → true

map['pizza'].toString();
// → "0.69"
