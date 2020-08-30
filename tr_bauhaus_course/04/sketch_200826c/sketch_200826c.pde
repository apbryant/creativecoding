
void setup() {
  background(0);
  size(900, 900);
  c=new Circle(new PVector(random(width), random(height)),l);
  s=new Square(new PVector(random(width),random(height)),l);
  t=new Triangle(new PVector(random(width),random(height)),l);
  stroke(0);
  strokeWeight(3);
  c.show();
  s.show();
  t.show();
  gx=random(10000);
  hx=random(10000);
  ix=random(10000);
  gy=random(10000);
  hy=random(10000);
  iy=random(10000);

}

Square s;
Triangle t;
Circle c;
float gx, hx, ix, gy, hy, iy;
float l = 300;
float inc=0.01;
void draw() {
  background(0);
  c.c.x+=map(noise(gx),0,1,-1,1);
  c.c.y+=map(noise(gy),0,1,-1,1);
  c.edges();
  c.show();
  s.c.x+=map(noise(hx),0,1,-1,1);
  s.c.y+=map(noise(hy),0,1,-1,1);
  s.edges();
  s.show();
  t.c.x+=map(noise(ix),0,1,-1,1);
  t.c.y+=map(noise(iy),0,1,-1,1);
  t.edges();
  t.recalculate();
  t.show();
  gx+=inc;
  hx+=inc;
  ix+=inc;
    gy+=inc;
  hy+=inc;
  iy+=inc;

}

class Square {
  PVector c;
  float l;
  Square(PVector center, float sideLength) {
    c=center;
    l=sideLength;
  }
  void show() {
    float tlx = c.x - l/2;
    float tly = c.y - l/2;
    rect(tlx, tly, l, l);
  }

  void edges() {
    if (c.x > width) {
      c.x = 0;
    } else if (c.x < 0) {
      c.x = width;
    }
    if (c.y > height) {
      c.y = 0;
    } else if (c.y < 0) {
      c.y = height;
    }
  }
}

class Circle {
  PVector c;
  float r;
  Circle(PVector center, float radius) {
    c=center;
    r=radius;
  }
  void show() {
    circle(c.x, c.y, r);
  }
  void edges() {
    if (c.x > width) {
      c.x = 0;
    } else if (c.x < 0) {
      c.x = width;
    }
    if (c.y > height) {
      c.y = 0;
    } else if (c.y < 0) {
      c.y = height;
    }
  }
}
class Triangle {
  PVector c, bl, top, br;
  float l;
  Triangle(PVector center, float sideLength) {
    c=center;
    l=sideLength;
    float midLine = sin(radians(60)) * sideLength;
    float halfBottomLine = sqrt(sideLength*sideLength - midLine*midLine);
    float blx = center.x - halfBottomLine;
    float bly = center.y + midLine/2;
    bl = new PVector(blx, bly);
    float brx = center.x + halfBottomLine;
    float bry = center.y + midLine/2;
    br = new PVector(brx, bry);
    top = new PVector(center.x, center.y - midLine/2);
  }
  void recalculate() {
    float midLine = sin(radians(60)) * l;
    float halfBottomLine = sqrt(l*l - midLine*midLine);
    float blx = c.x - halfBottomLine;
    float bly = c.y + midLine/2;
    bl = new PVector(blx, bly);
    float brx = c.x + halfBottomLine;
    float bry = c.y + midLine/2;
    br = new PVector(brx, bry);
    top = new PVector(c.x, c.y - midLine/2);
  }
  void show() {
    triangle(bl.x, bl.y, top.x, top.y, br.x, br.y);
  }
  void edges() {
    if (c.x > width) {
      c.x = 0;
    } else if (c.x < 0) {
      c.x = width;
    }
    if (c.y > height) {
      c.y = 0;
    } else if (c.y < 0) {
      c.y = height;
    }
  }
}
