//We want to calculate the shared DNA between the Eloquent's author and
//a chosen archestor named Carolus Haverbeke. Philibert Haverbeke is the author's grandfather,
//that means that he shares 1/4 of the DNA already(approximately)

//we assume this shortened dataset

var ancestryShort = [
  {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
  {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
  {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
  {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"}
]

var byName = {};
ancestryShort.forEach(function(person) {
  byName[person.name] = person;
});


function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    // if no person in database value for returns 0 (defaultValue)
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
  }
  return valueFor(person);
}


function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Carolus Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}
var ph = byName["Philibert Haverbeke"];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
// → 0.00049


//if person exists, it returns the sharedDNA (f) with person.mother, person.fromFather
//Hence, the call to sharedDNA also calls valueFor person.mother & valueFor person.fromFather
//if person is "Carolus", sharedDNA returns 1, else it returns the average fromMother fromFather
//Several sharedDNA calls occur, one per ancestor (fromMother, fromFather)
//When both fromMother and fromFather ancestors do not exist in the database
//sharedDNAs for this ancestor will be calculated
//Then the sharedDNA of the descedants from this ancestor will also be calculated
//since each ancestor's sharedDNAs are the arguments for each descendant sharedDNAs
//Therefore the sharedDNAs of each precedant are calculated until we reach Philibert.
//reduceAncestors for Philibert will return the sharedDNA with Carolus.

//below are the steps to understand the calculation
//1.
console.log(reduceAncestors(Philibert, sharedDNA, 0) / 4);
//is called

//2.
valueFor(Philibert);
//is returned from reduceAncestors

//valueFor code that runs is somehow as follows:
if (Philibert == null) { //not the case, since there IS a Philibert object, so else happens
  return defaultValue; //0
} else {
  return sharedDNA(Philibert, valueFor(byName[Philibert.mother]), valueFor(byName[Philibert.father]));
}

//3.
sharedDNA(Philibert, valueFor(byName[Philibert.mother]), valueFor(byName[Philibert.father]));
//is returned
//There are functions being called inside sharedDNA's arguments.
//That means these are evaluated first before SharedDNA() body code is run and return its value

//The left side of the branch is run first which is a call to the function valueFor:
//4.
valueFor(byName[Philibert.mother]) //which is Emma


//valueFor code that runs now is as follows:
if (Emma == null) { //not the case, since there IS a Emma object, so else happens
  return defaultValue; //0
} else {
  return sharedDNA(Emma, valueFor(byName[Emma.mother]), valueFor(byName[Emma.father]));
}

//5.
sharedDNA(Emma, valueFor(byName[Emma.mother]), valueFor(byName[Emma.father]));
//is returned

//Again, the left side of the branch is called:
//6.
valueFor(byName[Emma.mother]) //which is Sophia

//valueFor code that runs now is as follows:
  if (Sophia == null) { //there is No Sophia entry
    return defaultValue; //0
  } else {
    return sharedDNA(Sophia, valueFor(byName[Sophia.mother]), valueFor(byName[Sophia.father]));
}

// valueFor(byName[Emma.mother]) returns 0 since There is no Sophia object in the ancestry data.
// That means that Emma's mother (Sophia) didn't contribute in DNA sharing:

// Now control goes to the right side of Emma's sharedDNA branch
// sharedDNA(Emma, 0, valueFor(byName[Emma.father]));

//7.
valueFor(byName[Emma.father]) //which is Petrus
//is called

//valueFor code that runs now is as follows:
  if (Petrus == null) { //there is no Petrus object
    return defaultValue; //0
  } else {
    return sharedDNA(Petrus, valueFor(byName[Petrus.mother]), valueFor(byName[Petrus.father]));
  }

// valueFor(byName[Emma.father]) returns 0 since Petrus doesn't exist in the tree.
// That means that Emma's father didn't contribute either in DNA sharing, hence,
// the arguments of sharedDNA are now availavle and the sharedDNA's body will run:
sharedDNA(Emma, 0, 0))
// is called

