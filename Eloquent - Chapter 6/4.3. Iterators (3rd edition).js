// ITERATORS

// String:
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}


// Array:
let myArray = [1, 2, 4, 5, 9];

let iterator = myArray[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// make an iterator:
function makeIterator(array) {
    var nextIndex = 0;
    return {
       next: function() {
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {value: 'no value', done: true};
       }
    };
}

var it = makeIterator(['yo', 'ya']);
console.log(it);
console.log(it.next());
console.log(it.next());
console.log(it.next());
