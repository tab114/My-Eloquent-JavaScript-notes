// Rest parameters (...args)

// you put three dots before the function’s last parameter,
// to accept any number of arguments:
function max(...numbers) {
  console.log(numbers) // numbers is an array
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
// Note that the rest parameter is bound to an array:
// i.e. console.log(numbers) in max logged [4, 1, 9, -2].
// The elements of the array are supplied by the actual arguments
// passed to the function i.e. max(4, 1, 9, -2)


// Destructuring:

// The destructuring assignment syntax is a JavaScript expression that makes it
// possible to unpack values from arrays, or properties from objects,
// into distinct variables.

[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: [30,40,50]


let [name1, name2, name3] = ["lefteris", "Kostas", "Martin"];
console.log(name3);
// "Martin"

function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}

// instead of
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

let {name} = {name: "Faraji", age: 23};
let {age} = {name: "Faraji", age: 23};

console.log(name, age);

// → Faraji 23
