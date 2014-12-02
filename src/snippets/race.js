var my_fn = require('./my-fn'),
    done = false,
    array = Array.apply(null, {length: 10}) // create empty array
                 .map(Function.call, id); // populate array with random numbers

function callback(err, res) {
  console.log(res);
}

array.map(function(number) {
  my_fn(number, function counter(error, result) { // use my_fn on each number @\label{lst:race:after}@
    if (!done) { // If not already done @\label{lst:race:after}@
      done = true;
      if (!error) {
        callback(null, result); // execute callback @\label{lst:race:callback}@
      } else {
        // error handling @\label{lst:race:error}@
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