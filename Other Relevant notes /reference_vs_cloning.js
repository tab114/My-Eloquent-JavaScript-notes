
function changeContent(arg) {
  var b = arg;
  arg[1] = "peanunts";
  return b;
}
console.log(changeContent(["orange", "apple"]));
// "It is because an object is itself. When an object is modified that object is modified "
// http://blog.soulserv.net/understanding-object-cloning-in-javascript-part-i/


var object = { a: 1, b: 2 };
var copy = object ;
object.a = 3;
console.log( copy.a );


// I can copy a value if string or number
var array = [1, 2, 3, 4, 5, 6];
var copyFirst = array[0];
array[0] = 100;
console.log(copyFirst);

// but not if object
var array = [1, 2, 3, 4, 5, 6];
var copyArray = array;
array[0] = 100;
console.log(copyArray);


// Immutability of numbers, strings, and Booleans
let string = 'lefteris';
string.toUpperCase();
console.log(string);


// Mutability of objects and arrays
let array = ['lefteris', 2];
console.log(array);
array.push('100');
console.log(array);


// the object below is not mutated as all String methods do not mutate.
let object = {name: 'lefteris', number: 2};
object.name.toUpperCase();
console.log(object);
