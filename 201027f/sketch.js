setup=_=>{
	createCanvas(w=800,w)
	background(255)
	stroke(0)
	noFill()
	strokeWeight(2)
	segments=[]
		intersections=[]
	for(i=0;i<100;i++){
		pt1=random(w*0.1,w*0.9)
		pt2=random(w*0,w*0.1)
		p1=new Point(pt1,pt2)
		ang=atan(dist(pt1,pt2,w/2,w/2))
		p2=new Point(pt1+cos(ang)*10,pt2+sin(ang)*10)
		segment=new Segment(p1,p2)
		add=true
		if(segments.length>0){
			for(let seg of segments){
				u=getIntersection(segment,seg)
				if(u!=null){
					segment.end=u;
					segment.keepGrowing=false;
				}
			}
		}
		segments.push(segment)
	}
	checkedIntersections=[]
	for(i=0;i<30;i++){
		// findIntersections()
		// numSegments=segments.filter(e=>e.keepGrowing==true).length
		// print(numSegments)
			linesToAdd=[]
		for(g=0;g<segments.length;g++){
	    segment1=segments[g];
	    for(j=g+1;j<segments.length;j++){
	      segment2=segments[j];
	      intersection=getIntersection(segment1,segment2);
				cond1=intersection!=null
				cond2=!checkedIntersections.includes(intersection)
				cond3=!joints.includes(intersection)
	      if(cond1&&cond2&&cond3)intersections.push(intersection)
				if(cond1&&cond2&&cond3){
					checkedIntersections.push(intersection)
					segments[g].end=intersection
					segments[g].keepGrowing=false
					re=segments[int(random(segments.length))]
					st=re.start
					d=re.dir
					distance=dist(re.end.x,re.end.y, re.start.x,re.start.y)
					px=st.x+cos(d)*random(distance)
					py=st.y+sin(d)*random(distance)
					e = d+QUARTER_PI
					qx=px+cos(e)*random(20,50)
					qy=py+sin(e)*random(20,50)
					// linesToAdd.push(new Segment(new Point(px,py), new Point(qx, qy)))
					// segments[g].end.x-=cos(TAU+PI)
					// segments[g].end.y-=sin(TAU+PI)
				}
	    }
			// print(numSegments)

	  }
		print("lta: " + linesToAdd)
			if(linesToAdd.length>0){
				for(let el of linesToAdd){
					for(let s of segments){
						si = getIntersection(el,s)
						if(si!=null){
							el.end=si
							el.keepGrowing=false;
							checkedIntersections.push(si)
						}
					}
					segments.push(el);
				}
			}
		lim=segments.length
		for(k=0;k<lim;k++){
			if(segments[k].keepGrowing==true)segments[k].grow()
		}
		// for(let seg of segments){
		// 	if(seg.keepGrowing==true)seg.grow()
		// }
	}
	for(let seg of segments) seg.draw()
	// print(intersections)
	// fill(255,0,0)
	// for(let e of intersections)circle(e.x,e.y,2)
	saveCanvas()
}
joints=[]
// Line segment code adapted from https://wblut.com/line/
let segments,intersections;
findIntersections=()=>{
	let segment1,segment2,intersection
	intersections=[]
	for(i=0;i<numSegments;i++){
    segment1=segments[i];
    for(j=i+1;j<numSegments;j++){
      segment2=segments[j];
      intersection=getIntersection(segment1,segment2);
      if(intersection!=null) intersections.push(intersection);
			if(intersection!=null){
				segments[i].keepGrowing=false
				// segments[i].end.x-=cos(TAU+PI)
				// segments[i].end.y-=sin(TAU+PI)
			}
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
	this.midPoints=[]
	this.end=new Point(end.x,end.y)
	this.dir=random(TAU)
	d=dist(end.x,end.y,w/2,w/2)
	this.dir=atan(d)
	this.keepGrowing=true
	this.draw=()=>{
    stroke(map(this.start.y,0,w,125,0));
		strokeWeight(map(this.start.y,0,w,1,5))
		// beginShape()
		// noFill()
		// vertex(this.start.x,this.start.y)
		// for(let vtx of this.midPoints)vertex(vtx.x,vtx.y)
		// vertex(this.end.x,this.end.y)
		// endShape()
		line(this.start.x,this.start.y,this.end.x,this.end.y)
	}
	this.grow=()=>{
		this.midPoints.push(createVector(this.end.x,this.end.y))
		p=new Point(this.end.x,this.end.y)
		e = this.end.x+cos(this.dir)*random(20,50)
		f = this.end.y+sin(this.dir)*random(20,50)
		q=new Point(e,f)
		pq=new Segment(p,q)
		pq.dir=this.dir+random(-TAU*15/360,TAU*15/360)
		segments.push(pq)
		joints.push(p)
		// this.dir+=random(-TAU*15/360,TAU*15/360)
	}
}
