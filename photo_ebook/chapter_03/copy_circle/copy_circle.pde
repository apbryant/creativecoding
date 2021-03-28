void setup() {
  size(800, 800);
  background(255);
  stroke(0);
  fill(0);
  int columns = 20;
  int rows = 20;
  int columnWidth = width / columns;
  int rowHeight = height / rows;
  
  circle(width / 2, height / 2, width / 2);
  copy(int(width / 2), int(height / 2), int(width * 0.1), int(height * 0.1), int(width * 0.8), int(height * 0.5), int(width * 0.1), int(height * 0.1));
  //for (int y = 0; y < rows; y++) {
  //  for (int x = 0; x < columns; x++) {
  //    int wave = int(sin(0.05 + ( x * y ) * 0.07) * 15);
  //    int sx = x * columnWidth;
  //    int sy = y * rowHeight; 
  //    int dx = sx + wave;
  //    int dy = sy + wave;
  //    copy(sx, sy, columnWidth, rowHeight, dx, dy, columnWidth, rowHeight);
  //  }
  //}
  
  save("sketch.png");
}
