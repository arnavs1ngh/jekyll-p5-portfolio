// class Planet {
// 	constructor(x,y){
// 		this.pos = createVector(x,y)
// 		this.vel = createVector(0,0)
// 		this.acc = createVector(0,0)
// 		this.r = 10
// 	}

// 	applyForce(force){
// 		this.acc.add(force)
// 	}

// 	update(){

// 		this.vel.add(this.acc)
// 		this.pos.add(this.vel)
// 		this.acc.set(0,0)
// 	}

// 	show(){
// 		stroke(255)
// 		strokeWeight(2)
// 		fill(255)
// 		circle(this.pos.x+windowWidth/2,this.pos.y+windowHeight/2,this.pos.r*2)
// 	}
// }

// Particle System Simulation
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/syR0klfncCk
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-system-simulation.html
// https://editor.p5js.org/codingtrain/sketches/QRzgzQLnQ

class Planet {
  constructor(x, y, v,m) {
    this.pos = createVector(x,y);
    // this.vel = p5.Vector.random2D();
    // this.vel.mult(random(0.5, 2));
    // this.vel = createVector(0.1,0)
    this.vel = v
    this.acc = createVector(0, 0);
    this.r = 2;
    this.lifetime = 255;
    this.mass = m
  }

  calculateForce(planet) {
    const distance = dist(this.pos.x, this.pos.y, planet.pos.x, planet.pos.y);
    const force = 1 * this.mass * planet.mass / distance ** 2;
    this.acc.add(force * (planet.pos.x - this.pos.x) / distance / this.mass, force * (planet.pos.y - this.pos.y) / distance / this.mass);
  }

  applyForce(force) {
    this.pos.add(this.vel);
  }

  // edges() {
  //   if (this.pos.y >= height - this.r) {
  //     this.pos.y = height - this.r;
  //     this.vel.y *= -1;
  //   }

  //   if (this.pos.x >= width - this.r) {
  //     this.pos.x = width - this.r;
  //     this.vel.x *= -1;
  //   } else if (this.pos.x <= this.r) {
  //     this.pos.x = this.r;
  //     this.vel.x *= -1;
  //   }
  // }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    // this.lifetime -= 5;
  }

  show() {
    stroke(255);
    // strokeWeight(1);;
    noStroke();
    fill(255,150,50,100);

    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}


