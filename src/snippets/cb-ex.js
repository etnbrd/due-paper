var my_fn = require('./my-fn');

var arg = '1';

my_fn(arg, function callback(err, res) {
  console.log(res);
});