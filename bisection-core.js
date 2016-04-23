//bisezione per funzioni 1-dimensionali
function bisection(func,a,b, tol){
	
	var time = new Timer();
	
	if (tol === undefined || tol<=0) tol = 1e-4;
	var args = [0];
	if (arguments.length > 4) args = args.concat(  Array.prototype.slice.call(arguments, 4) );
	//console.log(args);
	
	time.start();
	
	var c,
		fa,fb,fc,
		iter=0, maxiter=1000;
	
	//x0 < x1...
	if (b<a){
		c = a;
		a = b;
		b = c;
	}
	
	args[0] = a;
	fa = func.apply(null,args);
	args[0] = b;
	fb = func.apply(null,args);
	//console.log(args);
	if (fa/fb > 0){
		console.warn("f(a)/f(b) > 0!!!");
		return NaN;
	}
	if (!fa){
		console.log("No need to bisect: already found value such that f(a) = 0\n"+
			"result: "+a);
		return a;
	}
	if (!fb){
		console.log("No need to bisect: already found value such that f(b) = 0\n"+
			"result: "+b);
		return b;
	}
	fc = 1;
	
	//maximum error at i-th iteration:
	//ε_max_i = |b-a| / 2^iter
	//so iter_min = ( log(|b-a|) - log(ε_max) ) / log(2)
	var expectedIterations = Math.ceil( (Math.log(Math.abs(b-a))-Math.log(tol))/Math.log(2) );
	console.log("Expected number of iterations for convergence: "+expectedIterations);
	
	while (
			fc !== 0 &&
			Math.abs(b-a) > tol &&
			iter++ < maxiter){
		//use halved value (c)
		args[0] = c = (b+a)/2;
		fc = func.apply(null,args);
		/*console.log(
			'a: '+a+' -> '+fa+"\n"+
			'b: '+b+' -> '+fb+"\n"+
			'halved c: '+c+' -> '+fc);*/
		if (fc/fa > 0){
			if (fc/fb > 0){
				console.warn("Interval has more than 1 root, cannot use bisection!");
				return NaN
			}
			else{
				//since fc/fb <= 0 then set interval between c and b
				a = c;
				fa = fc;
			}
		}
		else{
			//since fc/fa <= 0 then set interval between a and c
			b = c;
			fb = fc;
		}
	}
	
	//if fc == 0 then we have the pure root!
	
	time.end();
	
	console.log(
		"result: "+ c +"\n"+
		"error: "+(fc ? Math.abs(b-a) : "(none)")+' after '+iter+' iterations, in '+time.dt()+'ms');
	return c;
}





/*

//example 1:
console.info("root of -x^2+1+y=0 where y=0.5 and x between 0.1 and 2.1")
bisection(
	function(x,y){return -x*x+1+y},
	0.1, 2.1,
	1e-19,
	0.5);
//edge case when bisection intersect the true value of root
console.info("root of -x^2+1+y=0 where y=0 and x between 0 and 4")
bisection(
	function(x,y){return -x*x+1+y},
	0, 4,
	1e-19,
	0);

//example 2: first fail since f(a) > 0 and f(b) > 0
console.info("root of cos(x)^3-sin(x)=0 where x between 0.1 and 0.5")
bisection(
	function(x){return Math.pow(Math.cos(x),3)-Math.sin(x)},
	0.1, 0.5,
	1e-19);
//second try: change interval
console.info("root of cos(x)^3-sin(x)=0 where x between 0.1 and 1.1")
bisection(
	function(x){return Math.pow(Math.cos(x),3)-Math.sin(x)},
	0.1, 1.1,
	1e-19);

*/