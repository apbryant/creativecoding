let rects;
let bg;
setup=_=>{
	rects=[]
	createCanvas(w=800,w)
	colors=createCols("https://coolors.co/003049-d62828-f77f00-fcbf49-eae2b7")
	bg=color(colors.pop())
	background(bg)
	fill(255)
	noStroke()
	rw=200
	rh=500
	createRect(200,500,createVector(w/2,w/2))
	createRect(200,300,createVector(w/2-rw/2,w/2))
	createRect(200,300,createVector(w/2+rw/2,w/2))
	createRect(200,150,createVector(w/2-rw/2-300/2,w/2))
	createRect(200,150,createVector(w/2+rw/2+300/2,w/2))
}
draw=_=>{
	background(bg)
	for(let r of rects){
		r.show()
	}
}
Rectangle=function(x,y,w,h,col){
	this.x=x
	this.y=y
	this.w=w
	this.h=h
	this.col=col
	this.t=random(100000)
	this.show=()=>{
		this.col.setAlpha(100)
		fill(col)
		scl=0.003
		x=this.x+map(noise(this.t*scl,this.x*scl),0,1,-20,20)
		y=this.y+map(noise(this.t*scl,this.y*scl),0,1,-20,20)
		this.t+=0.5
		rect(x,y,this.w,this.h)
	}
}
createRect=(rw,rh,c)=>{
	col = color(random(colors))
	col.setAlpha(100)
	fill(col)
	x=c.x-rw/2
	y=c.y-rh/2
	scl=0.003
	x+=map(noise(frameCount*scl,x*scl),0,1,-20,20)
	y+=map(noise(frameCount*scl,y*scl),0,1,-20,20)
	r=new Rectangle(x,y,rw,rh,col)
	r.show()
	rects.push(r)
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
