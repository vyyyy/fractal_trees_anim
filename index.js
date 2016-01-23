window.onload = function() {
  // get canvas and context
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	// set canvas dimensions
	var width = canvas.width;
	var height = canvas.height;

 // set rate to be less than default 60fps - <20 slow, >20 fast
       var framesPerSecond = 10;

	// variables (properties of trunk) initialised with an empty array
	var length, divergence, reduction, line_width, start_points = [];

  // main function
	function init() {
		// canvas
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, width, height);
		
 // let's draw the fractal tree by
		// calling the trunk function
		trunk();

		// calling the branches function
		branches();
	}
	
	function trunk() {
                // length of the trunk - range betwen 100 and 150 px
                length = 100 + Math.round(Math.random()*50);

		// width of the trunk
		line_width = 15;

		// angle at which individual branches diverge - range between 10 and 70 degrees
		divergence = 10 + Math.round(Math.random()*60);

		// every branch will be 0.75times that of the previous one
		reduction = Math.round(5 + Math.random()*2)/10;

		// branches diverge 90 degrees to the top point of the trunk - constant
		var trunk = {x: width/2, y: length + 100, angle: 90};

		// empty the start points on every init();
		start_points = [];
		start_points.push(trunk);

		// draw trunk on canvas
		ctx.beginPath();
		ctx.moveTo(trunk.x, height-50);
		ctx.lineTo(trunk.x, height-trunk.y);
		ctx.strokeStyle = "orange";
		ctx.lineWidth = line_width;
		ctx.stroke();
	}

	// function to draw branches
	function branches() {
		// reducing line_width and length
		length = length * reduction;
		line_width = line_width * reduction;
		ctx.lineWidth = line_width;

		// drawing the branches
		ctx.beginPath();
                var new_start_points = [];
		for(var i = 0; i < start_points.length; i++) {
			var sp = start_points[i];
			// 2 branches diverge at every start point
			var ep1 = get_endpoint(sp.x, sp.y, sp.angle+divergence, length);
			var ep2 = get_endpoint(sp.x, sp.y, sp.angle-divergence, length);

			// right hand branch
			ctx.moveTo(sp.x, height-sp.y);
			ctx.lineTo(ep1.x, height-ep1.y);
			// left hand branch
			ctx.moveTo(sp.x, height-sp.y);
			ctx.lineTo(ep2.x, height-ep2.y);

			// recursive function to draw more branches
			ep1.angle = sp.angle+divergence;
			ep2.angle = sp.angle-divergence;
                        
                        // push endpoints of both branches to array
			new_start_points.push(ep1);
			new_start_points.push(ep2);
		}
		
		// end point of a branch becomes the start point of another branch
		start_points = new_start_points;

		// set colour of branches
		if (length < 10) {
      // short branches
      ctx.strokeStyle = "silver";
    } else {
      // long branches
      ctx.strokeStyle = "gold";
    }
		// draw on the canvas
		ctx.stroke();

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
