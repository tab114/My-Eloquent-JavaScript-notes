// Historical life expectancy

// When we looked up all the people in our data set that lived more than
// 90 years, only the latest generation in the data came out. Let’s take a
// closer look at that phenomenon:

// Compute and output the average age of the people in the ancestry data
// set per century. A person is assigned to a century by taking their year
// of death, dividing it by 100, and rounding it up, as in
// Math.ceil(person.died / 100).

// For bonus points, write a function groupBy that abstracts the grouping
// operation. It should accept as arguments an array and a function that
// computes the group for an element in the array and returns an object
// that maps group names to arrays of group members.

// → 16: 43.5
//   17: 51.2
//   18: 52.8
//   19: 54.8
//   20: 84.7
//   21: 94


let byCentury = groupBy(ancestry, person => Math.ceil(person.died / 100));

function groupBy(array, groupOf) {
  let groups = {};
  array.forEach(element => {
    let groupName = groupOf(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else groups[groupName] = [element];
  });
  return groups;
}

console.log(byCentury);


function average(array) {
  return array.reduce((a, b) =>  a + b ) / array.length;
}

for (let century in byCentury) {
  let averAges = average( byCentury[century].map(person => person.died - person.born ));
  console.log(`${century} : ${averAges}`);
}

// try this instace below:
average(byCentury['18'].map( person => person.died - person.born ));



// 2nd edition (ES5)
function average(array) {
  function plus(a, b) { return a + b };
  return array.reduce(plus) / array.length;
}

function groupBy(array, groupOf) {
  var groups = {};
  array.forEach(function(element) {
    var groupName = groupOf(element);
    if (groupName in groups)
      groups[groupName].push(element);
    else groups[groupName] = [element];
  });
  return groups;
}

var byCentury = groupBy(ancestry, function(person) {
  return Math.ceil( person.died / 100 );
});

for (var century in byCentury) {
  function age(person) { return person.died - person.born };
  var averAges = average(byCentury[century].map(age));
  console.log(century + ': ' + averAges);
}
