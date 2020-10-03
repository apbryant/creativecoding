setup=_=>{
	createCanvas(w=800,w)
	background(255)
	noFill()

	background(0)

	stroke(255)
	buf=50
	oldx=buf
	oldy=buf
	x=buf
	yinc=1
	xinc=10
	y=buf+1
	scl= 0.003
	while(x<w-buf){

		if(y==w-buf){
			yinc*=-1
			x+=xinc
		} else if(y==buf) {
			yinc *= -1
			x+=xinc
		}

		push()
		rotate(cos(radians(x^y))*0.01)
		beginShape()
		vertex(oldx,oldy)
		nx=map(noise(x*scl,y*scl),0,1,xinc*-0.9,xinc*0.9)*0
		vertex(x+nx,y)
		endShape()
		pop()
		oldx=x
		oldy=y
		y+=yinc
	}
	oldx=x
	oldy=y
	y=y
	x=x-1
	xinc=1
	yinc=10
	while(y<w-buf){
		if(x==w-buf){
			xinc*=-1
			y+=yinc
		} else if(x==buf) {
			xinc *= -1
			y+=yinc
		}
		push()
		rotate(cos(radians(x^y))*0.01)
		beginShape()
		vertex(oldx,oldy)
		ny=map(noise(x*scl,y*scl),0,1,yinc*-0.9,yinc*0.9)*0
		vertex(x,y+ny)
		endShape()
		pop()
		oldx=x
		oldy=y
		x+=xinc
	}
}
