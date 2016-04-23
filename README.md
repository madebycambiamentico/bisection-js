# bisection-js
simple 1D bisection function (to find roots of equations)

call to *getRootOf()* return *NaN* if no point founded, or root value otherwise.
```
number|NaN getRootOf(
	function f[,
	number guessPoint[,
	number tollerance[,
	<other function f parameters...>]]]
	)
```

Example: find root of *5 a - 3 b = -c*, where *b = 3* and *c = 2.5*. *getRootOf* should return value of *a*.
```
function anyFunction(a,b,c){
  return 5*a-3*b+c
}

var test = getRootOf(
	//function
	anyFunction,
	//parameters:
	// * guess point
	// * increment to find two values of opposite sign
	// * tollerance
	0.1, 0.2, 1e-18,
	//this ones are the last 2 variables (b,c) of anyFunction
	3, 2.5);
```

if parameters of *getRootOf* are *undefined*, the default values are:
- guess point: 0
- increment: 0.1
- tollerance: 1e-4
