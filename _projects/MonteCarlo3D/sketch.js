// let angle = 0;
// var r = 250;
// let rate = 200;



// function setup() {
//   createCanvas(900,900, WEBGL);
  
// }

// function draw() {

//   background(155);

//   stroke(0);
//   rectMode(CENTER);
//   fill(0,0,255,100);
//   rotateY(angle);
//   //rotateX(angle*0.5)
//   //rotateZ(angle*0.5)
//   //box(2*r);
//   sphere(r);
//   fill(255,255,255,100)
//   box(2*r)

  

//   // for (var i = 0; i < rate; i++) {

//   //   var rand = createVector(random(-r/2, r/2), random(-r/2, r/2),random(-r/2,r/2));
//   //   stroke((rand.x/r)*255, (rand.y/400)*255, (rand.x+rand.y))
//   //   translate(rand.x,rand.y,rand.z);
//   //   rotateY(angle)
//   //   sphere(1);
//   //   translate(0,0,0);
//   // }

//   angle += 0.005
// }

var r = 250;
var points = [];
let rate = 20;

let inPoints = 0;



function setup() {
  createCanvas(900,900, WEBGL);

  slider = createSlider(0.005,0.03,0.01,0.005)
  slider.position(10,850)

  textSize(90);
  textAlign(CENTER, CENTER);

}

function draw() {

  // let camX = map(mouseX,0,width,-800,800)
  camY = map(mouseY,0,height,0,1)
  eyeZ = (height/2)/tan(PI/6)

  //print(camY)
  let speed = slider.value();

  let posx = 2*sin(frameCount*speed)
  let posz = -2*cos(frameCount*speed)
  //print(posx)

  camera(tan(PI/6)*height*posx,-tan(PI/6)*height*0,posz*(height)*tan(PI/6),0,0,0,0,1,0)
  perspective(camY*PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0)

  background(155);
  stroke(0);
  rectMode(CENTER);

  Est_PI = ((inPoints/points.length)*6).toPrecision(17);
  stroke(255);
  text("WHERE IS THIS TEXT BRUH", 300, 300);
  // text(Est_PI, 5, height-60);
  // text("3.141592653579323846264", 5, height-40)

  for (var i = 0; i < rate; i++) {
  var rand = createVector(random(-r, r), random(-r, r),random(-r,r));
  //point(rand.x,rand.y,rand.z)
  points.push(rand)
  }

  strokeWeight(5);
  for (var i = 0; i < points.length; i++) {
    if (abs(points[i]) <= r) {
      stroke(255,0,0)
      point(points[i].x,points[i].y,points[i].z)
      inPoints++
    }
    else{
      stroke(0)
      point(points[i].x,points[i].y,points[i].z)
    }
  }
  strokeWeight(1);

  //stroke((rand.x/r)*255, (rand.y/400)*255, (rand.x+rand.y))
  

  translate(0,0,0)
  fill(255,0,0,100);
  sphere(r,24);
  fill(255,255,255,100)
  box(2*r)


  
  




}



