setup=_=>{
  createCanvas(w=800,w)
  background(255)
  fill(0)
  // noFill()
  stroke(0)
  noStroke()
  _p1=createVector(0,0)
  _p2=createVector(0,w)
  _p3=createVector(w,0)
  t=new Triangle(_p1.x,_p1.y,_p2.x,_p2.y,_p3.x,_p3.y)
  // t.show()
  // t.recurse(1,0)
  _p1=createVector(w,0)
  _p2=createVector(w,w)
  _p3=createVector(0,w)
  tt=new Triangle(_p1.x,_p1.y,_p2.x,_p2.y,_p3.x,_p3.y)
  // tt.show()
  tris=concat(t.triangleSplit(15,0),tt.triangleSplit(15,0))
  for(tri of tris){
    if(tri!=undefined){
      if(noise(tri.centroid.x*0.03^tri.centroid.y*0.03)<0.5){
        fill(0)
      }
      tri.show()
      fill(255)
    }

  }
  saveCanvas()
}
Triangle = function(_x1, _y1, _x2, _y2, _x3, _y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;
  this.centroid=createVector((_x1+_x2+_x3)/3, (_y1,_y2,_y3)/3)

  this.show = function() {
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
		// centroid=createVector((this.x1+this.x2+this.x3)/3,(this.y1+this.y2+this.y3)/3)
    // p=createVector(this.x1,this.y1)
    // q=createVector(this.x2,this.y2)
    // r=createVector(this.x3,this.y3)
		// for(e=0;e<1;e+=0.02){
    //
		// 	v1=p5.Vector.lerp(p,centroid,e)
		// 	v2=p5.Vector.lerp(q,centroid,e)
		// 	v3=p5.Vector.lerp(r,centroid,e)
		// 		beginShape()
		// 	vertex(v1.x,v1.y)
		// 	vertex(v2.x,v2.y)
		// 	vertex(v3.x,v3.y)
		// 	endShape(CLOSE)
		// }
  }

  this.triangleSplit=function(maxDepth,currentDepth){
    let arr
    if(currentDepth<maxDepth){
      p1=createVector(this.x1,this.y1)
      p2=createVector(this.x2,this.y2)
      p3=createVector(this.x3,this.y3)
      d1=p5.Vector.dist(p1,p2)
      d2=p5.Vector.dist(p2,p3)
      d3=p5.Vector.dist(p3,p1)
      arr=[d1,d2,d3]
      i=arr.indexOf(max(arr))

      let mp,t1,t2
      v=random(0.2,0.8)
      switch(i){
        case 1:

        mp=p5.Vector.lerp(p2,p3,v)
        // fill(255,0,0)
        // circle(mp.x,mp.y,10)
        // noFill()
        t1=new Triangle(p1.x,p1.y,mp.x,mp.y,p2.x,p2.y)
        t2=new Triangle(p1.x,p1.y,mp.x,mp.y,p3.x,p3.y)
        break

        case 2:
        mp=p5.Vector.lerp(p1,p3,v)
        // fill(255,0,0)
        // circle(mp.x,mp.y,10)
        // noFill()
        t1=new Triangle(p2.x,p2.y,mp.x,mp.y,p3.x,p3.y)
        t2=new Triangle(p2.x,p2.y,mp.x,mp.y,p1.x,p1.y)
        break

        case 0:
        mp=p5.Vector.lerp(p1,p2,v)
        // fill(255,0,0)
        // circle(mp.x,mp.y,10)
        // noFill()
        t1=new Triangle(p3.x,p3.y,mp.x,mp.y,p1.x,p1.y)
        t2=new Triangle(p3.x,p3.y,mp.x,mp.y,p2.x,p2.y)
        break
      }
      arr=[t1,t2]
      if(random()<1){
        arr=concat([t1,t2],t1.triangleSplit(maxDepth,currentDepth+1))
        arr=concat(arr,t2.triangleSplit(maxDepth,currentDepth+1))
      }

      return arr
    }

  }
  this.recurse = function(maxDepth, currentDepth){
    if(currentDepth<maxDepth){
      arr=this.triangleSplit()
      t1=arr[0]
      t2=arr[1]
      stroke(255,0,0)
      t1.show()
      noStroke()
      stroke(0,255,0)
      t2.show()
      noStroke()
      t1.recurse(maxDepth,currentDepth+1)
      t2.recurse(maxDepth,currentDepth+1)
    }
  }
}