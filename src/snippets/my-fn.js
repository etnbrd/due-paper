var D = require('due');

module.exports = function my_fn(arg, continuation) {
  return new D(function(settle) {
    setImmediate(function() { // Simulate an asynchron operation
      var result = arg,
          err = null;

      if (continuation)
        continuation(err, result);

      settle(err, result);
    })
  })
}