var V = require('./Vow/src');

module.exports = {
  sync: function(arg, callback) {
    return new V(function(settle) {
      var result = arg,
          err = null;

      if (callback)
        callback(err, result);
      
      settle(err, result);
    })
  },

  async: function(arg, callback) {
    return new V(function(settle) {
      setImmediate(function() {
        var result = arg,
            err = null;

        if (callback)
          callback(err, result);

        settle(err, result);
      })
    })
  }
}