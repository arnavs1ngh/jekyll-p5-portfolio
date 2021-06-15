// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Ball {
  constructor(x,y) {
    this.pos = createVector(x,y)
    this.vel = createVector(0,0)
    this.acc = createVector(0,0)
    this.r = 4
    // this.mass = m
    this.pos.x += 0.000001
  }

  calcAcc(x0,a){

    // let force = createVector()
    // console.log(x0,a)
    // let s = Math.sin(Math.atan(Math.sinh((this.pos.x-x0)/a)))
    // let s_ = Math.sin(Math.atan(Math.sinh((this.pos.x-x0)/a))+PI)
    // let c = Math.cos(Math.atan(Math.exp((this.pos.x-x0)/a)))

    let s = Math.sinh((this.pos.x-x0)/a);
    let c = Math.cosh((this.pos.x-x0)/a);


    // let force = createVector(-0.1*s/Math.pow(c,2),0*Math.pow(s/c,2))
    this.acc = createVector(s/c**2,s**2/c**2);
    this.acc.setMag(0.01);


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
    // this.acc.add(force)

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

  update(a,x0,y0) {

    let s = Math.sinh((this.pos.x-x0)/a);
    let c = Math.cosh((this.pos.x-x0)/a);
    var xvel = 0.05*((-2*(a*c+y0))**0.5)/c

    this.pos.x = (this.pos.x) + xvel;
    this.pos.y = a * c + y0;
    
    return;
  }


  show(s2x) {

    if (this.pos.x < s2x) {
      fill(255,0,0);
      noStroke()
      ellipse(FtoD(this.pos.x, this.pos.y).x,FtoD(this.pos.x, this.pos.y).y,this.r,this.r);
    } else{
      noFill();
    }
  }  
}







