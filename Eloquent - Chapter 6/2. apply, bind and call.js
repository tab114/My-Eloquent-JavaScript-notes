// The apply, bind and call methods both take a first argument that can be used to
// simulate method calls. This first argument is in fact used to give a value to this.

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

var whiteRabbit = {type: "white", speak};
var fatRabbit = {type: "fat", speak};

whiteRabbit.speak("I'm a white rabbit")

// apply
// Applies the function (speak) to this (arg1) and with a specific value (arg2).
// Object whiteRabbit and object {type: 'fat'} are the value of this;
// second argument is an array with the value for line (argument);
speak.apply(whiteRabbit, ["I am a white rabbit"]);
speak.apply({type: 'fat'}, ["I am a bigger rabbit"]);


// call
// Calls the function (speak) it is a method of but takes its arguments normally, rather than as an array.
// Like apply and bind, call can pass a specific this value.
speak.call(whiteRabbit, "I am a white rabbit");
speak.call({type: 'old'}, "I am a mature rabbit");
