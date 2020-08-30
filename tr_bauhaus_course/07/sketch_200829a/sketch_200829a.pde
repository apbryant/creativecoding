// template from: https://timrodenbroeker.de/courses/bauhaus-coding-workshop/wave-figures/

void setup(){
 size(900,900); 

}
 // The amount of elements
  float amount = 50;
  
  // The size of the figure
  float magnitude = 400;
void draw(){
  background(0);
  translate(width/2,height/2);
  fill(255);
  noStroke();
  float oldWave1 = f1(-1,2);
  float oldWave2 = f2(-1,20);
  for(int i = 0; i < amount; i++){
    
    // wave1 alters the x-axis
    float wave1 = f1(i,20);
    float w = f1(i/2,20);
    
    // wave2 alters the y-axis
    float wave2 = f2(i,5);
    float x = f2(i/2,5);

    stroke(255);
    strokeWeight(3);
    
    circle(wave1+w,wave2+x,10);
    oldWave1=wave1;
    oldWave2=wave2;
    float l = 50;
    float ww = 10;
    rect(wave1+w-l/2,wave2+x-ww/2,l,ww);
    
    
  }

}


float f1(float i, float j){
  return sin(radians(frameCount + i * j)) * magnitude;
}

float f2(float i, float j) {
  return cos(radians(frameCount + i * j)) * magnitude;
}
