function draw() {
	frameRate(1)
	colors=shuffle(createCols("https://coolors.co/f94144-f3722c-f8961e-f9c74f-90be6d-43aa8b-577590"))
	createCanvas(w=800,w)
	background(colors.pop())
	lines(numSegments)
	findIntersections();
	for (let segment of segments) {
    segment.draw();
  }
  stroke(255,0,0);
  for(let intersection of intersections){
	 noStroke()
	 if(random()<0.5){
		 fill(random(colors))
		 circle(intersection.x, intersection.y, 20)
		 fill(random(colors))
		 circle(intersection.x, intersection.y, 10)
	 } else {
		 push()
		 translate(intersection.x, intersection.y)
		 sw=20
		 rotate(PI/4)
		 square(-sw/2,-sw/2,sw)
		 fill(random(colors))
		 sw=10
		 square(-sw/2,-sw/2,sw)
		 pop()
	 }
  }
}



// Adapted from https://www.openprocessing.org/sketch/983174/
function lines(num) {
	segments=[]
	stroke(0);
	noFill();
	for (let i = 0; i < num; i++) {
		let x = random(-0.1, 1.1) * w;
		let y = random(-0.1, 1.1) * w
		let len = int(random(1, 4)) * 200;
		strokeWeight(random(0.5, 2));
		if(random()<0.5)len*=-1
		let p2;
		if(random()<0.5){
			p2=new Point(len,y)
		} else {
			p2=new Point(x,len)
		}
		p1=new Point(x,y)
		line(x, y, p2.x, p2.y);
		segments.push(new Segment(p1,p2))
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

// Line segment code adapted from https://wblut.com/line/
let segments,intersections;
let numSegments=30

findIntersections=()=>{
	let segment1,segment2,intersection
	intersections=[]
	for(i=0;i<numSegments;i++){
    segment1=segments[i];
    for(j=i+1;j<numSegments;j++){
      segment2=segments[j];
      intersection=getIntersection(segment1,segment2);
      if(intersection!=null) intersections.push(intersection);
    }
  }
}


getIntersection=(segment1,segment2)=>{
	x1=segment1.start.x;
  y1=segment1.start.y;
  x2=segment1.end.x;
  y2=segment1.end.y;
  x3=segment2.start.x;
  y3=segment2.start.y;
  x4=segment2.end.x;
  y4=segment2.end.y;

	ua=(x4-x3)*(y1-y3)-(y4-y3)*(x1-x3);
  denominator=(y4-y3)*(x2-x1)-(x4-x3)*(y2-y1);

	if(abs(denominator)<0.0001) return null;
  ua/=denominator;

	if(ua<0 || ua>1){
	    return null;
	  }

	  ub=(x2-x1)*(y1-y3)-(y2-y1)*(x1-x3);
	  ub/=denominator;

	  if(ub<0 || ub>1){
	    return null;
	  }
  xi=x1+ua*(x2-x1);
  yi=y1+ua*(y2-y1);

  return new Point(xi, yi);
}

Point=function(x,y){
	this.x=x
	this.y=y
}

Segment=function(start,end){
	this.start=new Point(start.x,start.y)
	this.end=new Point(end.x,end.y)
	this.draw=()=>{
		c=random(colors)
		fill(c);
    stroke(random(c));
    line(start.x, start.y, end.x, end.y);
    ellipse(start.x, start.y,3,3);
    ellipse(end.x, end.y,3,3);
	}
}
