var P = require('../src');

describe('SimplePromise', function(){
  it('should fulfill synchronously', function(done){
    var p = new P(function(fulfill, reject) {
        fulfill("result");
    })

    p.then(function(result) {
      if (result === "result")
        done();
    })
  })

  it('should fulfill asynchronously', function(done){
    var p = new P(function(fulfill, reject) {
        setImmediate(function() {
          fulfill("result")
        });
    })

    p.then(function(result) {
      if (result === "result")
        done();
    })
  })

  it('should reject synchronously', function(done){
    var p = new P(function(fulfill, reject) {
        reject("error");
    })

    p.then(undefined, function(error) {
      if (error === "error")
        done();
    })
  })

  it('should reject asynchronously', function(done){
    var p = new P(function(fulfill, reject) {
        setImmediate(function() {
          reject("error")
        });
    });

    p.then(undefined, function(error) {
      if (error === "error")
        done();
    })
  })

  it('should cascade synchronously', function(done){
    var p = new P(function(fulfill, reject) {
      fulfill("result");
    })

    p.then(function(result) {
      return new P(function(fulfill, reject) {
        fulfill("result2");
      });
    }).then(function(result) {
      if (result === "result2")
        done();
    })
  })

  it('should cascade asynchronously', function(done){
    var p = new P(function(fulfill, reject) {
      setImmediate(function() {
          fulfill("result")
      });
    })

    p.then(function(result) {
      return new P(function(fulfill, reject) {
        setImmediate(function() {
          fulfill("result2")
        });
      });
    }).then(function(result) {
      if (result === "result2")
        done();
    })
  })

  it('should allow multiple then to same synchronous promise', function(done){
    var p = new P(function(fulfill, reject) {
      fulfill("result")
    })

    var count = 0;

    var then = function(result) {
      if (result === 'result' && ++count === 2)
        done()
    }

    p.then(then);
    p.then(then);
  })

  it('should allow multiple then to same asynchronous promise', function(done){
    var p = new P(function(fulfill, reject) {
      setImmediate(function() {
          fulfill("result")
      });
    })

    var count = 0;

    var then = function(result) {
      if (result === 'result' && ++count === 2)
        done()
    }

    p.then(then);
    p.then(then);
  })
  // Multiple then call to the same promise
})