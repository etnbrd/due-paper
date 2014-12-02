var my_fn = require('./my-fn');

var arg1 = 'b 1',
    arg2 = 'b 2';

my_fn(arg1)
.then(function cb1(err, res) { //@\label{lst:pr-seq:cbdef1}@
  // //@\circled{1}@ ...//@\label{lst:cb-seq:cm1}@
  console.log(res);

  var v = my_fn(arg2); //@\label{lst:pr-seq:cbdef2}@
  // //@\circled{2}@ ...//@\label{lst:cb-seq:cm2}@
  return v; // return the promise from my_fn //@\label{lst:pr-seq:ret}@
})
.then(function cb2(err, res) {
  console.log(res);
});