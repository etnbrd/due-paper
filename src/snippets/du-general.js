var my_fn = require('./my_fn').async;

var arg = '1';

function continuation(err, res) {
  console.log(res);
}

var __ct = undefined;
function __ct_def(ct) {
  __ct = ct;
  return undefined;
}

my_fn(arg, __ct_def(continuation))
.then(function() { // onFulfill //@\label{lst:pr-simple:onFulfill}@
  return __ct.apply(this, arguments); //@\label{lst:pr-simple:fulfill}@
});