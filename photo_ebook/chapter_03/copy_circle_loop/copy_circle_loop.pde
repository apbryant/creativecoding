void setup() {
  size(800, 800);
  background(255);
  stroke(0);
  fill(0);
  
  circle(width / 2, height / 2, width / 2);
  
  int columns = 20;
  int rows = 20;
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
      int xShift = int(noise(x) * 100);
      int yShift = int(noise(y) * 100);
      int dx = sx + xShift;
      int dy = sy + yShift;
      copy(sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
  
  save("sketch.png");
}
