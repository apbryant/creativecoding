//void setup() {
//  size(500, 500, P3D);
//  background(0);
//}
//float a = 1 / 2.3;
//float b = 0.5;

//void draw() {
//  background(0);
//  for(int x = 0; x < 300; x++) {
//    for(int y = 0; y < 300; y++) {
//      for(int z = 0; z < 300; z++) {
//         float s = sin(radians(x * y)) + sin(radians(y * z)) + sin(radians(z * x));
//         stroke(map(s, -3, 3, 0, 255));
//         point(x, y, z);
//      }
//    }
//  }
//}

PShader shader;
// import the library
import com.hamoid.*;

// create a new VideoExport-object
VideoExport videoExport;

void setup() {
  size(640, 640, P2D);
  noStroke();

  shader = loadShader("shader.frag");
  //videoExport = new VideoExport(this, "/Users/AndrewBryant/code/sketch_200716a/video.mp4");
  //videoExport.setFrameRate(32);  
  //videoExport.startMovie();
}

void draw() {
  shader.set("u_resolution", float(width), float(height));
  shader.set("u_mouse", float(mouseX), float(mouseY));
  shader.set("u_time", millis() / 1000.0);
  shader(shader);
  rect(0,0,width,height);
  //videoExport.saveFrame();
}

//void keyPressed() {
//  if (key == 'q') {
//    videoExport.endMovie();
//    exit();
//  }
//}
