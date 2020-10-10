let unit;
let colors;
setup=_=>{
	createCanvas(w=windowWidth,h=windowHeight)
	colors=shuffle(createCols("https://coolors.co/0081a7-00afb9-fdfcdc-fed9b7-f07167"))
	background(0)
	uh=100
	uw=100
	unit=createGraphics(uw,uh)
	imageMode(CENTER)
	noStroke()
	for(x=0;x<w;x+=100){
		for(y=0;y<w;y+=100){
			drawUnit(unit)
			push()
			translate(x,y)
			image(unit,0,0,uw,uh)
			pop()
		}
	}
	saveCanvas()
}
drawUnit=(unit)=>{
	a=unit.width
	b=unit.height
	n=int(random(5,11))
	step=a/n
	for(i=0;i<10;i++){
		unit.fill(colors[int(random(colors.length))])
		unit.square((unit.width-a)/2,(unit.height-b)/2,a)
		a-=step
		b-=step
	}
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
