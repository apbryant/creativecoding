void setup() {
  size(900, 900);
  background(0);
  fill(255);
}

void draw() {
  background(0);

  Triangle t = new Triangle(new PVector(random(width), random(height)), random(300));
  pushMatrix();
  translate(t.c.x, t.c.y);
  rotate(random(TAU));
  t.show();
  popMatrix();
  
  Rectangle r = new Rectangle(new PVector(random(width), random(height)), random(600), random(600));
  pushMatrix();
  translate(r.c.x, r.c.y);
  rotate(random(TAU));
  r.show();
  popMatrix();
  
  Circle c = new Circle(new PVector(random(width), random(height)), random(400));
  c.show();
  
  strokeWeight(5);
  line(random(width),random(height),random(width),random(height));

}

class Rectangle {
  PVector c;
  float lx, ly;
  Rectangle(PVector center, float l, float w) {
    c=center;
    lx=l;
    ly=w;
  }
  void show() {
    float tlx = c.x - lx/2;
    float tly = c.y - ly/2;
    rect(tlx, tly, lx, ly);
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
  float l;
  Circle(PVector center, float radius) {
    c=center;
    l=radius;
  }
  void show() {
    circle(c.x, c.y, l);
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
