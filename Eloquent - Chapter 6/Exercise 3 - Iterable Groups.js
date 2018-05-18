// Iterable Groups
// -----------------

// Make the Group class from the previous exercise iterable. Refer back to the section
// about the iterator interface earlier in the chapter if you aren’t clear on the exact
// form of the interface anymore.

// If you used an array to represent the group’s members, don’t just return the iterator
// created by calling the Symbol.iterator method on the array. That would work, but it
// defeats the purpose of this exercise.

// It is okay if your iterator behaves strangely when the group is modified during iteration.


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

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}


// the Iterator class:
class GroupIterator {
  constructor(group) {
    this.position = 0;
    this.group = group;
  }

  next() {
    if (this.position == this.group.members.length) return {
      done: true
    }
    let result = {
      value: this.group.members[this.position],
      done: false
    }
    this.position++;
    return result;
  }
}


// Your code here (and the code from the previous exercise)
let group = Group.from(["a", "b", "c"]);
console.log(group);

// iterator uses the value property from next's returned object (result) as return value
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c

let iterator = group[Symbol.iterator]();

// next returns the result object
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
