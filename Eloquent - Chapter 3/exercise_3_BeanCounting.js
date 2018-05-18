/**
Write a function countBs that takes a string as its only argument and returns a number that indicates
how many uppercase “B” characters are in the string.

Next, write a function called countChar that behaves like countBs, except it takes a second argument
that indicates the character that is to be counted (rather than counting only uppercase “B” characters).
Rewrite countBs to make use of this new function.

You can get the Nth character, or letter, from a string by writing "string".charAt(N),
similar to how you get its length with "s".length.
The returned value will be a string containing only one character (for example, "b").
**/


function countChar(word, character) {
  let total = 0;
  for (let i = 0; i <= word.length; i++) {
    if (character == word[i]) {
      total += 1;
    }
  }
  return total;
}

function coundBs(word) {
  return countChar(word, "B");
}

console.log(countChar("kakkerlak", "k"));
// → 4
console.log(countBs("BBC"));
// → 2
