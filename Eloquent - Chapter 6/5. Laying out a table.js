// http://tomi.io/eloquent-javascript-laying-out-a-table/


// Step 1: Build the rows array
function TextCell(text) {
  this.text = text.split("\n");
}

// TextCell is used as a constructor.
// The object's text (this.text) is an array of text,
// splitted in separate text elements if break is present

var rows = [];
for (var i = 0; i < 2; i++) {
  var row = [];
  for (var j = 0; j < 2; j++) {
    if ((j + i) % 2 == 0)
      //creates an object, instance of TextCell
      //each object is pushed in the array row
      row.push(new TextCell("##"));
    else
      row.push(new TextCell("  "));
  }
  //each array of objects is pushed in the array rows
  rows.push(row);
}
// rows is used with drawTable (mentioned later)
// console.log(drawTable(rows));


//rows is an array of arrays of objects:
console.log(rows);


//understand split in TextCell
var textBreak = "lefte\nris Niko\nlidakis";
console.log(textBreak);
// lefte
// ris Niko
// lidakis
var textSplit = textBreak.split("\n")
console.log(textSplit);
// ["lefte", "ris Niko", "lidakis"]
console.log(textBreak);

// If there are any newlines present in the string used as an argument,
// then the string will be separated into array elements:
var textSplitRow = [];
textSplitRow.push(new TextCell(textBreak));
textSplitRow.push(new TextCell('##'));
textSplitRow.push(new TextCell('  '));

console.log(textSplitRow);
//textSplitRow is an array of 3 objects, eacn containing a cell of text.


// Step 2: Pass the rows array into the drawTable function


// Below is the drawTable function
// Just read it - will understand this in next steps
function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");

}


// Step 3: Find the heights value with the rowHeights function

// from drawTable(rows):
var heights = rowHeights(rows);

// Take a look at the rowHeights:
function rowHeights(rows) {
  return rows.map(function(row) {
    // rows (array or two arrays of two obect each, where each object is an array)
    // will be transformed to an array with another value:
    return row.reduce(function(max, cell) {
      // for each array (row) in rows, it will return the length of the cell with the max length.
      // - if there is a \n in the text then length will be greater than 1
      // the result will be a number for each row

      // accumulator takes initial value 0 hence currentValue will start with i=0
      // Hence, currentValue will be row[0] and accumulator === 0 will be compared with
      // row[0].minHeight, to return the maximum value from those two

      return Math.max(max, cell.minHeight());

    }, 0)
    // the number (length) returned from reduce will be the value with which
    // each row will be replaced, and rows will be transformed to an array of
    // two numerical values i.e. [1, 1]
  });
}

// cell.minHeight comes from the TextCell prototype object:
TextCell.prototype.minHeight = function() {
  return this.text.length;
};

// cell are the objects (i.e. {text: ['##']} ) created with the TextCell constructor.
// Hence, TextCell is the prototype that the cell objects have
// since they are created via TextCell constructor.
// minHeight is a method added in the TextCell prototype and all cell objects
// will hold this method
// this is the instance of object created with TextCell, which is cell.
// text is the name of the (cell) object's property that takes an array value i.e. ['##']
// Last, if there was a return ('\n') in the text, TextCell would have created
// extra elements in the text's array, and the length would have been greater than 0.


// The rows array:
// [[{text: [“##”]},{text: [“  ”]}],[{text: [“  ”]},{text: [“##”]}]]

// The first inner array of rows - rows[0]
// [{text: [“##”]},{text: [“  ”]}]

// The second inner array of rows - rows[1]
// [{text: [“  ”]},{text: [“##”]}]

// for rows[0],
// row[0].minHeight is max which is 1

// for rows[1],
// row[0].minHeight is max which is 1

// Hence,  heights == [1, 1]



// Step 4: Find the widths value with the colWidths function

// from drawTable(rows):
var widths = colWidths(rows);

