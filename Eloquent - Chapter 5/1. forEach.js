["A", "B"].forEach(l => console.log(l));
// → A
// → B


// 2nd edtion (ES5)
var booksarray = ["Wampeter", "Foma", "Granfalloon"];

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

forEach(booksarray, console.log);


// forEach is a built-in function:
var booksarray = ["Wampeter", "Foma", "Granfalloon"];
booksarray.forEach(function(book) {
  console.log(book);
})
