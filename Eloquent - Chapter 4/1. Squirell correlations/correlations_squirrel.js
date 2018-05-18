//Computing Correlation

//Constructs a table given the dataset (JOURNAL) from jacques_journal.js
//We add a desired event for which we want to measure correlation with whether or not Jacques transformed to squirrel.
//i.e ate pizza and squirrel transformation true

//table is construcetd with these combinations:  [no pizza no squir, pizza no squir, no pizza squir, pizza squir]
function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  //for each entry (or named value) in the JOURNAL array
  for (var entry = 0; entry < journal.length; entry++) {
    var index = 0;
    //indexOf method returns index number
    if (journal[entry].events.indexOf(event) != -1)
    //Finds the index of event value (pizza); if no index (no pizza), -1 is returned
      index += 1;
    if (journal[entry].squirrel)
      index += 2;
    //add 1 to the corresponding index in table
    table[index] += 1;
  }
  return table;
}

//ES6
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

//Create table for Pizza events from jacques' array
//var JOURNAL = exported from jacques_journal.js
console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]


//Function for computing correlation
//https://en.wikipedia.org/wiki/Phi_coefficient

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}


//Create Phis for pizza and tree touch
var phiPizza = phi(tableFor("pizza", JOURNAL));
var phiTree = phi(tableFor("touched tree", JOURNAL));
console.log(phiPizza);
console.log(phiTree);


// Gather Correlations
function gatherCorrelations(journal) {
  var phis = {};
  //entry corresponds to each element in JOURNAL array
  for (var entry = 0; entry < journal.length; entry++) {
    //events per entry
    var events = journal[entry].events;
    for (var i = 0; i < events.length; i++) {
      //each event in entry i.e. pizza
      var event = events[i];
      if (!(event in phis))
        //if event not yet stored on Phis, then calculate phi from respective table and store it in Phis
        phis[event] = phi(tableFor(event, journal));
    }
  }
  return phis;
}

var correlations = gatherCorrelations(JOURNAL);
console.log(correlations);
console.log(correlations.pizza);


//Identify highest correlations
for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1)
    console.log(event + ": " + correlation);
}

//Eating peanuts has a strong positive effect on the chance of turning into a squirrel,
//whereas brushing his teeth has a significant negative effect.


//Final - let's see how those two correlate together

//function that returns true or false, if event exists in entry
function hasEvent(event, entry) {
  return entry.events.indexOf(event) != -1;
}

for (var i = 0; i < JOURNAL.length; i++) {
  var entry = JOURNAL[i];
  //if in entry Jacques ate peanut and didn't brush teeth then push "peanut teeth" event at the end of the events property
  if (hasEvent("peanuts", entry) &&
     !hasEvent("brushed teeth", entry))
    entry.events.push("peanut teeth");
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
