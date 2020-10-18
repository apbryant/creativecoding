Triangle = function(_x1, _y1, _x2, _y2, _x3, _y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;

  this.show = function() {
    fill(colors[int(random(colors.length))]);
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

      fill(colors[int(random(colors.length))]);
      triangle(mpx1, mpy1, mpx2, mpy2, mpx3, mpy3);

      let bottomLeft = new Triangle(this.x1, this.y1, mpx1, mpy1, mpx2, mpy2);
      bottomLeft.show();

      if(random(10)<8)bottomLeft.recurse(maxDepth, currentDepth + 1);


      let top = new Triangle(mpx1, mpy1, this.x2, this.y2, mpx3, mpy3);
      top.show();
      if(random(10)<8)top.recurse(maxDepth, currentDepth + 1);

      let bottomRight = new Triangle(mpx2, mpy2, mpx3, mpy3, this.x3, this.y3);
      bottomRight.show();
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

// Function from https://www.openprocessing.org/sketch/973782
function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}


function draw() {
  frameRate(1)
  createCanvas(w=800, w);
  colors=shuffle(createCols("https://coolors.co/cb997e-eddcd2-fff1e6-f0efeb-ddbea9-a5a58d-b7b7a4"))
  background(colors.pop());
  fill(255);
  r=200
  n=6
  for(i=0;i<n;i++){
    push()


    translate(w/2,w/2)
    x=cos(TAU*i/n)*r
    y=sin(TAU*i/n)*r
    tt=new Triangle2(new p5.Vector(x,y),400)
    let t = new Triangle(tt.bl.x,tt.bl.y,tt.top.x,tt.top.y,tt.br.x,tt.br.y);
    t.show();
    let v = int(random(5))
    t.recurse(v, 0);
    pop()
  }
}
