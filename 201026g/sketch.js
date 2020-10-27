setup=_=>{
	createCanvas(w=800,w)
	points=[]
	background(255)
	// noFill()
	noStroke()
	colors=createCols("https://coolors.co/e63946-f1faee-a8dadc-457b9d-1d3557")
	n=10
	for(i=0;i<n;i++){
		p=createVector(random(w),random(w))
		// circle(p.x,p.y,10)
		points.push(p)
	}
	for(i=0;i<n;i++){
		c=color(random(colors))
		c.setAlpha(100)
		fill(c)
		noFill()
		stroke(c)
		idx=int(random(n))
		p=points[idx]
		distances=[]
		for(j=0;j<n;j++){

			if(j!=idx){
				d=dist(p.x,p.y,points[j].x,points[j].y)
				distances.push({"num":j,"d":d})
			}
		}

		distances.sort((a,b)=>b.d-a.d)

		q=points[distances[0].num]
		r=points[distances[1].num]
		centroid=createVector((p.x+q.x+r.x)/3,(p.y+q.y+r.y)/3)
		for(k=0;k<1;k+=0.02){

			v1=p5.Vector.lerp(p,centroid,k)
			v2=p5.Vector.lerp(q,centroid,k)
			v3=p5.Vector.lerp(r,centroid,k)
				beginShape()
			vertex(v1.x,v1.y)
			vertex(v2.x,v2.y)
			vertex(v3.x,v3.y)
			endShape(CLOSE)
		}


	}
	// saveCanvas()

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
