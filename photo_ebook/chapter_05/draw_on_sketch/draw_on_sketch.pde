PImage img;

void setup() {
  size(1000, 543);
  background(255);
  noStroke();
  fill(0, 50);
  
  img = loadImage("chapter_one_edited.jpg");
  img.resize(width, 0);
  image(img, 0, 0);
  
  int columns = 20;
  int rows = 100;
  int columnWidth = width / columns;
  int rowHeight = height / rows;
  
  for (int y = 0; y < rows; y++) {
    for (int x = 0; x < columns; x++) {
      int sx = x * columnWidth;
      int sy = y * rowHeight; 
      int sw = columnWidth;
      int sh = rowHeight;
      int dw = columnWidth;
      int dh = rowHeight;          
      float xShift = map(cos(radians(sy) * 10), -1, 1, width * -0.01, width * 0.01);
      float yShift = map(sin(radians(sx) * 0.1), -1, 1, height * -0.01, height * 0.01);
      int dx = int(sx + xShift);
      int dy = int(sy + yShift);
      copy(sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
  
  for(int i = 0; i < 100; i++) {
   square(random(width), random(height), random(width * 0.05)); 
  }
  save("sketch_draw.png");
}

void draw() {
  
  
}
