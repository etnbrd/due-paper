var i2l = ['d', 'w', 'r'];
var l2i = { d: 0, w: 1, r: 2};

function duplicate(u) {

  function _dupl(c, i) {
    
    var a = c.slice(0);
    var b = c.slice(0);

    a[i] = '_';
    b[i] = i2l[i];

    return [a, b];

  }

  return [0, 1, 2].reduce(function(res, i) {
    return res.reduce(function(_res, u) {
      if (u[i] === '*') {
        return _res.concat(_dupl(u, i));
      } else {
        _res.push(u);
      }
      return _res;
    }, []);
  }, [u])
}


function gen(upstream, downstream) {
  var u = upstream.split(','),
      d = downstream.split(',');

  var _u = duplicate(u),
      _d = duplicate(d);

  return Array(_u.length).join().split(',').reduce(function(res, _, i) {
    Array(_d.length).join().split(',').forEach(function(_, j) {
      res.push({
        u: _u[i].toString(','),
        d: _d[j].toString(',')
      });
    })

    return res;
  }, []);
}

function match(a, b) {
  return a.u === b.u && a.d === b.d;
}

function concat(a, b) {
  return a.slice(0).concat(b.filter(function(_b) {
    return !a.some(function(_a) {
      return match(_a, _b);
    })
  }))
}

function exclude(a, b) { // exclude a from b
  return b.filter(function(_b) {
    return !a.some(function(_a) {
      return match(_a, _b);
    })
  })
}

var ALL = gen('*,*,*', '*,*,*')

var NULL = gen('_,_,_', '_,_,_');
var SIMPLE = concat(gen('*,*,*', '_,_,_'), gen('_,_,_', '*,*,*'));
var OVERDECLARED = concat(gen('_,*,*', 'd,*,*'), gen('d,*,*', 'd,*,*'));

var DREAD = concat(gen('*,w,*', '_,_,r'), gen('d,_,*', '_,_,r'));
var BREAD = gen('_,_,r', '_,_,r');

var DWRITE = gen('d,_,_', '_,w,*');
var BWRITE = gen('*,w,*', '_,w,*');

var REVERSE = gen('*,_,r', '_,w,*');

var KNOWN = concat(NULL,
            concat(SIMPLE,
            concat(OVERDECLARED,
            concat(DREAD,
            concat(BREAD,
            concat(DWRITE,
            concat(BWRITE,
                   REVERSE)))))));


var notSharing = concat(NULL,
                 concat(SIMPLE,
                        OVERDECLARED));

var send = concat(DREAD, BREAD);

var store = DWRITE;

var notIndependent = concat(BWRITE, REVERSE);

var known = concat(notSharing,
            concat(send,
            concat(store,
                   notIndependent)));

// console.log("All cases\t\t ", ALL.length);

// console.log('---');

// console.log("NULL ", NULL.length);
// console.log("SIMPLE ", SIMPLE.length);
// console.log("OVERDECLARED ", OVERDECLARED.length);
// console.log("DREAD ", DREAD.length);
// console.log("BREAD ", BREAD.length);
// console.log("DWRITE ", DWRITE.length);
// console.log("BWRITE ", BWRITE.length);
// console.log("REVERSE ", REVERSE.length);

// console.log('---');

// console.log("KNOWN ", KNOWN.length);

// console.log('---');

// console.log("UNKNOWN ", exclude(KNOWN, ALL));





console.log('All ', known.length);

console.log(' --- ');

console.log('Not sharing\t\t', notSharing.length);
console.log('Send value downstream\t', send.length);
console.log('Store value downstream\t', store.length);
console.log('Not Independent\t\t', notIndependent.length);

console.log(' --- ');

var metaAll = [notSharing, send, store, notIndependent];
var names = ['Not sharing', 'Send', 'Store', 'Not Independent'];

metaAll.forEach(function(a, i) {
  metaAll.forEach(function(b, j) {
    if (i < j
    && ((a.length - exclude(b, a).length) > 0
     || (b.length - exclude(a, b).length) > 0 )) {

      console.log(names[i] + ' / ' + names[j]);
      console.log(exclude(concat(exclude(a, b), exclude(b, a)), b));

      console.log(' --- ');

    }
  })
})


function generateUseCase(combi) {

  ulines = {
    d: 'var my_var;\n',
    w: 'my_var = "some_value";\n',
    r: 'my_var ? true : false;\n',
    _: ''
  }

  dlines = {
    d: 'var my_var;\n',
    w: 'my_var = "some_value";\n',
    r: 'res.send(my_var);\n',
    _: ''
  }



  var u = combi.u.split(',').map(function(c) { return ulines[c]}).join('');
  var d = combi.d.split(',').map(function(c) { return dlines[c]}).join('');

  return [
    'Upstream : ' + combi.u + ' / Downstream : ' + combi.d,
    '',
    'var app = require(\'express\');',
    u,
    'app.get(\'/\'function(req, res){',
    '  ' + d.replace(/\n(?!$)/g, '\n  ') + '});',
    '',
    'app.listen(8080);'
  ].join('\n');
}





// store.map(generateUseCase).forEach(function(str) {
//   console.log(str);
//   console.log('\n --- \n');
// });



console.log('Overdelcaration')
console.log(generateUseCase({u:'d,w,_', d:'d,w,r'}));
console.log('');

console.log('Send')
console.log(generateUseCase({u:'d,w,_', d:'_,_,r'}));
console.log('');

console.log('Store')
console.log(generateUseCase({u:'d,_,_', d:'_,w,r'}));
console.log('');

console.log('Dependent')
console.log(generateUseCase({u:'d,_,r', d:'_,w,r'}));
console.log('');