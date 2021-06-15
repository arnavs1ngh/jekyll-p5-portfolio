let cnum = 20
let jump = 0.01
let initial = 1 + jump

function FtoD(x,y) { 
  // function to display space
  x = x + windowWidth/2;
  y = -y + windowHeight/2;
  return {x, y}
}
function DtoF(x,y) {
  // display space to function
  x = x - windowWidth / 2;
  y = -y + windowHeight/2;
  return {x,y}
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  // console.log(compute_parameters(0,0,1,1,2.5))

  shape1 = new Draggable(FtoD(0,0).x,FtoD(0,0).y);
  shape2 = new Draggable(FtoD(450,-450).x,FtoD(450,-450).y);

  
  balls = []
  // ball1 = new Ball(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y)
  // ball2 = new Ball(300,400,1)
  // ball3 = new Ball(300,400,2)
  catenaries = []
  params = []
  // cat1 = new Catenary(-120,300,300,400,0.45*windowWidth)


  for (var i = 0; i < cnum; i++) {
    catenaries[i] = new Catenary(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y,DtoF(shape2.x,shape2.y).x,DtoF(shape2.x,shape2.y).y,(initial+jump*i)*Math.sqrt((shape1.x-shape2.x)**2 + (shape1.y-shape2.y)**2))
    catenaries[i].update(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y,DtoF(shape2.x,shape2.y).x,DtoF(shape2.x,shape2.y).y,(initial+jump*i)*Math.sqrt((shape1.x-shape2.x)**2 + (shape1.y-shape2.y)**2))
    params[i] = (catenaries[i].param)
    balls[i] = new Ball(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y)
    console.log(catenaries[i].time(shape2.x))
  }

// console.log(params)


}

let time = 0;

function draw() { 
  background(255);
  // scale(0.5);
  // translate(windowWidth/2,windowHeight/2)
  // scale(1)
  // translate(-windowWidth/2,-windowHeight/2)
  scale(1.6)
  translate(-windowWidth*0.45,-windowHeight*0.45)
  // rotate(PI)
  // TIMES SOMETHING BY -1?
  // translate(0,-windowHeight)
  // scale(0.5)

  stroke(0)
  // line(-0.45*windowWidth,0,0.45*windowWidth,0)
  // line(0,-0.45*windowHeight,0,0.45*windowHeight)
  line(FtoD(-0.55*windowWidth,0).x,FtoD(-0.55*windowWidth,0).y,FtoD(0.55*windowWidth,0).x,FtoD(0.55*windowWidth,0).y)
  line(FtoD(0,0.55*windowHeight).x,FtoD(0,0.55*windowHeight).y,FtoD(0,-0.55*windowHeight).x,FtoD(0,-0.55*windowHeight).y)

  shape1.over();
  shape1.update();
  shape1.show();
  shape2.over();
  shape2.update();
  shape2.show();

  
  for (var i = 0; i < cnum; i++) {
    catenaries[i].show(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y,DtoF(shape2.x,shape2.y).x,DtoF(shape2.x,shape2.y).y);
    catenaries[i].update(DtoF(shape1.x,shape1.y).x,DtoF(shape1.x,shape1.y).y,DtoF(shape2.x,shape2.y).x,DtoF(shape2.x,shape2.y).y,(initial+jump*i)*Math.sqrt((shape1.x-shape2.x)**2 + (shape1.y-shape2.y)**2))
    balls[i].update(params[i].a,params[i].x0,params[i].y0);
    balls[i].show(shape2.x);
  }
  // cat1.show(shape1.x,shape1.y,shape2.x,shape2.y)
  // cat1.update(shape1.x,shape1.y,shape2.x,shape2.y,0.8*(Math.sqrt(windowWidth**2 + windowHeight**2)))  

  // ball1.calcAcc(params[0].x0,params[0].a);
  
  // console.log(ball1.pos);

  // ball2.calculateForce(parameters2.x0,parameters2.a);
  // ball2.update();
  // ball2.show();

  // ball3.calculateForce(parameters3.x0,parameters3.a);
  // ball3.update();
  // ball3.show();
}

function mousePressed() {
  shape1.pressed();
  shape2.pressed();
}

function mouseReleased() {
  shape1.released();
  shape2.released();
}



