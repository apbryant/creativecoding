// Started from template: https://timrodenbroeker.de/courses/bauhaus-coding-workshop/wave-figures/

// Uncomment lines with videoExport to record video
// Video export may cause sketch to run much slower!

import java.util.Arrays;
import com.hamoid.*;
VideoExport videoExport;

void setup() {
  //videoExport = new VideoExport(this, "myVideo.mp4");
  //videoExport.setFrameRate(30);
  //videoExport.startMovie();
  size(900, 900);
  background(255);
  fill(0);
  noStroke();
  float a = 7.460008484604781; // set to random(N) for more variety! e.g., random(10)
  float b = 2.428597966576768; // set to random(N) for more variety! e.g., random(10)

  for (int i = 0; i < amount; i++) {
    float wave1 = map(sin(radians(i * a)), -1, 1, -magnitude, magnitude);
    float wave2 = map(sin(radians(i * b)), -1, 1, -magnitude, magnitude);
    pts[i]=new PVector(wave1, wave2);
  }
}

int amount = 10000;
PVector[] pts = new PVector[amount];
float magnitude = 500;
int j = 1;

void draw() {
  background(255);
  pushMatrix();
  translate(width/2, height/2);
  PVector[] subarray = Arrays.copyOfRange(pts, 0, j);
  beginShape();

  for (int i = 0; i < subarray.length; i++) {
    curveVertex(subarray[i].x, subarray[i].y);
    //videoExport.saveFrame();
  }
  endShape();
  popMatrix();
  
  if (j == pts.length) {
    //videoExport.endMovie();
    exit();
  } else {
    j++;
  }
  
  
}

void keyPressed() {
  if (key == 'q') {
    videoExport.endMovie();
    exit();
  }
}
