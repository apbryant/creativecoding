let unit;
let colors;
u=0
draw=_=>{
  scl=0.003
	frameRate(1)
	createCanvas(w=windowWidth,h=windowHeight)
	colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
	background(0)
	uh=50
	uw=uh
	unit=createGraphics(uw,uh)
	imageMode(CENTER)
	noStroke()
	tt= new Triangle(new p5.Vector(w/2,w/2),uh,unit);
	translate(w/2,h/2)
	rotate(PI/6)
	for(x=-w;x<w*2;x+=uw){
		c=0
		for(y=-h;y<h*2;y+=tt.ml){
			drawUnit(unit)
			push()
			xoff=c%2==0?0:uw/2
			translate(x+xoff,y)
			if(noise(x*scl,y*scl,u*scl)<0.5)image(unit,0,0,uw,uh)

			pop()
			c++
		}
	}
	for(x=-w;x<w*2;x+=uw){
		c=0
		for(y=-h;y<h*2;y+=tt.ml){
			drawUnit(unit)
			push()
			xoff=c%2==0?uw/2:0
			translate(x+xoff,y)
			rotate(PI)

			if(noise(x*scl,y*scl,u*scl)<0.5)image(unit,0,0,uw,uh)
			pop()
			c++
		}
	}
  u+=0.5
}
drawUnit=(unit)=>{
	unit.noStroke()
	a=unit.width
	b=unit.height
	n=int(random(5,11))

	unit.fill(colors[int(random(colors.length))])
	t = new Triangle(new p5.Vector(a/2,b/2),uh,unit);
  t.show()
}

// Function from https://www.openprocessing.org/sketch/973782
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

Triangle= function(center, sideLength,unit) {
	this.c=center
	this.l=sideLength
	this.unit=unit
	midLine = sin(radians(60)) * sideLength;
	this.ml=midLine
	halfBottomLine = sqrt(sideLength*sideLength - midLine*midLine);
	blx = center.x - halfBottomLine;
	bly = center.y + midLine/2;
	this.bl = new p5.Vector(blx,bly);
	brx = center.x + halfBottomLine;
	bry = center.y + midLine/2;
	this.br=new p5.Vector(brx,bry)
	this.top=new p5.Vector(center.x, center.y - midLine/2);

	this.show=_=>{
	   this.unit.triangle(this.bl.x, this.bl.y, this.top.x, this.top.y, this.br.x, this.br.y);
	}
}
