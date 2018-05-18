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


// Inheritance
//------------

// create symetric matrix, where the value stored at x,y is always the same as that at y,x.
class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      if (x < y) return element(y, x);
      else return element(x, y);
    });
  }

  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      // sets also the symetrical value
      super.set(y, x, value);
    }
  }
}

// when x = 0 and y = 1, element(0, 1) will be replaced with element(1, 0)
// hence the content in these two keys will be the same

let symetrixMatrix = new SymmetricMatrix(3, (x, y) => `${x},${y}`);
console.log(symetrixMatrix);
// get method is inherited from it's superclass (Matrix)
console.log(symetrixMatrix.get(0, 1));
// → 1,0
console.log(symetrixMatrix.get(1, 0));
// → 1,0
// identical with the value at (0, 1)

symetrixMatrix.set(1, 0, 'updated symetric value');

// The use of the word extends indicates that this class shouldn’t be directly based
// on the default Object prototype, but on some other class. This is called the superclass.
// The derived class is the subclass.
//
// To initialize a SymmetricMatrix instance, the constructor calls its superclass’ constructor
// through the super keyword. This is necessary because if this new object is to behave (roughly)
// like a Matrix, it is going to need the instance properties that matrices have.
// In order to ensure the matrix is symmetrical, the constructor wraps the content method to swap
// the coordinates for values below the diagonal.
//
// The set method again uses super, but this time not to call the constructor, but to call a
// specific method from the superclass’ set of methods. We are redefining set but do want to use
// the original behavior. Because this.set refers to the new set method, calling that wouldn’t work.
// Inside class methods, super provides a way to call methods as they were defined in the superclass.



// instanceof operator
//--------------------

console.log(new SymmetricMatrix(5) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(5) instanceof Matrix);
// → true
console.log(new Matrix(5, 5) instanceof SymmetricMatrix);
// → false
console.log(new SymmetricMatrix(5) instanceof Object);
// → true
console.log([1, 3] instanceof Array);
// → true
