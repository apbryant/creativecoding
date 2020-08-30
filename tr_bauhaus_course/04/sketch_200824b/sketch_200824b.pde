

  
void setup() {
  size(900, 900);
  background(0);
  fill(255);
  noStroke();

 
}

void draw() {
  background(0);

  Square s = new Square(new PVector(width/2, height/2), 300);
  s.show();

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
    rect(tlx,tly,l,l);
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
  void show() {
    triangle(bl.x, bl.y, top.x, top.y, br.x, br.y);
  }
}
