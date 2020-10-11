setup=_=>{
	createCanvas(w=800,w)
	colors=shuffle(createCols("https://coolors.co/227c9d-17c3b2-ffcb77-fef9ef-fe6d73"))
	background(colors.pop())
	stroke(255)
	strokeWeight(2)
	for(j=0;j<10;j++){
		oldx=w/2
		oldy=w/2
		stroke(colors[int(random(colors.length))])
		for(i=0;i<500;i++){
			translate(oldx,oldy)
			if(int(random(10))%2){
				rotate(TAU/6)
			} else {
				rotate(-TAU/6)
			}
			beginShape()
			x=20
			y=20
			line(0,0,x,y)
			oldx=x
			oldy=y
			endShape()
		}
	}
}
draw=_=>{
	frameRate(1)
	colors=shuffle(createCols("https://coolors.co/227c9d-17c3b2-ffcb77-fef9ef-fe6d73"))
	background(colors.pop())
	stroke(255)
	strokeWeight(2)
	for(j=0;j<10;j++){
		oldx=w/2
		oldy=w/2
		stroke(colors[int(random(colors.length))])
		for(i=0;i<500;i++){
			translate(oldx,oldy)
			if(int(random(11))%2){
				rotate(TAU/6)
			} else {
				rotate(-TAU/6)
			}
			beginShape()
			x=20
			y=20
			line(0,0,x,y)
			oldx=x
			oldy=y
			endShape()
		}
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
