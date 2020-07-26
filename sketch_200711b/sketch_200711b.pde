void setup() {
  size(500,500);
}

void draw() {
  for(int i=0;i<width;i++) {
    for(int j=0;j<height;j++) {
      stroke(map(sin(i*j*frameCount),-1,1,0,255));
      point(i,j);
    }
  }
} 
