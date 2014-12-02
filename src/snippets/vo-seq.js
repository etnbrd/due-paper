var my_fn = require('./my-fn');

var arg1 = 'b 1',
    arg2 = 'b 2',
    shared_identifier; //@\label{lst:vo-seq:shared-identifier}@

my_fn(arg1)
.then(function cb1(err, res) { //@\label{lst:vo-seq:cbdef1}@
  // //@\circled{1}@ ...//@\label{lst:vo-seq:cm1}@
  shared_identifier = res + '>>';
  console.log(res);

  var v = my_fn(arg2); //@\label{lst:vo-seq:cbdef2}@
  // //@\circled{2}@ ...//@\label{lst:vo-seq:cm2}@
  return v; // return the promise from my_fn //@\label{lst:vo-seq:ret}@
})
.then(function cb2(err, res) {
  console.log(shared_identifier + res);
});