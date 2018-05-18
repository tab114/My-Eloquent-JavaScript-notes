// some method

// The some() method tests whether at least one element in the array passes
// the test implemented by the provided function.

let array = [1, 2, 3, 4, 5];

let even = function(element) {
  // checks whether an element is even
  return element % 2 === 0;
};

console.log(array.some(even));
// expected output: true


array.some(element => element % 2 == 0);


let arrayOfArrays = [[1, 2], [4, 2], [9, 4]]

arrayOfArrays.some(([first, second]) => {
  return (first + second) < 5;
});
