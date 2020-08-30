
void setup() {
  size(900, 900);
  background(0);

}

void draw() {
  background(0);
  drawDirt(5, 30, 3);

}


void drawDirt(int n, int o, int mod) {
  if (frameCount % mod == 0) {
    for (int i = 0; i < n; i++) {
      fill(255, random(150, 255));
      float cx = random(width);
      float cy = random(height);
      beginShape();
      float a = 0;
      while (a < TAU) {
        float r = random(10);
        float x = cx + cos(a) * r;
        float y = cy + sin(a) * r;
        vertex(x, y);
        a += random(0.5);
      }
      endShape();
    }

    for (int i = 0; i < o; i++) {
      float x = random(width);
      float y = random(width);
      strokeWeight(random(5));
      stroke(255, random(200, 255));
      point(x, y);
    }
  }
}
