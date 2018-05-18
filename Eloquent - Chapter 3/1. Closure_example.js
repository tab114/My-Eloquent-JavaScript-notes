function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5));
// → 10

/**
After executing this line var twice = multiplier(2);, Twice is a function.
twice = function(number) { return number * 2; };'
And when you execute this line console.log(twice(5));
Number will have the value 5 and it will return 10
**/


function multiplier(factor) {
  return (number) => number * factor;
}

//OR

function multiplier(factor) {
  return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
