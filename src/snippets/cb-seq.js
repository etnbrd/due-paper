var my_fn = require('./my-fn');

var arg1 = 'a 1',
    arg2 = 'a 2';

my_fn(arg1, function cb1(err, res) { //@\label{lst:cb-seq:cb1}@
  // //@\circled{1}@ ...//@\label{lst:cb-seq:cm1}@
  var shared_identifier = res + '>>'; //@\label{lst:cb-seq:shared-identifier}@
  console.log(res);

  my_fn(arg2, function cb2(err, res) { //@\label{lst:cb-seq:cb2}@
    console.log(shared_identifier + res);
  }); 
  // //@\circled{2}@ ...//@\label{lst:cb-seq:cm2}@
});