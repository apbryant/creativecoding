let unit;
let colors;
setup=_=>{
	createCanvas(w=windowWidth,h=windowHeight)
	colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
	background(colors.pop())
	background(255)
	uh=100
	uw=uh
	unit=createGraphics(uw,uh)
	imageMode(CENTER)
	noStroke()
	i=0
	d=uh * sqrt(3) / 2
	yinc=uh * sqrt(3) / 2
	xinc=uw/4
	for(x=-w;x<w*2;x+=uw-d/4-uw*0.02){
		for(y=-h;y<h*2;y+=yinc){
			push()
			yoff=i%2==0?d/2:0
			xoff=0
			translate(x+xoff,y+yoff)

			rotate(PI/6)
			drawUnit(unit)
			image(unit,0,0,uw,uh)
			pop()
		}
		i++
	}
	saveCanvas()
}
drawUnit=(unit)=>{
	unit.noFill()
	a=unit.width
	b=unit.height
	// n=int(random(5,11))

	// unit.fill(colors[int(random(colors.length))])
	unit.stroke(0)
	// unit.strokeWeight(7)
	// t = new Triangle(new p5.Vector(a/2,b/2),uh,unit);
	// t.show()
	n=6
	r=a/2
	ang = 0;
    aInc = 360 / n;
    let x = a/2
    let y = b/2

    unit.beginShape();

    for (let i = 0; i <= n; i++) {
      let vx = x+ (r * sin(radians(ang)));
      let vy =  x + (r * cos(radians(ang)));
      unit.vertex(vx, vy);
      ang += aInc;
    }
    unit.endShape();

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

	this.recalculate=_=>{
		midLine = sin(radians(60)) * this.l;
    halfBottomLine = sqrt(this.l*this.l - midLine*midLine);
    blx = c.x - halfBottomLine;
    bly = c.y + midLine/2;
    this.bl = new p5.Vector(blx, bly);
    brx = c.x + halfBottomLine;
    bry = c.y + midLine/2;
    this.br = new p5.Vector(brx, bry);
    this.top = new p5.Vector(c.x, c.y - midLine/2);
	}

	this.show=_=>{
	   this.unit.triangle(this.bl.x, this.bl.y, this.top.x, this.top.y, this.br.x, this.br.y);
	}
	this.edges=_=> {
    if (this.c.x > width) {
      this.c.x = 0;
    } else if (this.c.x < 0) {
      this.c.x = width;
    }
    if (this.c.y > height) {
      this.c.y = 0;
    } else if (this.c.y < 0) {
      this.c.y = height;
    }
  }
}
