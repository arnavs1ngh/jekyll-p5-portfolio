// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

function integrate(a,x0,y0,xa,xb,h,f){
  sum = 0
  x = xa
  while (xa <= xb) {
    xa = xa + (xb - x) / h;
    sum += 1/h * f(a,x0,y0,xa);
    // console.log(xa)
  }
  return sum

}




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

// console.log(compute_parameters(-120,300,300,400,400))

class Catenary {
  constructor(x1,y1,x2,y2,L) {
    // this.param = compute_parameters(x1,y1,x2,y2,L);
    // this.curve = getCatenary(this.param);
  }

  show(s1x,s1y,s2x,s2y){
    if (!this.curve) {

    stroke(200,0,0)
    line(FtoD(s1x,s1y).x,FtoD(s1x,s1y).y,FtoD(s2x,s2y).x,FtoD(s2x,s2y).y);

  } else {

  const num = 100
  const points = new Array(num)

  noFill();
  beginShape()
  stroke(0,0,255)
  for (var i = 0, step = (s2x-s1x)/num; i<= num; i++) {
    let x = s1x + i*step
    let y = this.curve(x)
    vertex(FtoD(x,y).x,FtoD(x,y).y);
  } 
  endShape();
  }
  }

  update(x1,y1,x2,y2,L){
    this.param = compute_parameters(x1,y1,x2,y2,L);
    // console.log(this.param)
    this.curve = getCatenary(this.param);
  }


  time(s2x){

    var s = (a,x0,y0,x) => Math.sinh((x-x0)/a);
    var c = (a,x0,y0,x) => Math.cosh((x-x0)/a);

    var i = (a,x0,y0,x) => Math.sqrt((1+s(a,x0,y0,x)**2)/2*(a*c(a,x0,y0,x)));
    // var i = (a,x0,y0,x) => Math.sqrt((1+s(a,x0,y0,x)**2)/(2*(a*c(a,x0,y0,x)+y0)));
    return(integrate(this.param.a,this.param.x0,this.param.yo,0,s2x,1000,i));
  }
  
   // integral from x1 to x2, this.curve
} 


