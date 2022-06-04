var points = []
var mult = 0.005

var r1, r2, g1,g2,b1,b2



function setup() {
  createCanvas(windowWidth,windowHeight);
  background(30)
  angleMode(DEGREES)
  noiseDetail(10)

  var density = 100
  var space = width / density

  for (var x = 0; x < width; x+=space) {
    for (var y = 0; y < height; y+= space) {
      var p = createVector(x + random(-10,10),y + random(-10,10))
      points.push(p)
    }
  }

  r1 = random(255)
  r2 = random(255)
  g1 = random(255)
  g2 = random(255)
  b1 = random(255)
  b2 = random(255)

}

function draw() {
  noStroke()
  fill(255)

  for (var i = 0; i < points.length; i++) {

    var r = map(points[i].x,0, width, r1, r2)
    var g = map(points[i].y,0, width, g1, g2)
    var b = map(points[i].x,0, width, b1, b2)

    fill(r,g,b)

    var angle = map(noise(points[i].x * mult ,points[i].y * mult), 0,1,0,720)
    points[i]

    points[i].add(createVector(cos(angle),sin(angle)))

    ellipse(points[i].x,points[i].y,1)
  }


}