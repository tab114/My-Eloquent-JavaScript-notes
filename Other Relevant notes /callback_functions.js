// https://www.quora.com/Why-are-callbacks-in-JavaScript-called-callbacks

var calc = function(num1, num2, callback) {
  if (something)
    return callback(num1, num2);
}

var add = function(a, b) {
  return a + b;
}

var multiply = function(a, b) {
  return a * b;
}


calc(2, 3, add);

// OR

calc(2, 3, function(a, b) {
  return a - b
});
