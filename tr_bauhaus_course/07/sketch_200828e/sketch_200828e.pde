// template from: https://timrodenbroeker.de/courses/bauhaus-coding-workshop/wave-figures/

void setup(){
 size(900,900); 

}

void draw(){
  background(0);
  translate(width/2,height/2);
  
  // The amount of elements
  float amount = 36;
  
  // The size of the figure
  float magnitude = 400;
  
  fill(255);
  noStroke();
  
  for(int i = 0; i < amount; i++){
    
    // wave1 alters the x-axis
    float wave1 = sin(radians(frameCount + i * 15)) * magnitude;
    
    // wave2 alters the y-axis
    float wave2 = cos(radians(frameCount + i * 2)) * magnitude;
    
    float l = map(noise(wave1,wave2),0,1,10,100);
    //circle(wave1,wave2,r);
    rect(wave1, wave2, 20, map(sin(i),-1,1,10,100));
    
  }

}
