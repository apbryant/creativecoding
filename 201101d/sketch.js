// template from: https://timrodenbroeker.de/courses/bauhaus-coding-workshop/wave-figures/

function setup(){
 createCanvas(900,900);
 background(0);
 translate(width/2,height/2);
 noFill()
t=0
x=20
y=5
 for(j=0;j<100;j++){
	 oldWave1 = f1(-1,x,t);
	 oldWave2 = f2(-1,y,t);
	 t++
	for(i=0;i<50;i++){
		 wave1 = f1(i,x,t);
		 wave2 = f2(i,y,t);
	 t++
		stroke(255,100);
		line(oldWave1,oldWave2,wave1,wave2);
		oldWave1=wave1;
		oldWave2=wave2;
	}
 }
 saveCanvas()
}

 f1=(i,j,t)=>{
  return sin(radians(t + i * j)) * 400;
}

f2=(i,j)=>{
  return cos(radians(t + i * j)) * 400;
}
