PImage img;

void setup() {
  size(1000, 1000);
  background(255);
  img = loadImage("skyline.jpg");
  img.resize(0, height);
  image(img, 0, 0);
  
  //int columns = 20;
  //int rows = 20;
  //int columnWidth = width / columns;
  //int rowHeight = height / rows;
  
  //for (int y = 0; y < rows; y++) {
  //  for (int x = 0; x < columns; x++) {
  //    int sx = x * columnWidth;
  //    int sy = y * rowHeight; 
  //    int sw = columnWidth;
  //    int sh = rowHeight;
  //    int dw = columnWidth;
  //    int dh = rowHeight;
  //    int xShift = int(noise(x) * 100);
  //    int yShift = int(noise(y) * 100);
  //    int dx = sx + xShift;
  //    int dy = sy + yShift;
  //    copy(sx, sy, sw, sh, dx, dy, dw, dh);
  //  }
  //}
  save("sketch_skyline.png");
}

void draw() {
  
  
}
