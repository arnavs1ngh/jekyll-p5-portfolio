// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Ball {
  constructor(x, y,m) {
    this.pos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.r = 10
    this.mass = m
  }

  calculateForce(x0,a){

    // let force = createVector()
    console.log(x0,a)
    let s = Math.sin(Math.atan(Math.sinh((this.pos.x-x0)/a))+PI)
    let c = Math.cos(Math.atan(Math.exp((this.pos.x-x0)/a))+PI)

    let force = createVector(-0.5*(c**2),0*(s))
    // let reaction = createVector(0,0)
    // let grav =
    // let grav = createVector(0,0);
    // let grav = createVector(0,-0.01);

    // let reaction = createVector(-0.1*this.m*c*s,0.1*this.m*(c**2))
    // let reaction = createVector(this.m*5*(s**2),this.m*5*c*s)
    // let reaction = createVector(-0.1*(s**2),c*s)
    // console.log(force)
    // force.add(grav)
    // force.add(reaction)
    this.acc.add(force)

  }

  // over() {
  //   // Is mouse over object

  //   let mx = -mouseX + windowWidth/2
  //   let my = -mouseY + windowHeight/2

  //   if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
  //     this.rollover = true;
  //   } else {
  //     this.rollover = false;
  //   }
  // }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.acc.set(0)
  }


  show() {
    fill(255,0,0)
    // noStroke()
    ellipse(this.pos.x, this.pos.y,this.r,this.r);
  }

  
}