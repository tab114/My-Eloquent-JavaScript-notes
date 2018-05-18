//Reversing an array

// Arrays have a method reverse, which changes the array by inverting the order
//in which its elements appear. For this exercise, write two functions,
//reverseArray and reverseArrayInPlace.
//The first, reverseArray, takes an array as argument and produces a new array
//that has the same elements in the inverse order.
//The second, reverseArrayInPlace, does what the reverse method does:
//it modifies the array given as argument in order to reverse its elements.
//Neither may use the standard reverse method.

// ES6
function reverseArray(array) {
  let output = [];
  for (let i = array.length - 1; i >= 0; i--) {
    output.push(array[i]);
  }
  return output;
}

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]



// solution 2nd edition (ES5)
function reverseArray(array) {
  arrayReversed = [];
  for (i = array.length - 1; i >= 0; i--) {
    arrayReversed.push(array[i]);
  }
  return arrayReversed;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];


//Function that reverses the array itself (doesn't store the reverse in a new array)
function reverseArrayInPlace(array) {
  // If 5 values in array (odd), Math.floor(5 / 2) = 2.
  // The for loop will then run until the 2nd index (** index = 1)
  // If 6 values in array (even), Math.floor(6 / 2) = 3.
  // The for loop will then run until the 3rd index (** index = 2)
  for (var i = 0; i < array.length / 2; i++) {
    var oldValue = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = oldValue;
  }
  return array;
}

function reverseArrayInPlace(array) {
  for (var i = 0; i < array.length/2; i++) {
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] =
  }
}

var arrayValue = [1, 2, 3, 4, 5, 6];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);


// we CANNOT copy the array object (check below oldArray) but we can
// copy if number or string (check oldValue above).
// read Mutability section from Eloquent's chapter 4
//check also reference vs cloning js file.
function reverseArrayInPlace(array) {
  var oldArray = array;
  for (var i = 0; i < Math.floor(array.length / 2); i++) {
    array[i] = oldArray[array.length - 1 - i];
    array[array.length - 1 - i] = oldArray[i];
  }
  return array;
}

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
