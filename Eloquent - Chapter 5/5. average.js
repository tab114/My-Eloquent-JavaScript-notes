function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

average([1, 2, 3, 4, 5]);


// 2nd edition (ES5)
function average(array) {
  function plus(a, b) {
    return a + b
  };
  return array.reduce(plus) / array.length;
}

function age(p) {
  return p.died - p.born
};

function male(p) {
  return p.sex == "m"
};

function female(p) {
  return p.sex == "f"
};

console.log(
  average(ancestry.filter(male).map(age))
);

console.log(
  average(ancestry.filter(female).map(age))
);
