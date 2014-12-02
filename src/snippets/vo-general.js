var my_fn = require('./my_fn').async;

var arg = '1';

function callback(err, res) {
  console.log(res);
}

var __cb = undefined;
function __cb_def(cb) {
  __cb = cb;
  return undefined;
}

my_fn(arg, __cb_def(callback))
.then(function() { // onFulfill //@\label{lst:pr-simple:onFulfill}@
  return __cb.apply(this, arguments); //@\label{lst:pr-simple:fulfill}@
});