// "Emma" is not equal "Carolus Haverbeke")
// hence (0 + 0) / 2 = 0 is returned

// this was the returned value of valueFor(byName[Philibert.mother])
// which was the second argument of sharedDNA(Philibert, valueFor(byName[person.mother]), valueFor(byName[person.father]));

// That means that Emma, Philibert's mother didn't contridute in DNA sharing with Carolus.
// Philibert's sharedDNA is now as follows:
// sharedDNA(Philibert, 0, valueFor(byName[person.father]));

// Now control goes to the next argument valueFor(byName[Philibert.father]))

//8.
valueFor(byName[Philibert.father]) //which is Emile
//is called

//valueFor code that runs now is as follows:
  if (Emile == null) { //there is Emile object, hence else happens
    return defaultValue; //0
  } else {
    return sharedDNA(Emile, valueFor(byName[Emile.mother]), valueFor(byName[Emile.father]));
  }

//9.
sharedDNA(Emile, valueFor(byName[Emile.mother]), valueFor(byName[Emile.father]));
//is returned

//The second argument is a call to the function valueFor.

//10.
valueFor(byName[Emile.mother]) //which is Maria Sturn
//is called

//valueFor code that runs now is as follows:
  if (Maria == null) { //there is no Maria object
    return defaultValue; //0
  } else {
    return sharedDNA(Maria, valueFor(byName[person.mother]), valueFor(byName[person.father]));
  }

// valueFor(byName[Emile.mother]) returns 0, which means that Emile's mother didn't contribute in DNA sharing, hence
// sharedDNA(Emile, 0, valueFor(byName[Emile.father]))

// Now control goes to the third argument of Emile's sharedDNA (father)

//11.
valueFor(byName[Emile.father]) //which is Carolus
//is called

//valueFor code that runs now is as follows:
  if (Carolus == null) { //there is Carolus object, hence else happens
    return defaultValue; //0
  } else {
    return sharedDNA(Carolus, valueFor(byName[Carolus.mother]), valueFor(byName[Carolus.father]));
  }

//12.
sharedDNA(Carolus, valueFor(byName[Carolus.mother]), valueFor(byName[Carolus.father]));
//is returned

//valueFor(byName[Carolus.mother]) reurns 0 since carolus mother (another Maria) doesn't exist in the ancestry dataset
//valueFor(byName[Carolus.father]) reurns 0 since carolus father (Carel) doesn't exist in the ancestry dataset
//hence
sharedDNA(Carolus, 0, 0)
//is called

//sharedDNA code that runs is as follows:
  if ("Carolus Haverbeke" == "Carolus Haverbeke")
    return 1;
  else
    return (valueFor(byName[Carolus.mother]) + valueFor(byName[Carolus.father])) / 2;

//since "Carolus Haverbeke" == "Carolus Haverbeke", the sharedDNA call returns 1, which means that Carolus contributed 100%
//in DNA sharing with Carolus.
//sharedDNA(Carolus, valueFor(byName[Carolus.mother]), valueFor(byName[Carolus.father]));
//was also the valueFor(byName[Emile.father]) which was the second argument of Emile's sharedDNA
sharedDNA(Emile, 0, 1)
//and now the code within the body of the function is executed

//sharedDNA code that runs now is as follows:
  if ("Emile" == "Carolus Haverbeke")
    return 1;
  else
    return (0 + 1) / 2;
//(0 + 1) / 2 = 0.5 is returned
//which means that Emile contributed 50% on Carolus DNA
//this was also the valueFor(byName[Philibert.father]) which was the last argument of Philibert's sharedDNA call

sharedDNA(Philibert, 0, 0.5)
//and now the code within the body of the function is executed

//sharedDNA code that runs now is as follows:
  if ("Philibert" == "Carolus Haverbeke")
    return 1;
  else
    return (0 + 0.5) / 2;
//sharedDNA(Philibert, 0, 0.5)) returns (0 + 0.5) / 2 = 0.25 which is the shared DNA btw Philibert and Carolus.
//We also devide this by 4, since Philibert is the author's grandfather.
//0.25 / 4 = 0.0625
