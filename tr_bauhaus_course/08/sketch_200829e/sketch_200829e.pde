// template
void setup(){
 size(900,900); 
 background(0);
 fill(255);
  noStroke();
  circle(width / 2, height / 2, d);
  fill(0);
  for(int i = 0; i < 25; i++) {
    float x = random(width / 2 - r, width / 2 + r);
    float y = random(height / 2 - r, height / 2 + r);
    circle(x, y, random(10,50));
  }
}

float d = 700;
float r = d / 2;
void draw(){
  //background(0);
  
}
