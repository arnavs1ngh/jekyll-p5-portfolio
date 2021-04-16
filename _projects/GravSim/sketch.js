
let R = 200;
let planets = [];
let slider;
let n = 8
let a = 0.4

function setup() {
	var canvas = createCanvas(windowWidth,windowHeight);
	canvas.parent('sketch-holder')
	
	background(10);

	// slider = createSlider(1,100,4,1);
	// slider.position(10,10);

	// let n = slider.value();
	vel = createVector(0,0)
	planets.push(new Planet((windowWidth/2),(windowHeight/2),vel,100))

	for (var i = 0; i < n; i++) {
		vel = createVector(a*cos(2*PI*i/n + PI/2), a*sin(2*PI*i/n + PI/2))
		// console.log(vel)
		planets.push(new Planet((R*cos(2*PI*i/n)+windowWidth/2),(R*sin(2*PI*i/n)+windowHeight/2),vel,1))
	}

	

}

function draw() {
	// background(60);

	// let gravity  = createVector(0,0.2)

	for (let a = 0; a < planets.length; a++) {
    	for (let b = 0; b < planets.length; b++) {
      		planets[a].calculateForce(planets[b]);
	    }
	}		
	for (const planet of planets) {
	    planet.applyForce();
	    planet.update()
	    planet.show();
	  }
		

	// for (let planet of planets) {
	//     // let gravity = createVector(0, 0.2);
	//     // planet.applyForce(gravity);
	//     planet.update();
	//     planet.show();
	// }

}

