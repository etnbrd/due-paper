var my_fn = require('./my_fn');

var arg = '1';

my_fn(arg)
.then(function continuation(err, res) {
  console.log(res);
});