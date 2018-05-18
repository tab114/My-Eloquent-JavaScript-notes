// List
// http://sherriefuqua.com/pages/blog/articles/eloquent-js-a-list.html

// Write a function arrayToList that builds up a data structure like the previous
// one when given [1, 2, 3] as argument, and write a listToArray function that produces
// an array from a list. Also write the helper functions prepend, which takes an element
// and a list and creates a new list that adds the element to the front of the input list,
// and nth, which takes a list and a number and returns the element at the given
// position in the list, or undefined when there is no such element.

// If you haven’t already, also write a recursive version of nth.

// from array to list
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}
console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: {value: 30, rest: null}}}


// from list to array
function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

console.log(listToArray(arrayToList([10, 20, 30])));

// prepend
// helper function
function prepend(value, list) {
  return {value, rest: list};
}
console.log(prepend(10, prepend(20, prepend(30, null))));
// → {value: 10, rest: {value: 20, rest:	{value: 30, rest: null}}}


// nth
// Grabs the nth item or undefined if no such element.
function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
}
console.log(nth(arrayToList([10, 20, 30]), 2));
// → 20

//Explanation:
//nth(value: 10, rest: {value: 20, rest: {value: 30, rest: null }}, 1)
//  returns nth({value: 20, rest: {value: 30, rest: null }}, 0)
//    returns 20

console.log(nth(arrayToList(""), 0));
// → undefined
