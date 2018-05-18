//Flattening
//Use the reduce method in combination with the concat method to “flatten”
//an array of arrays into a single array that has all the elements of the input
//arrays.

// → [1, 2, 3, 4, 5, 6]

let arrays = [[1, 2, 3], [4, 5], [6]];

arrays.reduce((prev, curr) => prev.concat(curr));



arrays.reduce((prev, curr) => prev.concat(curr));

// with a start value:
arrays.reduce((prev, curr) => prev.concat(curr), []);



// 2nd edition (ES5)
var arrays = [[1, 2, 3], [4, 5], [6]];

//reduce takes a callback function and passes the previous & current values
arrays.reduce(function(prev, curr) {
  //return the previous value (an array) concatenated with the current value
  //the concat method returns a new array
  return prev.concat(curr);
});
