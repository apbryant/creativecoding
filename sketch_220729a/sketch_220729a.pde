void setup() {
 size(900, 900);
 background(0);
 fill(255);
 stroke(0);
}

// Could you give the squares different colors?
// Could you draw circles instead of squares?
// Could you alternate drawing squares and circles?

void draw() {
 frameRate(1);
 background(0);
 float a = width * 0.1;
 float columns = width / a;
 float rows = height / a;
 
 for(int y = 0; y < rows; y++) {
  for(int x = 0; x < columns; x++) {
    fill(random(255));
    square(x * a, y * a, a);
  }
 }
}
