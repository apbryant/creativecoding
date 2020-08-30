// template
void setup() {
  size(900, 900); 
  background(0);
  stroke(255);
  noFill();
  Triangle t = new Triangle(new PVector(width * .25, height * .75), 250, false);
  t.show();
  Triangle t2 = new Triangle(new PVector(width * .75, height * .25), 250, true);
  t2.show();
}

void draw() {
}

class Triangle {
  PVector c, bl, top, br;
  float l;
  boolean invert = false;
  Triangle(PVector center, float sideLength, boolean invert) {
    c=center;
    l=sideLength;
    if (invert == true) {
      float midLine = sin(radians(60)) * sideLength;
      float halfBottomLine = sqrt(sideLength*sideLength - midLine*midLine);
      float blx = center.x + halfBottomLine;
      float bly = center.y - midLine/2;
      bl = new PVector(blx, bly);
      float brx = center.x - halfBottomLine;
      float bry = center.y - midLine/2;
      br = new PVector(brx, bry);
      top = new PVector(center.x, center.y + midLine/2);
    } else {
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
  }
  void show() {
    triangle(bl.x, bl.y, top.x, top.y, br.x, br.y);
  }
}
