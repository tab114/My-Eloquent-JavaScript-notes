// Analogous to the some method, arrays also have an every method.
// This one returns true when the given function returns true for every element
// in the array. In a way, some is a version of the || operator that acts on arrays,
// and every is like the && operator.

// Implement every as a function that takes an array and a predicate function
// as parameters. Write two versions, one using a loop and one using the some method.


function every(array, predicate) {
  for (let element of array) {
    if (!predicate(element)) return false;
  }
  return true;
}

function every2(array, predicate) {
  return !array.some(element => !predicate(element));
}

console.log(every([1, 3, 5], n => n < 10));
console.log(every2([1, 3, 5], n => n < 10));
// → true

console.log(every([2, 4, 16], n => n < 10));
console.log(every2([2, 4, 16], n => n < 10));
// → false

console.log(every([], n => n < 10));
console.log(every2([], n => n < 10));
// → true



[1, 3, 5].some(n => (n < 3));
// returns true if some of the elements pass
// returns false if all of the elements don't pass

[1, 3, 5].some(n => !(n < 3));
// returns true if some of the elements don't pass
// returns false if all of the elements pass

![1, 3, 5].some(n => !(n < 3));
// returns false if some of the elements don't pass
// returns true if all of the elements pass


// example:
[1, 3, 5].some(n => !(n < 10));
// returns false, hence none of the elements are > 10, which means that all are < 10

![1, 3, 5].some(n => !(n < 10));
// true
