//time counter for operations
function Timer(){
	var t0 = 0, tf = 0;
	this.start = function(){
		t0 = new Date().getTime();
		return this;
	};
	this.end = function(){
		tf = new Date().getTime();
		return this;
	};
	this.dt = function(){
		return tf-t0;
	};
}



//@description: find 2 values (a,b) such that f(a)/f(b) <= 0.
//					starting from point x0, values a and b are progressively incremented/decremented by dx
//					until f(a)<=0 and f(b)>=0, or viceversa
//@params:	a function,
//				start point (optional -> 0.1),
//				steps width when going far away of the initial point (optional -> 0.05)
//				other inline params will be passed to the function after parameter a (or b)
//@return: false on error, 2d array on success.
function tryToFindIntervalForBisection(func,x0,dx){
	
	if (x0 === undefined) x0 = 0.1;
	if (dx === undefined) dx = 0.05;
	console.log(arguments)
	
	var args1 = [x0],
		args2 = [x0];
	if (arguments.length > 3){
		args1 = args1.concat( Array.prototype.slice.call(arguments, 3) );
		args2 = args2.concat( Array.prototype.slice.call(arguments, 3) );
	}
	
	var a,b,
		fa,fb,
		iter=0, maxiter=1000;
	a = b = x0;
	fa = fb = func.apply(null,args1);
	
	while (
		( (fa!==0 && fb/fa > 0) || (fb!==0 && fa/fb > 0) ) &&
		iter++ < maxiter
	){
		//increment range by -dx,+dx
		args1[0] = x0 - iter*dx;
		args2[0] = x0 + iter*dx;
		fa = func.apply(null,args1);
		fb = func.apply(null,args2);
	}
	
	if (fa!==0 && fb/fa > 0) return false;
	if (fb!==0 && fa/fb > 0) return false;
	return [x0 - iter*dx, x0 + iter*dx];
}



//@description: get the root of any function around a guess point (x0)
//					initial point and next points must be in the valid range of function inputs
//@params:	function (f),
//				guess point (x0)
//				step width (see tryToFindIntervalForBisection() )
//				tollerance
//				any other inline param will be passed to the function along with the guess point.
function getRootOf(f, x0, dx, tol){
	
	var interval = tryToFindIntervalForBisection.apply(null,
		[f, x0, dx]
			.concat( Array.prototype.slice.call(arguments, 4) )
	);
	if (interval === false){
		console.warn("Couldn't find valid interval for bisection function.");
		return false;
	}
	console.log("interval: "+interval[0]+', '+interval[1]);
	
	var res = bisection.apply(null,
		[f, interval[0], interval[1], tol]
			.concat( Array.prototype.slice.call(arguments, 4) )
	);
	
	return res;
	
}


//------------------
//test-time!
//------------------
function absurdFunction(x,y,z){
	return x*x-(y-1)*(y-1)/z;
}

//giving everything
console.info("start point: 0.1, increment: 0.2, toll.: 1e-18")
var test = getRootOf(
	//function to find root
	absurdFunction,
	//parameter:
	// * guess point,
	// * increment to find two values of opposite sign,
	// * tollerance
	0.1, 0.2, 1e-18,
	//this ones are the last 2 variables for absurdFunction(x,y,z)
	0, 1);

//automatic
console.info("start point: 0.5, increment: auto, toll.: auto")
var test2 = getRootOf(
	absurdFunction,
	0.5, undefined, undefined,
	0, 1);