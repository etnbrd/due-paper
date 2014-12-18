var my_fn = require('./my-fn');

var arg = '1'; 

function continuation(err, res) {
  console.log(res);
}

my_fn(arg, continuation);