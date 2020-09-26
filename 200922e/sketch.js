t=0;colors=[];lines=[];setup=_=>{
	createCanvas(600,600)
	  colors=shuffle(createCols("https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c"))
		background(colors.pop())


	flowField()
	for(i=0;i<lines.length;i++){
		c=colors[int(random(colors.length))]
		fill(c);
		stroke(c);
		x=lines[i][0]
		y=lines[i][1]
		l=lines[i][2]
		a=lines[i][3]
		if(random(1)<0.2){
			line(x,y,x+cos(a)*l,y+sin(a)*l)
		}

	}
}

// function from https://www.openprocessing.org/sketch/955170
function flowField() {
	let num = 400;
	let w = width / num;
	for (let i = 0; i <= num; i++) {
		for (let j = 0; j <= num; j++) {
			let x = i * w;
			let y = j * w;
			let nScl = 0.001;
			let nStr = noise(x * nScl, y * nScl) * 80;
			let ang = noise(x * nScl, y * nScl) * nStr;
			let col = get(x, y);
			let len = random(50);
			lines.push([x, y, len, ang, col]);
		}
	}
}

// function from https://www.openprocessing.org/sketch/955794
function myLine(x1, y1, x2, y2) {
	let d = dist(x1, y1, x2, y2);
	let w = d * 0.3;
	beginShape();
	vertex(x1, y1);
	bezierVertex(x2, y2 - w * 0.5, x2 - w * 0.5, y2 - w * 0.1, x2, y2);
	bezierVertex(x2 + w * 0.5, y2 - w * 0.1, x2, y2 - w * 0.5, x1, y1);
	endShape();
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
