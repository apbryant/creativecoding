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
  
  //String dateString = year() + "_" + month() + "_" + day() + "_" + hour() + "_" + minute() + "_" + second();
  //save(dateString + ".png");
  //noLoop();
}

//void keyPressed() {
//  if (key == 'q') {
//    videoExport.endMovie();
//    exit();
//  }
//}
