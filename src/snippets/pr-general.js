var my_fn = require('./my-fn');

var callback = function(err, res) {
      console.log(res);
    },
    arg = '1';

var __cb = undefined;
function __cb_def(cb) {
  __cb = cb;
  return undefined;
}
// ...
my_fn(arg, __cb_def(callback))
.then(function() { // onFulfill //@\label{lst:pr-simple:onFulfill}@
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift(null);
  return __cb.apply(this, args); //@\label{lst:pr-simple:fulfill}@
}, function() { // onRject //@\label{lst:pr-simple:onReject}@
  return __cb.apply(this, Array.prototype.slice.call(arguments, 0)); //@\label{lst:pr-simple:reject}@
});