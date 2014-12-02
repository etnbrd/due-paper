// Identifier

new (function() {
  this.proof = "Identifier";
  console.log("Identifier ", this);

  var a = function() {
    console.log("Identifier ", this.proof);
  }

  setImmediate(a);
})()

// FunctionExpression

new (function() {
  this.proof = "FunctionExpression";
  console.log("FunctionExpression ", this);

  setImmediate(function() {
    console.log("FunctionExpression ", this.proof);
  });
})()


// CallExpression

// new (function() {
//   function factory() {
    
//     this.proof = "CallExpression";
//     console.log("CallExpression ", this);

//     return function() {
//       console.log("CallExpression ", this.proof);
//     }
//   }

//   setImmediate(factory());
// })()

// MemberExpression

new (function() {
  var a = {
    proof: "CallExpression",
    test: function() {  
      console.log("CallExpression ", this);
    },
    cb: function() {
      console.log("CallExpression ", this.proof);
    }
  }

  a.test();
  setImmediate(a.cb);
})()

// this

new (function() {
  function a() {
    setImmediate(this);
  }
})




// ArrowFunction







// YieldExpression







console.log('\n ------- \n');

