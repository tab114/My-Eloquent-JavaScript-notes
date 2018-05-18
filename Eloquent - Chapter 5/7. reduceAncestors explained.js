// The following code finds the percentage of a person’s
// known ancestors who lived past 70 (by lineage, so people may be counted
// multiple times):

//We assume this shortened ancestry dataset (Maria Sturn included)
var ancestryShort2 = [
  {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
  {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
  {"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"},
  {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"},
  {"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"}
]

var byName = {};
ancestryShort2.forEach(function(person) {
  byName[person.name] = person;
});


function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
        valueFor(byName[person.father]));
  }
  return valueFor(person);
}


function countAncestors(person, test) {
  function combine(current, fromMother, fromFather) {
    var thisOneCounts = current != person && test(current);
    return fromMother + fromFather + (thisOneCounts ? 1 : 0);
  }
  return reduceAncestors(person, combine, 0);
}


function longLivingPercentage(person) {
  var all = countAncestors(person, function(person) {
    return true;
  });
  var longLiving = countAncestors(person, function(person) {
    return (person.died - person.born) >= 70;
  });
  return longLiving / all;
}
console.log(longLivingPercentage(byName["Emile Haverbeke"]));


//in the computation of 'all' and 'longLiving' the countAncestors is called.
//in each variable the test function is different
//the countAncestors is called once only and the person will be the person declared as argument in longLivingPercentage (Emile)
//When countAncestors is called, it returns reduceAncestors.
//the reduceAncestors is also called once only and the person will be the person declared as argument in longLivingPercentage (Emile)
//the f function in reduceAncestors is now the combine function.
//The test function is passed in the combine function via the countAncestors call in the vars all and longLiving
//the reduceAncestors is calling the valueFor function:
//if person exists, it returns the combine (f) with arguments person, valueFor person.mother and valueFor person.fromFather
//Hence, the call to combine also calls valueFor person.mother & valueFor person.fromFather
//if person is the same person (Emile), combine returns 0 + fromMother + fromFather, else
//if person is not the same and passed the test it returns 1 + fromMother + fromFather

//Several combine calls occur, one per ancestor (fromMother, fromFather)
//When both fromMother and fromFather ancestors do not exist in the database
//combine for this ancestor will be calculated and it will return the respective calculated value
//Then the combine of the descedants from this ancestor will also be calculated
//since each ancestor's combines are the arguments for each descendant combines
//Therefore the combines of each precedant are calculated until we reach Emile.
//longLivingPercentage for Emile will return the % of ancestors that lived more than 70 years.



//below are the steps to understand the calculation
// 1.
longLivingPercentage(Emile);
// is called

// 2.
// from var all declaration
countAncestors(Emile, function(Emile) {
  return true;
});
// is called
// test argument is a function called within countAncestors's body)

// the countAncestors function is as follow:
function countAncestors(person, test) {
  function combine(current, fromMother, fromFather) {
    var thisOneCounts = current != person && test(current);
    return fromMother + fromFather + (thisOneCounts ? 1 : 0);
  }
  return reduceAncestors(person, combine, 0);
}

// 3.
reduceAncestors(Emile, combine, 0);
// is called next

// reduce ancestors is as follows:
function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
        valueFor(byName[person.father]));
  }
  return valueFor(person);
}

// 4.
valueFor(Emile);
// is returned

// the valueFor function is:
function valueFor(person) {
  if (person == null)
    return defaultValue;
  else
    return f(person, valueFor(byName[person.mother]),
      valueFor(byName[person.father]));
}

// Emile exists in dataset hence
// 5.
combine(Emile, valueFor(byName[Emile.mother]), valueFor(byName[Emile.father]));
//is called

// 6.
valueFor(byName[Emile.mother]); //which is "Maria Sturm"
// is called

// Maria Sturm exists in the dataset hence
// 7.
combine(Maria, valueFor(byName[Maria.mother]), valueFor(byName[Maria.father]));
// is called

// 8.
valueFor(byName[Maria.mother]) // which is Seraphina Spelier is called
// it returns 0 since Seraphina doesn't exist in dataset

// 9.
valueFor(byName[Maria.father]) // which is Charles Sturm is called
// it returns 0 since Charles doesn't exist in dataset

// now the arguments for Maria's combine are available and the code in body
// is run:
combine(Maria, 0, 0);

// combine function is as follows:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 10.
// from thisOneCounts declaration
test(Maria)
// is called
// test was most recently declared (as argument) at "var all" declaration from longLivingPercentage body:
function longLivingPercentage(person) {
  var all = countAncestors(person, function(person) {
    return true;
  });
  var longLiving = countAncestors(person, function(person) {
    return (person.died - person.born) >= 70;
  });
  return longLiving / all;
}
// So, when longLivingPercentage was read (and defined) test took the value: function(person) {return true;}
// So now, test returns always true


