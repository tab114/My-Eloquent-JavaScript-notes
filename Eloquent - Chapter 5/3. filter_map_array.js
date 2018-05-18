// filtering an array
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(
  filter(ancestry, function(person) {
    return person.born > 1900 && person.born < 1925;
  }));


// filter is already a standard method for arrays:
console.log(
  ancestry.filter(function(person) {
    return person.born > 1900 && person.born < 1925;
  }));



// Transforming with map
// map builds a new array where each element has been put through a function
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

var overNinety = ancestry.filter((person) => person.died - person.born > 90);

console.log(
  map(overNinety, (person) => person.name)
);

// transform is already a standard method for arrays:
console.log(
  overNinety.map((person) => person.name)
);


// 5th edition with ES5
function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++)
    mapped.push(transform(array[i]));
  return mapped;
}
