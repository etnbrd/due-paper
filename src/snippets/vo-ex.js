var my_fn = require('./my_fn').async;

var arg = '1';

my_fn(arg)
.then(function callback(err, res) {
  console.log(res);
});