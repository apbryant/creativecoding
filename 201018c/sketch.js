let unit;
let colors;
setup=_=>{
	createCanvas(w=windowWidth,h=windowHeight)
	colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
	background(colors.pop())
  strokes=colors.slice(0,4)
	uh=50
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
			drawUnit(unit,x,y)
      scl=0.003

    unit.noStroke()
			if(noise(x*scl,y*scl)<0.5)image(unit,0,0,uw,uh)
			pop()
		}
		i++
	}
	// saveCanvas()
}
drawUnit=(unit,xx,yy)=>{
	unit.noFill()
	a=unit.width
	b=unit.height
  // Stroke color selection code from https://www.openprocessing.org/sketch/955170
let nn = (noise(xx *  0.003, yy * 0.003) * strokes.length * 2) - 2;
let index = int(constrain(nn, 0, strokes.length-1));
let col = strokes[index];
unit.fill(col)
	unit.noStroke()
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
