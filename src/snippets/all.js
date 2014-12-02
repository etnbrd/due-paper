var my_fn = require('./my-fn'),
    n = 10,
    count = n,
    results = [],
    array = Array.apply(null, {length: n}) // create empty array
                 .map(Function.call, id); // populate array with random numbers

function callback(err, res) {
  console.log(res);
}

array.map(function(number) {
  my_fn(number, function counter(error, result) {
    results.push([error, result]);
    if (--count === 0) { // After all completed //@\label{lst:all:after}@
      if (!results.some(array_at(0))) {
        var sum = results.map(array_at(1))
                         .reduce(add, 0); // aggregate results
        callback(null, sum); // execute callback //@\label{lst:all:callback}@
      } else {
        // error handling //@\label{lst:all:error}@
        callback(results.map(array_at(0)));
      }

    }
  })
})

// Helpers

function add(a,b) {
  return a + b;
}

function array_at(n) {
  return function(a) {
    return a[n];
  }
}

function id() {
  return Math.floor(Math.random() * 1000);
}