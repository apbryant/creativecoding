Triangle = function(_x1, _y1, _x2, _y2, _x3, _y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;

  this.show = function(currentDepth,maxDepth) {
    // col=color(255)
    // col.setAlpha(map(currentDepth/maxDepth,0,1,255,100))
    // fill(col);
    // noStroke();
    push()
    off=sin(noise(random()))*50
    if(random<0.33){
      translate(this.x2,this.y2)+off
    } else if(random<0.67) {
      translate(this.x2,this.y2)+off
    } else {
      translate(this.x3,this.y3)+off
    }
    // translate(this.x2,this.y2)
    rotate(TAU/3)*int(random(1,4))
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    pop()
  }

  this.recurse = function(maxDepth, currentDepth){
    if(currentDepth < maxDepth){
      let mpx1 = this.x1 + ((this.x2 - this.x1) / 2);
      let mpy1 = this.y1  - ((this.y1 - this.y2) / 2);
      let mpx2 = this.x2;
      let mpy2 = this.y1;
      let mpx3 = this.x2 + ((this.x3 - this.x2) / 2);
      let mpy3 = this.y3  - ((this.y3 - this.y2) / 2);;


      triangle(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);

      let bottomLeft = new Triangle(this.x1, this.y1, mpx1, mpy1, mpx2, mpy2);
      bottomLeft.show(currentDepth,maxDepth);

      if(random(10)<8)bottomLeft.recurse(maxDepth, currentDepth + 1);


      let top = new Triangle(mpx1, mpy1, this.x2, this.y2, mpx3, mpy3);
      top.show(currentDepth,maxDepth);
      if(random(10)<8)top.recurse(maxDepth, currentDepth + 1);

      let bottomRight = new Triangle(mpx2, mpy2, mpx3, mpy3, this.x3, this.y3);
      bottomRight.show(currentDepth,maxDepth);
      if(random(10)<8)bottomRight.recurse(maxDepth, currentDepth + 1);
    }
  }
}

Triangle2 = function(center, sideLength) {


   this.c=center;
    this.l=sideLength;
    midLine = sin(radians(60)) * sideLength;
    halfBottomLine = sqrt(sideLength*sideLength - midLine*midLine);
    blx = center.x - halfBottomLine;
    bly = center.y + midLine/2;
    this.bl = new p5.Vector(blx, bly);
    brx = center.x + halfBottomLine;
    bry = center.y + midLine/2;
    this.br = new p5.Vector(brx, bry);
    this.top = new p5.Vector(center.x, center.y - midLine/2);
}

function draw() {
  createCanvas(w=1000, w);
  background(255);
  noFill()
  stroke(0)
  frameRate(1)
  n=1
  // for(i=0;i<n;i++){
  //   push()
  //   translate(w/2,w/2)
  //   rotate(radians(360*i/n))
  //   tt=new Triangle2(new p5.Vector(0,0),600)
  //   let t = new Triangle(tt.bl.x,tt.bl.y,tt.top.x,tt.top.y,tt.br.x,tt.br.y);
  //   t.show();
  //   let v = int(random(10))
  //   t.recurse(v, 0);
  //   pop()
  // }
  tt=new Triangle2(new p5.Vector(w*0.6,0),w*.5)
  let t = new Triangle(tt.bl.x,tt.bl.y,tt.top.x,tt.top.y,tt.br.x,tt.br.y);
  t.show();
  let v = int(random(8))
  t.recurse(v, 0);
  // saveCanvas()
}
