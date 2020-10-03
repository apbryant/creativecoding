function setup() {

	createCanvas(w=windowWidth, h=windowHeight);
	colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))


	let d = height * 0.2;
	let stop = d*0.5;

	background(colors.pop());
	noStroke();
	circles(w/4,h/2,d,stop)
	circles(w*3/4,h/2,d,stop)
	strokes=colors
	s=strokes.pop()
	ss=strokes.pop()

	stroke(s)
	scl=0.001
	for(x=0;x<w;x++){
		stroke(s)
		nx=map(noise(x*scl),0,1,-20,20)
		l=h * 0.2 + sin(radians(x))*50+sin(nx)*20
		line(x,h,x,h-l)
		stroke(ss)
		line(x,h,x,h-l*map(noise(x*scl),0,1,0.8,0.9))
	}
	lines=[];
	flowField()
	for(let i=0; i<lines.length; i++){
		let x = lines[i][0];
		let y = lines[i][1];
		let len = lines[i][2];
		let ang = lines[i][3];
		let col = color(lines[i][4]);
		col.setAlpha(80);
		push();
		translate(x, y);
		rotate(ang);
		stroke(col);
		line(0, 0, 0, len);
		pop();
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

// Function from https://www.openprocessing.org/sketch/955170
function flowField() {
	let num = 1000;
	let wi = w / num;
	hi=h/num
	for (let i = 0; i <= num; i++) {
		for (let j = 0; j <= num; j++) {
			let x = i * wi;
			let y = j * hi;
			let nScl = 0.0004;
			let nStr = noise(x * nScl, y * nScl) * 80;
			let ang = noise(x * nScl, y * nScl) * nStr;
			let col = get(x, y);
			let len = random(50);
			lines.push([x, y, len, ang, col]);
		}
	}
}

circles=(x,y,d,stop)=>{
	let t = 0;
	let u = 0;
	let f = 250;
	let noiseMax = 1;
	let phase = 0;
	push()
	translate(x, y);
	while (d > stop) {
		fill(colors[int(random(colors.length))]);
		beginShape();

		for (let a = 0; a < TWO_PI; a += 0.1) {
			let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
			let yoff = map(sin(a+phase), -1, 1, 0, noiseMax);
			let r = map(noise(xoff, yoff), 0, 1, d * .7, d);
			let x = r * cos(a);
			let y = r * sin(a);
			vertex(x, y);
			xoff += 0.01;
			yoff += 0.01;
		}

		endShape(CLOSE);
		d *= map(noise(t), 0, 1, 0.6, 0.95);
		f *= map(noise(u), 0, 1, 0.6, 0.9);
		t += 0.01;
		u += 0.01;
		phase += 0.2;
	}
	pop()
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
