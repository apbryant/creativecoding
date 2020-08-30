

void setup() {
  background(0);
  size(900, 900);
  n=int(width/inc);
  stroke(255);
  squares=new Square[n];
  circles=new Circle[n];
  triangles=new Triangle[n];
  for (int i = 0; i<n; i++) {
    Square s = new Square(new PVector(i*inc, 200), l);
    squares[i]=s;
    squares[i].show();

    Circle c = new Circle(new PVector(i*inc, 400), l);
    circles[i] = c;
    circles[i].show();

    Triangle t = new Triangle(new PVector(i*inc, 600), l);
    triangles[i]=t;
    triangles[i].show();
  }

}

Square[] squares;
Triangle[] triangles;
Circle[] circles;
float l = 40;
float inc = 50;
int n;
void draw() {
  background(0);
  for(int i = 0;i<n;i++){
   squares[i].c.x++;
   squares[i].edges();
   squares[i].show();
   
   circles[i].c.x--;
   circles[i].edges();
   circles[i].show();
   
   triangles[i].c.x++;
   triangles[i].recalculate();
   triangles[i].edges();
   triangles[i].show();
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
    float bly = center.x + midLine/2;
    bl = new PVector(blx, bly);
    float brx = center.x + halfBottomLine;
    float bry = center.x + midLine/2;
    br = new PVector(brx, bry);
    top = new PVector(center.x, center.y - midLine/2);
  }
  void recalculate() {
    float midLine = sin(radians(60)) * l;
    float halfBottomLine = sqrt(l*l - midLine*midLine);
    float blx = c.x - halfBottomLine;
    float bly = c.x + midLine/2;
    bl = new PVector(blx, bly);
    float brx = c.x + halfBottomLine;
    float bry = c.x + midLine/2;
    br = new PVector(brx, bry);
    top = new PVector(c.x, c.y - midLine/2);
  }
  void show() {  
    println (bl, top, br);
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