// the colWidths function is as follow:
function colWidths(rows) {
  // rows[0] (array with two objects)
  // will be transformed to an array with another value:
  return rows[0].map(function(_, i) {
    // i is the argument passed in reduce's Math.max
    // What will be returned is the max width of the cell's line
    // with the max width, for each column
    // (we just make use of rows[0] to get i argument and to confirm
    // that an array with two objects will be transformed).
    return rows.reduce(function(max, row) {
      // When i=0,
      // For rows[0] it checks row[0].minWidth only since i=0
      // For rows[1] it checks row[0].minWidth again only
      // This is how it eventually returns the max width from each column
      // When i=1
      // For rows[0] it checks row[1].minWidth only since i=1
      // For rows[1] it checks row[1].minWidth again only
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

// Let's take a look at the minWidth()
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    // the text's array might have more than one elements if \n was present
    // the reduce method will return the length of the element with the max length.
    // line is the cell's line (currentValue), the accumulator is initially 0
    // and will be compared with line.length. The accumulator will take the maximum
    // value from this comparison.
    return Math.max(width, line.length);
  }, 0);
};

// The rows array:
// [[{text: [“##”]},{text: [“  ”]}],[{text: [“  ”]},{text: [“##”]}]]

// The first inner array of rows - rows[0] which will be transformed
// [{text: [“##”]},{text: [“  ”]}]

// When i=0,
// accumulator is 0, currentValue (row) is 0 and accumulator is compared with row[0].minWidth only since i=0
// row[0].minWidth is reduced to the line with the max width and that is 2
// accumulator (max) is now 2

// row (currentValue) now is 1, and the accumulator (2) will be compared with the
// the the rows's [1], row[0].minWidth() which is 2.
// Accumulator then, is still 2.

// till now rows[0] (via map) has been reduced to [2, ...]

// When i=1
// For rows[0] it checks row[1].minWidth only since i=1
// For rows[1] it checks row[1].minWidth again only
// the result is again 2

// Hence,  widths == [2, 2]


// Regarding the underscore as argument,
// it is usually used to indicate to subsequent (human) reader
// of the code that whatever passed in will not be used.
// https://stackoverflow.com/questions/11406823/underscore-as-a-javascript-variable



// Step 5: Find the blocks value


var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.join('\n');

//The next thing that the drawTable function does is looks at the last line which is:
rows.map(drawRow).join("\n");

//drawRow is the callback function

function drawRow(row, rowNum) {
  var blocks = row.map(function(cell, colNum) {
    return cell.draw(widths[colNum], heights[rowNum]);
  });
  return blocks[0].map(function(_, lineNo) {
    return drawLine(blocks, lineNo);
  }).join("\n");
}

// The first thing that is happening is that it is creating "blocks".
// Each row is being mapped by the draw function, and takes in widths[colNum]
// and heights[rowNum]. This is looking at the heights and widths variables
// (that contain arrays) that we went through in Step 3 and 4.
// Since drawRow is the callback function of a map method, the second
// parameter, rowNum refers to the index number that is currently
// being iterated. The same thing goes for colNum. Since cell.draw
// is in a map within a map (much like a loop within a loop) it is going
// to draw all of the cells in the first row, before moving on to the next row.

// Let’s look at the draw function.

TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
    // if there were 2 lines in the cell, the result (cell array)
    // would had 2 values.
    // Also if there are more characters remaining based on the width they
    // will be added as spaces with repeat.
  }
  return result;
};

// blocks eventually is an array of arrays, respectively for each row
// Also, we added the potential spaces for each cell.

 // In our example, the first time drawRow iterates,
 // the variable blocks will look like
 // [[“##”],[“  ”]]

// The second, and final time it iterates, blocks will look like:
// [["  "],["##"]]

// ps if there were more than one value blocks[0] would be
// [["value000   ", "value001  ", "value002   " ], ["value010 ", "value011 "]]
// the blocks[0] above is one line. result is each cell.
// I also added potential spaces (equal number per column)

// let's also assume that blocks[1] is
// [["value100   "], ["value110 ", "value111 "]]




// Step 6: Create each line of the table/checkerboard with the drawLine function

// Next we see that drawRows returns:

return blocks[0].map(function(_, lineNo) {
  return drawLine(blocks, lineNo);
}).join("\n");

// blocks[0] is the first block (cell) constructed previously.
// it is used so that we will take lines number (\n) within this row.
// blocks[0] will be transformed to drawLine(blocks, lineNo);

// for the first row, used from rows.map(drawRow), blocks[0] is
// ["value000   ", "value001   ", "value002   " ] in my advanced examples
// and
// [[“##”] in my simple example.


function drawLine(blocks, lineNo) {
   return blocks.map(function(block) {
     return block[lineNo];
   }).join(" ");
 }

// blocks is row but with the spaces added
// block is cell, and line is the cell's line

// lineNo is taken from blocks[0].map(function(_, lineNo)
// Initially it is 0 which means that we now look at the first line in blocks.

// blocks argument in drawLine is now the whole blocks, but we look only
// at the lineNo value in each block within blocks.

// drawLine returns blocks transformed with each block joined with a space.
// Previously each block was a value in an array.

// "value000____value010_" will be returned
// for lineNo == 1
// "value001____value011_" will be returned
// for lineNo == 2
// "value001____________" will be returned

// these will be joined with \n hence:

// "value000____value010_
//  value001____value011_
//  value002____________"

// will be returned.
// this is the first row.

// The second row will be
// "value100____value110
//  ____________value111
