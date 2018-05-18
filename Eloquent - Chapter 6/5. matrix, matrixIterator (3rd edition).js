class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

let matrix = new Matrix(3, 3, (x, y) => `value ${x},${y}`)
console.log(matrix);

matrix.set(2,2,'updated value');
console.log(matrix.get(2, 2));

// matrix is not yet iterable
// if I try and loop over a for of loop, it will return an error.

// However, I can loop over it's content as it is an array:
// for (let value of matrix.content) {
//   console.log(value);
// }


// The object given to a for/of loop is expected to be iterable. This means that
// it has a method named with the Symbol.iterator symbol (a symbol value defined by
// the language, stored as a property of the Symbol function).
// When called, that method should return an object that provides a second interface, iterator.
// This is the actual thing that iterates. It has a next method that returns the next result.
// That result should be an object with a value property, providing the next value,
// if there is one, and a done property which should be true when there are no more
// results and false otherwise.


class MatrixIterator {
  // creates another matrix [instance of MatrixIterator] so that it will be used by the next method.
  // matrix is passed when an instance of Matrix is first created (via the Matrix constructor).
  // MatrixIterator also defines the x and y, which will also be used by next()
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {
      x: this.x,
      y: this.y,
      value: this.matrix.get(this.x, this.y),
    };
    // increments x or y after the value is defined
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}


//since Symbol.iterator is a method it has to be defined as function.
Matrix.prototype[Symbol.iterator] = function() {
  // 'this' is the instance object (the matrix) created with the Matrix class.
  // we pass it in the instance object that will be created
  // via the MatrixIterator class.
  return new MatrixIterator(this);
};

// the Symbol.iterator is now in the prototypes of matrix:
console.log(matrix);

// the next result in the for of loop is the value property value: {x, y, value}
// which belongs to the object {value: {x, y, value}, done}
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}

let matrixIterator = matrix[Symbol.iterator]();
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
console.log(matrixIterator.next());
