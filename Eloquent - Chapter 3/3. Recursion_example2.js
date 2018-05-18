/** Consider this puzzle: by starting from the number 1 and repeatedly either adding 5 or multiplying by 3,
an infinite amount of new numbers can be produced. How would you write a function that, given a number,
tries to find a sequence of such additions and multiplications that produce that number?
For example, the number 13 could be reached by first multiplying by 3 and then adding 5 twice,
whereas the number 15 cannot be reached at all. **/

function findSolution(target) {
  function find(start, history) {
    if (start == target)
      return history;
    else if (start > target)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}

console.log(findSolution(13));
// → (((1 * 3) + 5) + 5)


//Explanation:
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big (returns null)
        // since it returns null the function jumbs to the alternative OR.
        // the || operator causes the call that explores (1 * 3) to happen
        // check console.log(null || 33) to remember how OR returns values.
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!


function findSolution(target) {
  function find(current, history) {
    if (current == target)
      return history;
    else if (current > target)
      return null;
    else {
      return find( current + 5, `(${history} + 5)` )
  }
  return find(1, "1");
}

console.log(findSolution(13));
