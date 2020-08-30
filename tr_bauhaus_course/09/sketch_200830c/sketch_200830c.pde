void setup() {
  size(900, 900);
  background(0);
  fill(255);
  noStroke();
  for (int i = 0; i < 3; i++) {
    makeRects();
  }
}

void draw() {
}

void makeRects() {
  float l = random(width * 0.2);
  float w = random(height * 0.2);
  float buf = random(0.5, 2);
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
