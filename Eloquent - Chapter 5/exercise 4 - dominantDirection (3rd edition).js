// Write a function that computes the dominant writing direction in a string of text.
// Remember that each script object has a direction property that can be "ltr" (left-to-right),
// "rtl" (right-to-left), or "ttb" (top-to-bottom).
// The dominant direction is the direction of a majority of the characters that have a script
// associated with them. The characterScript and countBy functions defined earlier in the chapter
// are probably useful here.


function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1)
      counts.push({name, count: 1});
    else counts[name].count++;
  }
  return counts;
}



function dominantDirection(text) {
  // countBy will create an array with counts for the two direction cases
  // groupName will be the direction of the character
  let counted = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : "none";
  }).filter(({name}) => name != "none");
  // countBy returns a counts array that has a name and count property
  // i.e. {name: "ltr", count: 3}
  // we filter the object with name == 'none'

  if (counted.length == 0) return 'ltr';

  return counted.reduce((a, b) => a.count > b.count ? a : b).name;

}

// use this in console to check what countBy returns
countBy("Hey, مساء الخير", char => {
  let script = characterScript(char.codePointAt(0));
  return script ? script.direction : "none";
});


console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
console.log(dominantDirection(""));
// → ltr





// returns the script associated with the code
function characterScript(code) {
  for (let script of SCRIPTS) {
    // ranges is a collection (array) of [from, to] arrays
    // some returns true if any range in ranges matches the test's (function) condition
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}


function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    // known is the array's (count) index where the groupName exists (if it exists)
    let known = counts.findIndex(c => c.name == name);
    // if index is -1, the groupName is not yet in the array
    if (known == -1) {
      // push groupName in the array with count: 1
      counts.push({name, count: 1});
    } else {
      // if groupName exists in array, increment that element's count by 1
      counts[known].count++;
    }
  }
  return counts;
}



console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

console.log(characterScript(121));
// → {name: "Latin", …}




// the ? : operators as shortcut of if else statement
for (let i = 0; i < 10; i++) {
  console.log((i % 2 == 0) ? 'even' : 'odd');
}

// The for...of statement creates a loop iterating over iterable objects (including the built-in String)
// Object is not interating
let text = 'lefteris';
for (let char of text) {
  console.log(char);
}

let array = [1,2,4,9,10];
for (let elem of array) {
  console.log(elem);
}