// 11.
// thisOneCounts declaration: Maria != Emile && true
// returns true since Maria is NOT equal to Emile && true
// var thisOneCounts = true;
// that means that Maria herself was an Emile's ancestor that we can count
// and calculate whether she lived more thaan 70 years


// 12.
// combine(Maria, 0, 0) returns
// 0 + 0 + (true ?1 : 0)
// 0 + 0 + 1
// = 1

// Now we jump at Emile's combine function:
combine(Emile, 1, valueFor(byName[Emile.father]))

// 13.
valueFor(byName[Emile.father]); //which is "Carolus Haverbeke"
// is called next (3rd argument of Emile's combine)

// Carolus exist in the dataset hence
combine(Carolus, valueFor(byName[Carolus.mother]), valueFor(byName[Carolus.father]))
// is called

// mother of Carolus do not exist in dataset but father exists (Carel Haverbeke)

// 14.
combine(Carolus, 0, valueFor(byName['Carel Haverbeke']);

// 15.
valueFor(byName['Carel Haverbeke']
// is called and

// 16.
combine(Carel, valueFor(byName[Carel.mother]), valueFor(byName[Carel.father]);
// is called

//both mother and father of Carel do not exist in the database hence:
combine(Carel, 0, 0);

// now combine's body code for Carolus will run

// combine function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 17.
test(Carel)
// is called
// test was most recently declared (as argument) at "var all" declaration from longLivingPercentage body
// returns always true


// 18.
// thisOneCounts declaration: Carel != Emile && true
// returns true since Carel is NOT equal to Emile && true
// var thisOneCounts = true;
// that means that Carel was an Emile's ancestor that we can count
// and also calculate later whether he lived more thaan 70 years


// 19.
// combine(Carel, 0, 0) returns
// 0 + 0 + (true ?1 : 0)
// 0 + 0 + 1
// = 1


// now combine's body code for Carolus is ready to run
//20.
combine(Carolus, 0, 1);


// combine function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 21.
test(Carolus)
// is called
// test was most recently declared (as argument) at "var all" declaration from longLivingPercentage body
// returns always true


// 22.
// thisOneCounts declaration: Carolus != Emile && true
// returns true since Carolus is NOT equal to Emile && true
// var thisOneCounts = true;
// that means that Carolus was an Emile's ancestor that we can count
// and also calculate whether he lived more thaan 70 years


// 23.
// combine(Carolus, 0, 1) returns
// 0 + 1 + (true ?1 : 0)
// 0 + 1 + 1
// = 2

// 24.
// arguments for Emile's combine have now been calculated
// now combine's body is ready to run
combine(Emile, 1, 2) {};

// combines function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 25.
test(Emile)
// is called again
// test was most recently declared at "var all" declaration from longLivingPercentage body
// returns always true

// 26.
// thisOneCounts declaration: Emile != Emile && true
// returns false since Emile == Emile && true
// var thisOneCounts = false;


// 27.
// combine(Emile, 1, 2) returns
// 1 + 2 + (false ?1 : 0)
// 1 + 2 + 0
// = 3

// 28.
valueFor(Emile);
// is 2
// which means that
reduceAncestors(Emile, combine, 0);
// also returns 2
// which means that
var all = 3; // which is Carolus and Maria


// 2.1
// Now control goes to longLivingPercentage's
// var longLiving declaration
// from var longLiving declaration:
var longLiving = countAncestors(person, function(person) {
  return (person.died - person.born) >= 70;
});

// 2.2
// from var longLiving declaration
countAncestors(Emile, function(Emile) {
  return (Emile.died - Emile.born) >= 70;
});
// is called (test argument is a function called within countAncestors's body)

// the countAncestors function is as follow:
function countAncestors(person, test) {
  function combine(current, fromMother, fromFather) {
    var thisOneCounts = current != person && test(current);
    return fromMother + fromFather + (thisOneCounts ? 1 : 0);
  }
  return reduceAncestors(person, combine, 0);
}

// 2.3
reduceAncestors(Emile, combine, 0);
// is called next

// reduce ancestors is as follows:
function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
        valueFor(byName[person.father]));
  }
  return valueFor(person);
}

// 2.4
valueFor(Emile);
// is returned

// the valueFor function is:
function valueFor(person) {
  if (person == null)
    return defaultValue;
  else
    return f(person, valueFor(byName[person.mother]),
      valueFor(byName[person.father]));
}

// Emile exists in dataset hence
// 2.5
combine(Emile, valueFor(byName[Emile.mother]), valueFor(byName[Emile.father]));
//is called

// 2.6
valueFor(byName[Emile.mother]); //which is "Maria Sturm"
// is called

// Maria Sturm exists in the dataset hence
// 2.7
combine(Maria, valueFor(byName[Maria.mother]), valueFor(byName[Maria.father]));
// is called

// 2.8
valueFor(byName[Maria.mother]) // which is Seraphina Spelier is called
// it returns 0 since Seraphina doesn't exist in dataset

// 2.9
valueFor(byName[Maria.father]) // which is Charles Sturm is called
// it returns 0 since Charles doesn't exist in dataset

