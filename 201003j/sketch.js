Triangle = function(v1, v2, v3) {
  this.p1 = v1;
  this.p2 = v2;
  this.p3 = v3;

  this.hypoLength = null;
  this.h1 = null;
  this.h2 = null;
  this.rightAnglePoint = null;
  this.midPoint = null;

  let d1 = dist(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  let d2 = dist(this.p2.x, this.p2.y, this.p3.x, this.p3.y);
  let d3 = dist(this.p3.x, this.p3.y, this.p1.x, this.p1.y);

  let dTemp = max(d1, d2);
  let d = max(dTemp, d3);

  this.hypoLength = d;

  if (d === d1) {
    this.h1 = this.p1;
    this.h2 = this.p2;
    this.rightAnglePoint = this.p3;
  }

  if (d === d2) {
    this.h1 = this.p2;
    this.h2 = this.p3;
    this.rightAnglePoint = this.p1;
  }

  if (d === d3) {
    this.h1 = this.p3;
    this.h2 = this.p1;
    this.rightAnglePoint = this.p2;
  }

  this.show = function() {
		noStroke()
		fill(colors[int(random(colors.length))])
    triangle(this.p1.x, this.p1.y,
      this.p2.x, this.p2.y,
        this.p3.x, this.p3.y);
  }

  this.recurse = function(maxIter, currentIter) {
    if (currentIter < maxIter) {
      let mp = p5.Vector.add(this.h1, this.h2);

      mp.div(2);
      stroke(255, 0, 0);
      line(this.rightAnglePoint.x, this.rightAnglePoint.y,
            mp.x, mp.y);

      let aa = new p5.Vector(this.h1.x, this.h1.y);
      let bb = new p5.Vector(this.rightAnglePoint.x, this.rightAnglePoint.y);
      let cc = new p5.Vector(mp.x, mp.y);

      let dd = new p5.Vector(this.rightAnglePoint.x, this.rightAnglePoint.y);
      let ee = new p5.Vector(mp.x, mp.y);
      let ff = new p5.Vector(this.h2.x, this.h2.y);

      let t1 = new Triangle(aa, bb, cc);
      t1.show();
      if (random(1) < 3) {
				push()

				rotate(a)

					a+=ainc
        t1.recurse(maxIter, currentIter + 1);
				pop()
      }


      let t2 = new Triangle(dd, ee, ff);
      t2.show();
      if (random(1) < 3) {
				push()
				rotate(a)
				a+=ainc
        t2.recurse(maxIter, currentIter + 1);
				pop()
      }
    }
  }
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  frameRate(1);
  colors=shuffle(createCols("https://coolors.co/0466c8-0353a4-023e7d-002855-001845-001233-33415c-5c677d-7d8597-979dac"))
	background(0)
  fill(255);
a=0
ainc=0.00001
  line(0, height, width, 0);

  let x1 = 0;
  let y1 = height;
  let x2 = 0;
  let y2 = 0;
  let x3 = width;
  let y3 = 0;

  let v1 = new p5.Vector(x1, y1);
  let v2 = new p5.Vector(x2, y2);
  let v3 = new p5.Vector(x3, y3);

  let t1 = new Triangle(v1, v2, v3);
  t1.show();

  let w1 = new p5.Vector(0, height);
  let w2 = new p5.Vector(width, 0);
  let w3 = new p5.Vector(width, height);

  let t2 = new Triangle(w1, w2, w3);
  t2.show();

  t1.recurse(9, 0);
  t2.recurse(9, 0);
}

// createCols function from https://www.openprocessing.org/sketch/943564/
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
