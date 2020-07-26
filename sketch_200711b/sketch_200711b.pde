//// import the library
import com.hamoid.*;

//// create a new VideoExport-object
VideoExport videoExport;

void setup() {
  size(500,500);
  // Some settings
  videoExport = new VideoExport(this, "/Users/AndrewBryant/code/sketch_200711b/video.mp4");
  videoExport.setFrameRate(1);  
  videoExport.startMovie();
}

void draw() {
  for(int i=0;i<width;i++) {
    for(int j=0;j<height;j++) {
      stroke(map(sin(i*j*frameCount),-1,1,0,255));
      point(i,j);
    }
  }
  videoExport.saveFrame();
}

void keyPressed() {
  if (key == 'q') {
    videoExport.endMovie();
    exit();
  }
} 
