// returns the script associated with the code
function characterScript(code) {
  for (let script of SCRIPTS) {
    // ranges is a collection (array) of [from, to] arrays
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}

// returns an array of objects, where each object has properties the groupName
// and the counts that this group occurs:
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


// codePointAt:
'lefteris'.codePointAt(3);
// 116
't'.codePointAt(0);
// 116
