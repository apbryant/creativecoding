// template
void setup(){
 size(900,900); 
 background(0);
 fill(255);
 stroke(255);
 strokeWeight(5);
 line(0, height / 2, width, height / 2);
 fill(0);
 noStroke();
 rect(width * .4, height * .25, width * .2, height * .5);
 stroke(255);
 strokeWeight(1);
 for(float x = width * .4; x <= width * .6; x += 10){
   line(x, height * .25, x, height * .75);
 }
}

void draw(){
  
}
