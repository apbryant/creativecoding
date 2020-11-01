// template from: https://timrodenbroeker.de/courses/bauhaus-coding-workshop/wave-figures/

function setup(){
 createCanvas(900,900);
 background(255);
 //background(0);
 translate(width/2,height/2);
 fill(0,100);
 stroke(0,125)
t=0
tinc=1
x=15
y=5
 for(j=0;j<10;j++){
	 oldWave1 = f1(-1,x,t);
	 oldWave2 = f2(-1,y,t);
	 t+=tinc
	for( i = 0; i < amount; i++){

		// wave1 alters the x-axis
		 wave1 = f1(i,x,t);

		// wave2 alters the y-axis
		 wave2 = f2(i,y,t);

	 t+=tinc
		//circle(wave1,wave2,10);

		//strokeWeight(3);
		line(oldWave1,oldWave2,wave1,wave2);
		oldWave1=wave1;
		oldWave2=wave2;
		//rect(wave1, wave2, 20, map(sin(i),-1,1,10,100));

	}
 }
 // saveCanvas()
}
 // The amount of elements
   amount = 500;

  // The size of the figure
   magnitude = 400;



 f1=(i,j,t)=>{
  return map(noise(t,i,j),0,1,-10,10)+sin(radians(t + i * j)) * magnitude;
}

f2=(i,j)=>{
  return map(noise(t,i,j),0,1,-10,10)+sin(radians(t + i * j)) * magnitude;
}
