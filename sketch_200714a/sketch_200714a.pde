// chilean sky
// import the library
import com.hamoid.*;

// create a new VideoExport-object
VideoExport videoExport;

PShape mountains;
float a;

void setup() {
  size(1000, 400);
  background(128, 229, 255);
  float x = 0;
  float y = height * .7;
  float yIncLim = width * 0.2;
  mountains = createShape();  
  mountains.beginShape();
  mountains.fill(204, 153, 102);
  mountains.noStroke();
  while (x < width) {
    float yInc = random(-yIncLim, yIncLim);
    if (y + yInc < height * 0.4 || y + yInc > height * 0.9) {
      y -= yInc;
    } else {
      y += yInc;
    }
    mountains.vertex(x, y);
    x += random(100, 150);
  }
  x = width * 1.1;
  y = height;
  mountains.vertex(x, y);
  x = 0;
  mountains.vertex(x, y);
  mountains.endShape(CLOSE);
  a = 135;
  // Some settings
  //videoExport = new VideoExport(this, "/Users/AndrewBryant/code/sketch_200714a/video.mp4");
  //videoExport.setFrameRate(32);  
  //videoExport.startMovie();
}

void draw() {
  PVector circleCenter = new PVector(width / 2, height);
  float r = width * 0.3;
  background(128, 229, 255);
  
  PVector temp = circleCenter.copy();
  temp.add(r * cos(radians(a)), r * sin(radians(a)));
  fill(255, 219, 77);
  circle(temp.x, temp.y, 100);
  noStroke();
  a -= 0.5;
  fill(255);
  shape(mountains);
  // Save a frame!
  videoExport.saveFrame();
}

void keyPressed() {
  if (key == 'q') {
    videoExport.endMovie();
    exit();
  }
}
