//The sum of a range

// Write a range function that takes two arguments, start and end, and returns
// an array containing all the numbers from start up to (and including) end.

// Next, write a sum function that takes an array of numbers and returns the sum
 // of these numbers.

// As a bonus assignment, modify your range function to take an optional third
// argument that indicates the “step” value used to build up the array.
// If no step is given, the array elements go up by increments of one, corresponding
// to the old behavior. The function call range(1, 10, 2) should return [1, 3, 5, 7, 9].
// Make sure it also works with negative step values so that range(5, 2, -1)
// produces [5, 4, 3, 2].


// ES6
function range(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum(array) {
  let total = 0;
  for (let value of array) {
    total += value;
  }
  return total;
}

console.log(range(1, 10))
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55



// Solution 2nd edition (ES5)
// function that returns array
function range(start, end, step) {
  if (step == null) step = 1;
  var array = [];
  if (step > 0) {
    for (var i = start; i <= end; i += step)
      array.push(i);
    } else {
      for (var i = start; i >= end; i += step)
        array.push(i);
    }
  return array;
}

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(4, 14, 2));
// → [2, 4, 6, 8, 10, 12, 14]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]


//Sum of array - Summing of arithmetic sequence
function sum(array) {
  var n = array.length;
  return n/2*(array[0]+array[n-1])
}

console.log(sum(range(1, 10)));
// → 55