// now the arguments for Maria's combine are available and the code in body
// is run:
combine(Maria, 0, 0);

// combine function is as follows:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 2.10
// from thisOneCounts declaration
test(Maria)
// is called
// test was most recently declared (as argument) at "var longLiving" declaration from longLivingPercentage body:
function longLivingPercentage(person) {
  var all = countAncestors(person, function(person) {
    return true;
  });
  var longLiving = countAncestors(person, function(person) {
    return (person.died - person.born) >= 70;
  });
  return longLiving / all;
}
// So, when longLivingPercentage was read (and defined) test took the value: function(person) {return (person.died - person.born) >= 70;}
// So now, test returns:
// (Maria.died - Maria.born) >= 70
// (1917 - 1835) >= 70
// returns true

// 2.11
// thisOneCounts declaration: Maria != Emile && true
// returns true since "Maria" is NOT equal to "Emile" ==> "true && true" equals true
// var thisOneCounts = true;
// that means that Maria was an Emile's ancestor that we can count
// and lived more than 70 years


// 2.12
// combine(Maria, 0, 0) returns
// 0 + 0 + (true ?1 : 0)
// 0 + 0 + 1
// = 1

// Now we jump at Emile's combine function:
combine(Emile, 1, valueFor(byName[Emile.father]))

// 2.13
valueFor(byName[Emile.father]); //which is "Carolus Haverbeke"
// is called next (3rd argument of Emile's combine)

// Carolus exist in the dataset hence
combine(Carolus, valueFor(byName[Carolus.mother]), valueFor(byName[Carolus.father]))
// is called

// mother of Carolus do not exist in dataset but father exists (Carel Haverbeke)

// 2.14
combine(Carolus, 0, valueFor(byName['Carel Haverbeke']);

// 2.15.
valueFor(byName['Carel Haverbeke']
// is called and

// 2.16
combine(Carel, valueFor(byName[Carel.mother]), valueFor(byName[Carel.father]);
// is called

//both mother and father of Carel do not exist in the database hence:
combine(Carel, 0, 0);

// now combine's body code for Carolus will run

// combine function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 2.17
test(Carel)
// is called
// test was most recently declared (as argument) at "var longLiving" declaration from longLivingPercentage body:
function longLivingPercentage(person) {
  var all = countAncestors(person, function(person) {
    return true;
  });
  var longLiving = countAncestors(person, function(person) {
    return (person.died - person.born) >= 70;
  });
  return longLiving / all;
}
// So, when longLivingPercentage was read (and defined) test took the value: function(person) {return (person.died - person.born) >= 70;}
// So now, test returns:
// (Carel.died - Carel.born) >= 70
// (1837 - 1796) >= 70
// returns false

// 18.
// thisOneCounts declaration: Carel != Emile && false
// ==> true && false = false
// var thisOneCounts = false;
// that means that Carel was an Emile's ancestor that we can count
// but won't calculate in longLiving since he lived less than 70 years


// 19.
// combine(Carel, 0, 0) returns
// 0 + 0 + (true ?1 : 0)
// 0 + 0 + 0
// = 0


// now combine's body code for Carolus is ready to run
//20.
combine(Carolus, 0, 0);


// combine function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 21.
test(Carolus) // returns true since he lived more than 70 years


// 22.
// thisOneCounts declaration: Carolus != Emile && true
// ==> true && true
// var thisOneCounts = true;
// that means that Carolus was an Emile's ancestor that we can count
// and lived more than 70 years


// 23.
// combine(Carolus, 0, 0) returns
// 0 + 1 + (true ?1 : 0)
// 0 + 0 + 1
// = 1

// 24.
// arguments for Emile's combine have now been calculated
// now combine's body is ready to run
combine(Emile, 1, 1) {};

// combines function is:
function combine(current, fromMother, fromFather) {
  var thisOneCounts = current != person && test(current);
  return fromMother + fromFather + (thisOneCounts ? 1 : 0);
}

// 25.
test(Emile)
// is called again
// test was most recently declared at "var all" declaration from longLivingPercentage body
// returns always true

// 26.
// thisOneCounts declaration: Emile != Emile && true
// returns false since Emile == Emile && true
// var thisOneCounts = false;


// 27.
// combine(Emile, 1, 1) returns
// 1 + 1 + (false ?1 : 0)
// 1 + 1 + 0
// = 2

// 28.
valueFor(Emile);
// is 2
// which means that
reduceAncestors(Emile, combine, 0);
// also returns 2
// which means that
var all = 3; // which is Carolus, Maria and Carel
// 2.22
valueFor(Emile);
// is 2
// which means that
reduceAncestors(Emile, combine, 0);
// also returns 2
// which means that
var longLiving = 2; // which is Carolus and Maria (the ancestors lived more than 70 years)

// Control now goes to final branch of code in longLivingPercentage(Emile)
// 3
return longLiving / all;
// returns 2/3 = 1 -> 66.6% of ancestors lived more than 70 years.
