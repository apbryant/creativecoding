setup=_=>{
	createCanvas(w=800,w)
	background(255)
	noFill()
	colors=shuffle(createCols("https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4"))
	background(colors.pop())
	strokes=colors.slice(0,4)
	c=colors[int(random(colors.length))]
	stroke(c)
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
		beginShape()
		vertex(oldx,oldy)
		nx=map(noise(x*scl,y*scl),0,1,xinc*-0.9,xinc*0.9)
		vertex(x+nx,y)
		endShape()
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
		stroke(c)
		beginShape()
		vertex(oldx,oldy)
		ny=map(noise(x*scl,y*scl),0,1,yinc*-0.9,yinc*0.9)
		vertex(x,y+ny)
		endShape()
		oldx=x
		oldy=y
		x+=xinc
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
