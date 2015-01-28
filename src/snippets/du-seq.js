var my_fn = require('./my-fn');

var arg1 = 'A',
    arg2 = 'B',
    shared_identifier; //@\label{lst:du-seq:shared-identifier}@

my_fn(arg1)
.then(function cont1(err, res) { //@\label{lst:du-seq:ctdef1}@
  shared_identifier = '>> ' + res;
  return my_fn(arg2); //@\label{lst:du-seq:ret}@
})
.then(function cont2(err, res) { //@\label{lst:du-seq:ctdef2}@
  console.log(shared_identifier + ', ' + res);
});