let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'


// Usually a method needs to do something with the object it was called on.
// When a function is called as a method — looked up as a property and immediately called
// as in object.method() — the special variable this in its body will point to the object
// that it was called on.

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'



// Since each function has its own this binding, whose value depends on the way
// it is called, you cannot refer to the this of the wrapping scope in a regular
// function defined with the function keyword.

// Arrow functions are different—they do not bind their own this, but can see the
// this binding of the scope around them. Thus, you can do something like the following code,
// which references this from inside a local function:

function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]


function normalizeES5() {
  console.log(this.coords.map(function(n) {
    return n / this.length;
  }));
}
normalizeES5.call({coords: [0, 2, 3], length: 5});
// → [NaN, Infinity, Infinity]
