//Summarizing with reduce
//reduce combines all an array’s elements into a single value.

function reduce(array, combine, start) {
  let accumulator = start;
  for (let element of array) {
    accumulator = combine(accumulator, element);
  }
  return accumulator;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

// as a standard method:
console.log(
  [1, 2, 3, 4].reduce((a, b) => a + b, 0);
);
// → 10

// with accumulator and currentValue as argument names
console.log(
  [1, 2, 3, 4].reduce((accumulator, currentValue) => accumulator + currentValue, 0)
);
// → 10

// If your array contains at least one element, you are allowed to leave off
// the start argument. The method will take the first element of the array as
// its start value and start reducing at the second element.
// (see reduce definition from ES5 below)

console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10



// 2nd edition (ES5)
function reduce(array, combine) {
  var accumulator = array[0];
  for (var i = 1; i < array.length; i++) {
    accumulator = combine(accumulator, array[i]);
  }
  return accumulator;
}


// sum of array
console.log(
  reduce([1, 2, 3, 4], function(a, b) {
    return a + b;
  })
);

// with accumulator and currentValue as argument names
console.log(
  reduce([1, 2, 3, 4], function(accumulator, currentValue) {
    return accumulator + currentValue;
  })
);

// reduce as a standard method and with initial value for the accumulator
console.log(
  [1, 2, 3, 4].reduce(function(a, b) {
    return a + b;
  }, 5)
);

//EXPLAINED:
// i. ean den dwsw arxiko value, o accumulator einai array[0] kai to currentValue
// einai to array[i] ksekinontas me i=1

// ii. ean dwsw arxiko value, o accumulator einai to arxiko value kai to currentValue
// einai to array[i] ksekinontas me to i=0

// min of array
console.log(
  reduce([1, 2, 3, 4], function(min, cur) {
    if (min < cur) return min;
    else return cur;
  });
);

console.log(
  reduce([1, 2, 3, 4], function(accumulator, currentValue) {
    if (accumulator < currentValue) return accumulator;
    else return currentValue;
  });
);

// reduce as a standard method and with initial value for the accumulator
console.log(
  [1, 2, 3, 4].reduce(function(min, cur) {
    if (min < cur) return min;
    else return cur;
  }, 0)
)

// reduce as a standard method with the use of ancestry:
console.log(
  ancestry.reduce(function(min, cur) {
    if (min.born < cur.born) return min;
    else return cur;
  })
)
