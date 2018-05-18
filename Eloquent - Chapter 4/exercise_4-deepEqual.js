
// JavaScript’s == operator, when comparing objects, will return true only if
// both objects are precisely the same value. Comparing different objects will
// return false, even if they have identical contents.
var obj = {here: {is: "an"}, object: 2};
console.log(obj == {here: {is: "an"}, object: 2});
//-> false
console.log(obj == obj);
//-> true

// Write a function, deepEqual, that takes two values and returns true only if
// they are the same value or are objects with the same properties whose values
// are also equal when compared with a recursive call to deepEqual.

// To  nd out whether to compare two things by identity (use the === operator for that)
// or by looking at their properties, you can use the typeof operator.
// If it produces "object" for both values, you should do a deep comparison.
// But you have to take one silly exception into account:
// by a historical accident, typeof null also produces "object".

// Function that returns true if:
// 1. same objects
// 2. both objects with same number properties that have same values and content

function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(null, obj));
// → false
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true


// Solution from 2nd edition (ES5)



function deepEqual(a, b) {
  // if a and b objects with same value
  if (a === b) return true;
  // if a or b null and not objects
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;

  var propsInA = 0, propsInB = 0;

  // for each property in a
  for (var prop in a)
    propsInA += 1;
  // for each property in a
  for (var prop in b) {
    propsInB += 1;
    // false if there is no property at a for the respective property number
    // or if a and be not equal at recursive call of deepEqual
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }
  // this checks for false in the case remained - if there are more properties
  // at b than a
  return propsInA == propsInB;
}
