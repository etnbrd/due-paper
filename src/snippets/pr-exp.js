var my_fn = require('./my-fn'),
    arg = '1';

my_fn(arg).then(function(res) { // resolve
  return (function callback(err, res) {
    console.log(res);
  })(null, res);
}, function(reason) { // reject
  return (function callback(err, res) {
    console.log(res);
  })(reason);
});

