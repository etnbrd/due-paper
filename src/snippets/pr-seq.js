var my_fn = require('./my-fn');

var arg1 = 'b 1',
    arg2 = 'b 2';

function cb2(err, res) {
  console.log(res);
}

var __cb = [],
    __promise = undefined;
function __cb_def(cb) {
  __cb.push(cb);
  return undefined;
}

my_fn(arg1, __cb_def(function cb1(err, res) { //@\label{lst:pr-seq:cbdef1}@
  // //@\circled{1}@ ...
  console.log(res);

  __promise = my_fn(arg2, __cb_def(cb2)); //@\label{lst:pr-seq:cbdef2}@
  // //@\circled{2}@ ...
  return __promise; // return the promise from my_fn //@\label{lst:pr-seq:retpr}@
})).then(function onFulfill1() { // onFulFill b 1 //@\label{lst:pr-seq:onFulfill1}@
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift(null);
  return __cb.shift().apply(this, args); //@\label{lst:pr-seq:fulfill1}@
}, function onReject1() { // onReject //@\label{lst:pr-seq:onReject1}@
  return __cb.shift().apply(this, Array.prototype.slice.call(arguments, 0)); //@\label{lst:pr-seq:reject1}@
})
.then(function onFulfill2() { // onFulFill b 2 //@\label{lst:pr-seq:onFulfill2}@
  var args = Array.prototype.slice.call(arguments, 0);
  args.unshift(null);
  return __cb.shift().apply(this, args); //@\label{lst:pr-seq:fulfill2}@
}, function onReject2() { // onReject //@\label{lst:pr-seq:onReject2}@
  return __cb.shift().apply(this, Array.prototype.slice.call(arguments, 0)); //@\label{lst:pr-seq:reject2}@
});