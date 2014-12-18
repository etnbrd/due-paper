var my_fn = require('./my-fn');

var arg1 = 'b 1',
    arg2 = 'b 2',
    shared_identifier; //@\label{lst:du-seq:shared-identifier}@

my_fn(arg1)
.then(function ct1(err, res) { //@\label{lst:du-seq:ctdef1}@
  // //@\circled{1}@ ...//@\label{lst:du-seq:cm1}@
  shared_identifier = res + '>>';
  console.log(res);

  var v = my_fn(arg2); //@\label{lst:du-seq:ctdef2}@
  // //@\circled{2}@ ...//@\label{lst:du-seq:cm2}@
  return v; // return the promise from my_fn //@\label{lst:du-seq:ret}@
})
.then(function ct2(err, res) {
  console.log(shared_identifier + res);
});