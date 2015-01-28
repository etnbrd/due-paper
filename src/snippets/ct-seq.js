var my_fn = require('./my-fn');

var arg1 = 'A',
    arg2 = 'B';

my_fn(arg1, function cont1(err, res) { //@\label{lst:ct-seq:cont1}@
  var shared_identifier = '>> ' + res; //@\label{lst:ct-seq:shared-identifier}@
  my_fn(arg2, function cont2(err, res) { //@\label{lst:ct-seq:cont2}@
    console.log(shared_identifier + ', ' + res);
  });
});