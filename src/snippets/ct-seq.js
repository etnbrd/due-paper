var my_fn = require('./my-fn');

var arg1 = 'a 1',
    arg2 = 'a 2';

my_fn(arg1, function ct1(err, res) { //@\label{lst:cb-seq:ct1}@
  // //@\circled{1}@ ...//@\label{lst:ct-seq:cm1}@
  var shared_identifier = res + '>>'; //@\label{lst:ct-seq:shared-identifier}@
  console.log(res);

  my_fn(arg2, function ct2(err, res) { //@\label{lst:ct-seq:ct2}@
    console.log(shared_identifier + res);
  }); 
  // //@\circled{2}@ ...//@\label{lst:ct-seq:cm2}@
});