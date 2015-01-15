var D = require('due');

module.exports = {
  sync: function(arg, continuation) {
    return new D(function(settle) {
      var result = arg,
          err = null;

      if (continuation)
        continuation(err, result);
      
      settle(err, result);
    })
  },

  async: function(arg, continuation) {
    return new D(function(settle) {
      setImmediate(function() {
        var result = arg,
            err = null;

        if (continuation)
          continuation(err, result);

        settle(err, result);
      })
    })
  }
}