setup=_=>{
	colors=shuffle(createCols("https://coolors.co/ff9f1c-ffbf69-ffffff-cbf3f0-2ec4b6"))
	createCanvas(w=800,w)
	background(colors.pop())
	noStroke()
	makerects()
	makelines()
}

makerects=_=>{

	for(i=0;i<5;i++){
		fill(colors[int(random(colors.length))])
		stroke(0)
		wi=random(w*0.8)
		hi=random(w*0.8)
		x=random(w)
		y=random(w)
		rect(x,y,wi,hi)
	}
}
makelines=_=>{
	stroke(0)
	for(i=0;i<2;i++){
		y=random(w)
		line(0,y,w,y)
	}
	noStroke()
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
