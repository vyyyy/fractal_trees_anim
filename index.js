window.onload = function() {
  // get canvas and context
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	// set canvas dimensions
	var width = canvas.width;
	var height = canvas.height;

 // set rate to be less than default 60fps
 var framesPerSecond = 20;

	// variables (properties of trunk) initialised with an empty array
	var length, divergence, reduction, line_width, start_points = [];

  // main function
	function init() {
		// canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);

		// length of the trunk
		length = 100 + Math.round(Math.random()*50);

		// width of the trunk
		line_width = 15;

		// angle at which branches diverge
		divergence = 10 + Math.round(Math.random()*60);

		// every branch will be 0.75times that of the previous one
		reduction = Math.round(5 + Math.random()*2)/10;

		// the end point of the trunk where smaller branches diverge
		var trunk = {x: width/2, y: length + 100, angle: 90};

		// empty the start points on every init();
		start_points = [];
		start_points.push(trunk);

		// draw fractal tree on canvas
		ctx.beginPath();
		ctx.moveTo(trunk.x, height-50);
		ctx.lineTo(trunk.x, height-trunk.y);
		ctx.strokeStyle = "orange";
		ctx.lineWidth = line_width;
		ctx.stroke();
		// call branches function
		branches();
	}

	// function to draw branches
	function branches() {
		// reducing line_width and length
		length = length * reduction;
		line_width = line_width * reduction;
		ctx.lineWidth = line_width;

		var new_start_points = [];
		ctx.beginPath();
		for(var i = 0; i < start_points.length; i++) {
			var sp = start_points[i];
			// 2 branches diverge at every start point
			var ep1 = get_endpoint(sp.x, sp.y, sp.angle+divergence, length);
			var ep2 = get_endpoint(sp.x, sp.y, sp.angle-divergence, length);

			// drawing the branches
			ctx.moveTo(sp.x, height-sp.y);
			ctx.lineTo(ep1.x, height-ep1.y);
			ctx.moveTo(sp.x, height-sp.y);
			ctx.lineTo(ep2.x, height-ep2.y);

			// recursive function to draw more branches
			ep1.angle = sp.angle+divergence;
			ep2.angle = sp.angle-divergence;

			new_start_points.push(ep1);
			new_start_points.push(ep2);
		}

		// set colour of branches
		if (length < 10) {
      ctx.strokeStyle = "silver";
    } else {
      ctx.strokeStyle = "gold";
    }

		ctx.stroke();
		start_points = new_start_points;

		// use rAF and set frame rate
    setTimeout(function() {
        if (length > 2) {
          window.requestAnimationFrame(branches);
        } else {
          window.requestAnimationFrame(init);
        }
    }, 1000 / framesPerSecond);

	}

  // this function will calculate the end points based on simple vectors
	function get_endpoint(x, y, a, length) {
		var epx = x + length * Math.cos(a*Math.PI/180);
		var epy = y + length * Math.sin(a*Math.PI/180);
		return {x: epx, y: epy};
	}

  // call the main function 
  	init();
}
