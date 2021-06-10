function fk(k, b, x) {
  return (Math.sinh(k * (1 - b)) - Math.sinh(k * (-1 - b))) / k - x;
}

function fb(k, b, y) {
  return (Math.cosh(k * (1 - b)) - Math.cosh(k * (-1 - b))) / k - y;
}

function distance([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function compute_b(k, b, y) {
  let b1 = b + 1;
  let f0 = fb(k, b , y);
  let f1 = fb(k, b1, y);
  let g;
  
  let steps = 0;
  
  while (Math.abs(b1 - b) > 0.00001 && steps < 20) {
    g  = b - f0 * (b1 - b) / (f1 - f0);
    f1 = f0;
    b1 = b;
    b  = g;
    f0 = fb(k, b, y);
    steps++
  }
  return b
}

function compute_k(k, b, x) {
  let k1 = k + 1;
  let f0 = fk(k , b, x);
  let f1 = fk(k1, b, x);
  let g;
  
  let steps = 0;
  
  while (Math.abs(k1 - k) > 0.00001 && steps < 20) {
    g = k - f0 * (k1 - k) / (f1 - f0);
    if (g < 0) {
      g = -g
    }
    f1 = f0;
    k1 = k;
    k  = g;
    f0 = fk(k, b, x);
    
    steps++
  }
  return k
}

function compute_parameters(x1, y1, x2, y2,length) {
  
  if (distance([x1, y1], [x2, y2]) > length) {
    return undefined;
  }
    
  const x = (x2 - x1) / 2;
  const y = (y2 - y1) / x;
    
  let b = 0, k = 1, steps = 100;
  let _b, _k;
    
  do {
    
    _b = compute_b(k, b, y);
    _k = compute_k(k, b, length / x);
    
    if (Math.abs(b - _b) < 0.00001 && Math.abs(k - _k) < 0.00001) {
      break;
    }
    
    b = _b;
    k = _k;
    --steps;
    
  } while (steps > 0);
  
  const a = x / _k;
  const x0 = (x1 + x2) / 2 + _b * x;
  const y0 = y1 - a * Math.cosh((x1 - x0) / a);
  
  return { a, x0, y0 }
  
}

getCatenary = (parameters) => {
    if (parameters) {
      const {a, x0, y0} = parameters;
      return x => a * Math.cosh((x - x0) / a) + y0;
    }
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  // console.log(compute_parameters(0,0,1,1,2.5))
  shape1 = new Draggable(-200,-120,10,10)
  shape2 = new Draggable(300,400,10,10)

  // ball1 = new Ball(300,400,10)

}

function draw() { 
  background(255);
  translate(windowWidth/2,windowHeight/2)
  rotate(PI)

  stroke(0)
  line(-0.45*windowWidth,0,0.45*windowWidth,0)
  line(0,-0.45*windowHeight,0,0.45*windowHeight)

  shape1.over();
  shape1.update();
  shape1.show();
  shape2.over();
  shape2.update();
  shape2.show();

  

  const parameters1 = compute_parameters(shape1.x, shape1.y, shape2.x, shape2.y,0.7*Math.sqrt(windowWidth**2+windowHeight**2));
  const catenary1 = getCatenary(parameters1)

  // ball1.calculateForce(parameters1.x0,parameters1.a);
  // ball1.update();
  // ball1.show();

  const parameters2 = compute_parameters(shape1.x, shape1.y, shape2.x, shape2.y,0.6*Math.sqrt(windowWidth**2+windowHeight**2));
  const catenary2 = getCatenary(parameters2);
  const parameters3 = compute_parameters(shape1.x, shape1.y, shape2.x, shape2.y,0.5*Math.sqrt(windowWidth**2+windowHeight**2));
  const catenary3 = getCatenary(parameters3);

  // console.log(parameters)
  if (!catenary3) {

  	stroke(200,0,0)
  	line(shape1.x,shape1.y,shape2.x,shape2.y)

  } else {

	const num = 100
	const points = new Array(num)

	noFill();
	beginShape()
	stroke(0,255,0)
	for (var i = 0, step = (shape2.x-shape1.x)/num; i<= num; i++) {
		let x = shape1.x + i*step
	  	let y = catenary3(x)
	  	vertex(x,y)
	  }	
	endShape();
	}

  if (!catenary2) {

  	stroke(200,0,0)
  	line(shape1.x,shape1.y,shape2.x,shape2.y)

  } else {

	const num = 100
	const points = new Array(num)

	noFill();
	beginShape()
	stroke(0,0,255)
	for (var i = 0, step = (shape2.x-shape1.x)/num; i<= num; i++) {
		let x = shape1.x + i*step
	  	let y = catenary2(x)
	  	vertex(x,y)
	  }	
	endShape();
	}

  if (!catenary1) {

  	stroke(200,0,0)
  	line(shape1.x,shape1.y,shape2.x,shape2.y)

  } else {

	const num = 100
	const points = new Array(num)

	noFill();
	beginShape()
	stroke(255,100,0)
	for (var i = 0, step = (shape2.x-shape1.x)/num; i<= num; i++) {
		let x = shape1.x + i*step
	  	let y = catenary1(x)
	  	vertex(x,y)
	  }	
	endShape();
	}


	
}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
}

