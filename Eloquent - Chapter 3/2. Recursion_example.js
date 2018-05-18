function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1);
}

console.log(power(2, 3));
// → 8

/**
the power function recalls itself until exponent - 1 = 0, in which case it returns 1
**/

/**
Efficiency vs Simplicity.
Using for loops is faster but less human friendly o read. Also slower to write.
Recursion is recommended to quickly write programs, even if they ight be marginally slower
**/


function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else {
    return base * power(base, exponent - 1);
  }
}
