function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true


function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);

// note that the below does not work:
noisy(Math.min((3, 2, 1));
// here we pass at noisy the result of Math.min(3, 2, 1)) which is a number.
// noisy however takes function (f) as argument (function), which is used
// as a function within the noisy's callback.

noisy(Math.min)(3, 2, 1);
// Here on the other hand we first pass a function (Math.min) at noisy
// which is used in the callback: let result = f(...args);
// Then we pass the arguments in noisy's callback which in turn returns
// the result.


function repeat(times, action) {
  for (let i = 0; i < times; i++) {
    action(i);
  }
}

function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
 	console.log(n, 'is even');
  });
});



// 2nd edition (ES5)
// Function that operates on other function:
function greaterThan(n) {
  return function(m) {
    return m > n
  };
}
console.log(greaterThan(10)(20));


// more complicated:
function unless(test, then) {
  if (!test) then();
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) body(i);
}

repeat(10, function(n) {
  unless(n % 2, function() {
    console.log(n, "is even");
  });
});

// repeat() is called with times=10 and body=function(n){}
// repeats step i = 0 and function(n) is called with n=0 (body(i=0))
// unless(0 % 2, then){}  is called
// 0 % 2 = 0 -> !0 = true
// then() function is called which is console.log
// "0 is even" is logged in the console

// repeat step (i) becomes 1
// body(1) is function(1)
// unless(1 % 2, then){}  is called
// 1 % 2 = 1 -> !1 = false

// repeat step i = 2
// etc


// Noisy Function:
// noisy accepts argument f (where f itself appears to be a function)
function noisy(f) {
  // noisy returns a new function that takes an argument arg
  return function(arg) {
    // when this new function is called, it logs to console
    console.log("calling with", arg);
    // the function you originally passed to noisy is now called, with the return value stored in val
    var val = f(arg);
    // return value val also logged to console
    console.log("called with", arg, "- got", val);
    // return value val is returned from the generated function
    return val;
  };
}
// noisy is called with the inbuilt function Boolean and the argument 0 (to test the boolean value of 0)
// Boolean(0) returns false and Boolean(1) returns true
noisy(Boolean)(0);
//or
var noisyBoolean = noisy(Boolean);
noisyBoolean(0);


//http://stackoverflow.com/questions/27934951/eloquent-javascript-2nd-edition-chapter-5-higher-order-functions
