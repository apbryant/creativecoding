setup=_=>{
	createCanvas(w=800,w)
	noFill()
	colors=shuffle(createCols("https://coolors.co/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529"))
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
r=300
a=0
ainc=100
rdec=10
s=strokes[int(random(strokes.length))]
	while(x<w-buf){

		if(y==w-buf){
			yinc*=-1
			x+=xinc
		} else if(y==buf) {
			yinc *= -1
			x+=xinc
		}

		d = dist(x,y,w/2,w/2)

		if(d<300){
      if(radians(a)%TAU==0){
        r-=rdec
      }
      a+=ainc
      stroke(s)
      push()
      rotate(sin(radians(x^y))*noise(x,y)*0.05)
      beginShape()
      vertex(oldx,oldy)
      nx=map(noise(x*scl,y*scl),0,1,xinc*-0.9,xinc*0.9)
      vertex(x+nx,y)
      endShape()
      pop()

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
