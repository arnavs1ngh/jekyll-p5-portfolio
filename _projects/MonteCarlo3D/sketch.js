const drawRate = 50;

var Est_PI = 0;
var totalPoints = 0;
var inPoints = 0;

function setup() {
  createCanvas(400, 500);
  
  textAlign(LEFT, BASELINE);
  textSize(16);
  
  background(220);
  
  ellipse(width/2, height/2-50, width, height-100);
}

function draw() {
  strokeWeight(1);
  
  for(let i = 0; i < drawRate; i++) {
    var rand = createVector(random(0, 400), random(0, 400));
    
    stroke((rand.x/400)*255, (rand.y/400)*255, (rand.x+rand.y));
    point(rand.x, rand.y);
    
    if(dist(rand.x, rand.y, 200, 200) < 200) {
      inPoints += 1;
    }
    totalPoints += 1;
  }
  
  Est_PI = ((inPoints/totalPoints)*4).toPrecision(17);
  
  noStroke();
  rect(0, height-100, width, 100);
  text("PI ≈", 10, height-80);
  text(Est_PI, 10, height-60);
  text("3.141592653579323846264", 5, height-40)
}