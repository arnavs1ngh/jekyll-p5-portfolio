// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.w = 10;
    this.h = 10;
    this.x = x;
    this.y = y;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  over() {
    // Is mouse over object

    let mx = mouseX
    let my = mouseY

    if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {

    let mx = mouseX
    let my = mouseY
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mx + this.offsetX;
      this.y = my + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(50);
    } else if (this.rollover) {
      fill(100);
    } else {
      fill(175, 200);
    }
    ellipse(this.x, this.y, this.w, this.h);
  }

  pressed() {

    let mx = mouseX
    let my = mouseY
    // Did I click on the rectangle?
    if (mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mx;
      this.offsetY = this.y - my;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}