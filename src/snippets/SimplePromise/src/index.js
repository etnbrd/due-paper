function Promise(fn) {

  var self = this;
  var settle = function(settlement) {
    return function() {
      self.__status = settlement;
      self.__value = arguments;
      self.__resolve();
    }
  };

  this.isPromise = true;
  this.__status = 'pending';
  this.__then = [];
  this.__thenable = [];

  this.__resolve = function() {
    if (self.__status !== 'pending') {
      self.__next = self.__then.map(function(then) {
        return then[self.__status].apply(null, self.__value);
      }).filter(function(next) {
        return next && next.isPromise;
      })

      self.__thenable.forEach(function(thenable) {
        self.__next.forEach(function(next) {
          if (next && next.isPromise) {
            next.__defer.apply(next, thenable);
          }
        })
      });
    }
  }

  this.__defer = function(onfulFIll, onReject) {
    this.__then.push({
      fulfilled: onFullfill,
      rejected: onReject
    });
  }

  fn(settle('fulfilled'), settle('rejected'));
}

Promise.prototype.then = function(onFullfill, onReject) {
  this.__defer(onFullfill, onReject);
  this.__resolve();

  var self = this;
  return new Promise(function(fulfill, reject) {
    if (self.__status !== 'pending'
    &&  self.__next
    &&  self.__next.every(function(next) {
      return next.__status !== 'pending'
    })) {
      self.__next.forEach(function(next) {
        if (next.__status == 'fulfilled')
          fulfill.apply(null, next.__value);
        else if (next.__status === 'rejected')
          reject.apply(null, next.__value);
      })
    } else {
      self.__thenable.push([fulfill, reject]);
    }
  }, 'thenable');
}

module.exports = Promise;