let c;t=0;setup=_=>{
	createCanvas(w=800,w)
	background(255)
	stroke(0)
	colors=shuffle(createCols("https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4"))
	createCanvas(w=800,w)
	c=colors.pop()
	background(c)
	strokes=colors.slice(0,4)
	noFill()
	a=0
	r=301
	ainc=0.1
	rdec=0.02
	oldx=w/2+cos(a)*r
	oldy=w/2+sin(a)*r
	a+=ainc
	r-=rdec

	while(r>0){
		// Stroke color selection code from https://www.openprocessing.org/sketch/955170
		let nn = (noise(oldx *  0.003, oldy * 0.003) * strokes.length * 2) - 2;
		let index = int(constrain(nn, 0, strokes.length-1));
		let col = strokes[index];
		stroke(col)
		beginShape()
		scl=0.004
		m=30
		nx=map(noise(r*scl,a*scl,oldx*scl),0,1,-m,m)
		ny=map(noise(r*scl,a*scl,oldy*scl),0,1,-m,m)
		x=(w/2+nx)+cos(a)*r
		y=(w/2+ny)+sin(a)*r

		vertex(oldx,oldy)
		vertex(x,y)
		endShape()
		a+=ainc
		r-=rdec
		oldx=x
		oldy=y
	}
	// saveCanvas()
}

draw=_=>{
	background(c)
	a=0
	r=301
	ainc=0.1
	rdec=0.02
	oldx=w/2+cos(a)*r
	oldy=w/2+sin(a)*r
	a+=ainc
	r-=rdec

	while(r>0){
		// Stroke color selection code from https://www.openprocessing.org/sketch/955170
		let nn = (noise(oldx *  0.003, oldy * 0.003,t) * strokes.length * 2) - 2;
		let index = int(constrain(nn, 0, strokes.length-1));
		let col = strokes[index];
		stroke(col)
		beginShape()
		scl=0.004
		m=30
		nx=map(noise(r*scl,a*scl,oldx*scl*t),0,1,-m,m)
		ny=map(noise(r*scl,a*scl,oldy*scl*t),0,1,-m,m)
		x=(w/2+nx)+cos(a)*r
		y=(w/2+ny)+sin(a)*r

		vertex(oldx,oldy)
		vertex(x,y)
		endShape()
		a+=ainc
		r-=rdec
		oldx=x
		oldy=y
	}
	// saveCanvas()
	t+=0.01
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
