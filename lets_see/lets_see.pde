import java.util.UUID;

void setup() {
  size(600, 600);
}

void draw() {
  frameRate(1);
  float w = width;
  translate(w / 2, w / 2);
  rotate(PI / 2);
  background(255);
  noFill();
  drawSpiral(w * 0.375);
  for (int i = 0; i < 5; i++) drawSpiral(w * .375 * .5 * (i + 1));
}

void drawSpiral(float r) {
  float a = 0;
  float startr = r;
  float ainc = 0.05;
  float rdec = 0.05;
  float g = 11;
  float oldx = cos(a) * r * cos(a);
  float oldy = sin(a) * r * sin(a);
  a += ainc;
  r -= rdec;
  float t = random(10000);
  float tinc = 0.001;
  float c = 0;
  
  while (r > 0) {
    stroke(0, 100);
    float scl = 0.004;
    float m = 30;
    float nx=map(noise(r * scl, a * scl, oldx * scl), 0, 1, -m, m);
    float ny=map(noise(r * scl, a * scl, oldy * scl), 0, 1, -m, m);
    float x = nx + cos(a) * r * sin(a);
    float y = ny + sin(a) * r * sin(a);
    if (c > 2) {
      beginShape();
      vertex(oldx, oldy);
      vertex(x, y);
      endShape();
    }
    c++;
    a += ainc + noise(t, scl) * 0.01;
    t += tinc;
    r -= rdec;
    oldx = x;
    oldy = y;
  }

  move(startr);
}

void move(float startr) {
  translate(startr / 2, startr / 2);
  rotate(random(QUARTER_PI, HALF_PI)); 
}
