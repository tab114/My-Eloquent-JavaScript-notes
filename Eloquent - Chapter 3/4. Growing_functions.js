/**We want to write a program that prints two numbers, the numbers of cows and chickens on a farm,
with the words Cows and Chickens after them, and zeros padded before both numbers so that they are
always three digits long.**/

function printFarmInventory(cows, chickens) {
  var cowString = String(cows);
  while (cowString.length < 3)
    cowString = '0' + cowString;
  var chickenString = String(chickens);
  while (chickenString.length < 3)
    chickenString = '0' + chickenString;
  console.log(cowString + ' Cows');
  console.log(chickenString + ' Chickens');
}

printFarmInventory(11, 5);


//better way if we add more animals
function zeroPad(number, width) {
  var string = String(number);
  while (string.length < 3)
    string = '0' + string;
  return string;
}

function printFarmInventory(cows, chickens, pigs, horse) {
  console.log(zeroPad(cows, 3) + ' Cows');
  console.log(zeroPad(chickens, 3) + ' Chickens')
  console.log(zeroPad(pigs, 3) + ' Pigs')
  console.log(zeroPad(horse, 3) + ' Horses')
}

printFarmInventory(11, 5, 7, 2);


// With ES6


function zeroPad(number, width) {
  let stringNumber = String(number);
  while (stringNumber.length < width) {
    stringNumber = '0' + stringNumber;
  }
  return stringNumber;
}
zeroPad(10, 3);


function pringFarmInventory(cows, chickens, pigs, horses) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`)
  console.log(`${zeroPad(pigs, 3)} Pigs`)
  console.log(`${zeroPad(horses, 3)} Horses`)
}
pringFarmInventory(4, 15, 8, 2);
