var exampleArray = [0, 2, "foo", 5, 2, "foo"];

//indexOf & lastIndexOf methods
  //first index from the start of the arry
  console.log(exampleArray.indexOf(2));
  //first index from the end of the arry
  console.log(exampleArray.lastIndexOf(2));
  //start searching from 2nd index from the start
  console.log(exampleArray.indexOf(2,2));
  //start searching from 2nd index from the end
  console.log(exampleArray.lastIndexOf(2,2));


//slice method
  //elements between 1st and 4th indices
  console.log(exampleArray.slice(1, 4));
  //elements after the 3rd element
  console.log(exampleArray.slice(2));


//concat method
  //remove specific index from array
  function removeIndex(array, index) {
    return array.slice(0, index)
      .concat(array.slice(index + 1));
  }
  console.log(removeIndex(exampleArray,2))
  //-->[0, 2, 5, 2, "foo"]


//join method
  //join elements on array and glue them with space " "
  //all elements are forced to string type
  console.log(exampleArray.join(" "));
  //--> 0 2 foo 5 2 foo


//indexOf & slice for strings
  //the index of letter in string
  console.log("coconunts".indexOf("u"));
  //slice between 2 letters
  console.log("coconunts".slice(3,6));
