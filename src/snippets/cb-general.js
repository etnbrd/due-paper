var my_fn = require('./my-fn');

var arg = '1'; 

function callback(err, res) {
  console.log(res);
}

my_fn(arg, callback);