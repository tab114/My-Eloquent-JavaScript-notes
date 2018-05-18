//argument objects
// Whenever a function is called, a special variable named arguments is added
// to the environment in which the function body runs. This variable refers to an
// object that holds all of the arguments passed to the function.

function countArguments() {
  console.log(arguments.length);
}
countArguments(3, "foo", "bar");


//More convenient way to add entries at journal array.
//each entry/object in journal: {'events':["work", "touched tree", "pizza", "running"], 'squirrel': "false"}

//previously added this way:
var journal = [];
function addEntry(events, didITurnIntoASquirrel) {
  journal.push({
    'events': events,
    'squirrel': didITurnIntoASquirrel
  });
}
addEntry(["work", "touched tree", "pizza", "running"], false);
console.log(journal);


// Alternative way with the use of arguments:
var journal = [];
function addEntry(squirrel) {
  var entry = {'events': [], 'squirrel': squirrel};
  for (var i = 1; i < arguments.length; i++)
    // events array (which is property of entry) is filled with values:
    entry.events.push(arguments[i]);
  // squirrel property is not defined as array or object, therefore only
  // one value (the first of squirrel argument) will be accepted and the rest
  // (for events) are ignored:
  journal.push(entry);
}
addEntry(true, "coffee", "peanunts", "pizza", "television", "touched tree");
console.log(journal);


// Global object - window variable
// The global scope, the space in which global variables live, can also be
// approached as an object in JavaScript. Each global variable is present as a
// property of this object. In browsers, the global scope object is stored in
// the window variable.

var myVar = 10;
console.log("myVar" in window);
console.log("Math" in window)
