setup=_=>{
	createCanvas(w=800,w)
	background(0)
	stroke(255)
	strokeWeight(5)
	noFill()
	for(i=0;i<10;i++){
		makeshape(random(w),random(w))
	}
	// saveCanvas()
}

makeshape=(x,y)=>{
	n=int(random(3,7))
	r=random(50,150)
	a = 0;
	aInc = 360 / n;
	push()
	translate(x,y)
	rotate(PI*noise(x*0.003,y*0.003,n*0.003)/n)
  beginShape()
  for (let i = 0; i <= n; i++) {
    let vx = r * sin(radians(a))
    let vy =  r * cos(radians(a))
    vertex(vx, vy);
    a += aInc;
  }
  endShape();
	pop()
}
