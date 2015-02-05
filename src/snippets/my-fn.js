var Due = require('due');

module.exports = function my_fn(arg, continuation) {
  return new Due(function deferred(settle) {
    setImmediate(function cont() { // Simulate an asynchron operation
      var result = arg,
          err = null;

      if (continuation)
        continuation(err, result);

      settle(err, result);
    })
  })
}