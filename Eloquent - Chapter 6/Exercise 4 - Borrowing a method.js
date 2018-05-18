// Borrowing a method
//-------------------

// Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used
// as a more robust alternative to the in operator when you want to ignore the prototype’s
// properties. But what if your map needs to include the word "hasOwnProperty"?
// You won’t be able to call that method anymore, because the object’s own property
// hides the method value.

// Can you think of a way to call hasOwnProperty on an object that has its own
// property by that name?

// Remember that methods that exist on plain objects come from Object.prototype.
// And that you can call a function with a specific this binding by using its call method.


let map = {one: true, two: true, hasOwnProperty: true};

// Fix this call: console.log(map.hasOwnProperty("one"));

// call the method hasOwnProperty (that exists in the Object.prototype)
// on the map object with the argument "one".
// Object.prototype is the prototype of all Object instances (map is an instance).

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
// → true
