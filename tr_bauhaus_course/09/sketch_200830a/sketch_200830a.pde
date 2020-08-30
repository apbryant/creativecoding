void setup() {
  size(900, 900);
  background(150);
  fill(255);
  noStroke();
  float m = 0.2;
  while(m > 0.1) {
   makeRects(m);
   m *= 0.8;
  }
  
  setRandomFill();
  circle(random(width), random(height), random(600));
}

void draw() {
  
}

void setRandomFill() {
  if(random(100) < 50) {
   fill(0); 
  } else {
   fill(255); 
  }
}
void makeRects(float m) {
  float l = random(width * m);
  float w = random(height * m);
  float buf = random(0.5, 2);
  setRandomFill();
  if (l >= w) {
    float x = 0;
    float y = random(height);
    while (x < width) {
      rect(x, y, w, l);
      x += w + w * buf;
    }
  } else {
    float y = 0;
    float x = random(width);
    while (y < height) {
      rect(x, y, w, l);
      y += l + l * buf;
    }
  }
}
