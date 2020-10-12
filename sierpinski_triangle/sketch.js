Triangle = function(_x1, _y1, _x2, _y2, _x3, _y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;

  this.show = function() {
    fill(255);
    noStroke();
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  this.recurse = function(maxDepth, currentDepth){
    if(currentDepth < maxDepth){
      let mpx1 = this.x1 + ((this.x2 - this.x1) / 2);
      let mpy1 = this.y1  - ((this.y1 - this.y2) / 2);
      let mpx2 = this.x2;
      let mpy2 = this.y1;
      let mpx3 = this.x2 + ((this.x3 - this.x2) / 2);
      let mpy3 = this.y3  - ((this.y3 - this.y2) / 2);;

      fill(0);
      triangle(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);

      let bottomLeft = new Triangle(this.x1, this.y1, mpx1, mpy1, mpx2, mpy2);
      bottomLeft.show();
      if(random(10)<8) bottomLeft.recurse(maxDepth, currentDepth + 1);

      let top = new Triangle(mpx1, mpy1, this.x2, this.y2, mpx3, mpy3);
      top.show();
      if(random(10)<8) top.recurse(maxDepth, currentDepth + 1);

      let bottomRight = new Triangle(mpx2, mpy2, mpx3, mpy3, this.x3, this.y3);
      bottomRight.show();
      if(random(10)<8) bottomRight.recurse(maxDepth, currentDepth + 1);
    }
  }
}

function setup() {
  createCanvas(1000, 1000);
  background(0);
  fill(255);
}

function draw() {
  frameRate(1)
  background(0)
	translate(0, 100);
  let t = new Triangle(0, 800, 400, 0, 800, 800);
  t.show();
  let v = int(random(10))
  t.recurse(v, 0);
}
