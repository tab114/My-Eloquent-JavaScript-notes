// Mother-child age difference

// Using the example data set from this chapter, compute the average age
// difference between mothers and children (the age of the mother when
// the child is born). You can use the average function defined earlier in
// this chapter.
// Note that not all the mothers mentioned in the data are themselves
// present in the array. The byName object, which makes it easy to find a
// person’s object from their name, might be useful here.

// → 31.2


// byName is used to transform the ancestry array as object where each entry is a value with name
// the person's name i.e. 'Angela Haverbeke' entry in array will be:
// 'Angela Haverbeke': {name: "Angela Haverbeke", sex: "f", born: 1728, died: 1734, father: "Pieter Bernard Haverbeke", etc}

// When I use byName['Angela Haverbeke'] it will return:
// {name: "Angela Haverbeke", sex: "f", born: 1728, died: 1734, father: "Pieter Bernard Haverbeke", etc}

// byName['Angela Haverbeke'].born returns
// 1728


let byName = {};
ancestry.forEach(person => byName[person.name] = person);

// to calculate the average for differences
function average(array) {
  return array.reduce((a, b) => (a + b)) / array.length;
}

// to filter the array on motherExists
function motherExists(person) {
  return byName[person.mother] != null
}

// to map the age differences on the filtered array
function diffMotherChild(person) {
  return person.born - byName[person.mother].born;
}

let differences = ancestry.filter(motherExists).map(diffMotherChild);

console.log( average(differences) );



// 2nd edition (ES5)
function average(array) {
  function plus(a,b) {
    return a + b;
  }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function motherExists(person) {
  return byName[person.mother] != null;
}

function diffMotherChild(person) {
  return person.born - byName[person.mother].born;
}

var differences = ancestry.filter(motherExists).map(diffMotherChild);
console.log(average(differences));
