setup=_=>{
	createCanvas(w=800,w)
	background(255)
	stroke(0)
	noFill()
	a=0
	r=301
	ainc=0.02
	rdec=0.01
	oldx=w/2+cos(a)*r
	oldy=w/2+sin(a)*r
	a+=ainc
	r-=rdec
	while(r>0){
		beginShape()
		scl=0.004
		m=30
		nx=map(noise(r*scl,a*scl,oldx*scl),0,1,-m,m)
		ny=map(noise(r*scl,a*scl,oldy*scl),0,1,-m,m)
		x=(w/2+nx)+cos(a)*r
		y=(w/2+ny)+sin(a)*r
		rx=cos(radians(x)*10)*3*noise(x*scl)
		ry=sin(radians(y)*10)*3*noise(y*scl)
		x+=rx
		y+=ry
		vertex(oldx,oldy)
		vertex(x,y)
		endShape()
		a+=ainc
		r-=rdec
		oldx=x
		oldy=y
	}
}


// createCols function from https://www.openprocessing.org/sketch/943564/
function createCols(_url)
{
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}
