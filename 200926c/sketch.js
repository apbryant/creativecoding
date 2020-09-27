setup=_=>{
	createCanvas(w=800,w)
	background(255)
	noFill()
	colors=shuffle(createCols("https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4"))
	background(colors.pop())
	strokes=colors.slice(0,4)
	buf=50
	oldx=buf
	oldy=buf
	x=buf
	yinc=1
	xinc=3
	y=buf+1
	scl=0.003
	while(x<w-buf){
		if(y==w-buf){
			yinc*=-1
			x+=xinc
		} else if(y==buf) {
			yinc *= -1
			x+=xinc
		}
		d = dist(x,y,w/2,w/2)
		if(d<200){
			// Stroke color selection code from https://www.openprocessing.org/sketch/955170
			let nn = (noise(oldx *  0.003, oldy * 0.003) * strokes.length * 2) - 2;
			let index = int(constrain(nn, 0, strokes.length-1));
			let col = strokes[index];
			stroke(col)
			beginShape()
			vertex(oldx,oldy)
			nx=map(noise(x*scl,y*scl),0,1,xinc*-0.9,xinc*0.9)
			vertex(x+nx,y)
			endShape()
		} else {
			stroke(255)
			beginShape()
			vertex(oldx,oldy)
			vertex(x,y)
			endShape()
		}
		oldx=x
		oldy=y
		y+=yinc
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
