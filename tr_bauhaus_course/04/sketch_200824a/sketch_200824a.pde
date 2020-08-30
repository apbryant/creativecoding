
void setup() {
 size(900,900);
 
 fill(255);
 noStroke();


}

void draw() {
  float soff = map(sin(radians(frameCount)+PI),-1,1,0,300);
 background(0);
 square(150+soff,150,200);
 
 circle(665,map(sin(radians(frameCount)-PI),-1,1,300,600),200);
 float toff = map(cos(frameCount*0.01),-1,1,-50,250);
 triangle(75+toff,805,225+toff,545,375+toff,805);

}
