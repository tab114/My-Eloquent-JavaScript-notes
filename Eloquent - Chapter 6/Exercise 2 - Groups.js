// Groups
// -----------------

// The standard JavaScript environment provides another data structure called Set.
// Like an instance of Map, a set holds a collection of values. Unlike Map, it does
// not associate other values with those — it just tracks which values are part of the set.
// A value can only be part of a set once — adding it again doesn’t have any effect.

// Write a class called Group (since Set is already taken). Like Set, it has add, delete,
// and has methods. Its constructor creates an empty group, add adds a value to the group
// (but only if it isn’t already a member), delete removes its argument from the group
// (if it was a member), and has returns a Boolean value indicating whether its argument
// is a member of the group.

// Use the === operator, or something equivalent such as indexOf, to determine whether
// two values are the same.

// Give the class a static from method that takes an iteratable object as argument and
// creates a group that contains all the values produced by iterating over it.

class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new Group;
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
}


// understand includes
let n = 13;
let o = {a: 1, b: 2};
let array = [1, 5, 13, {a: 1, b: 2}];

console.log(`array.includes(1) returns ${array.includes(1)}`);
// → true
console.log(`array.includes(b) returns ${array.includes(n)}`);
// → true
console.log(`array.includes(o) returns ${array.includes(o)}`);
// → false



let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
console.log(group);
group.delete(10);
console.log(group.has(10));
// → false
