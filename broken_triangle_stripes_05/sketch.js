draw=_=>{
  frameRate(1)
  cnv=createCanvas(w=800,h=1500)
  background(255)
  fill(0)
  // noFill()
  fill(0)
  stroke(0)
  y=h*0.2
  points=[]
  while(y<h*0.8){
    maxleft=w*0.5-w*0.1
    maxright=w*0.5+w*0.1

    x=random(maxleft,maxright)
    points.push(createVector(x,y))
    // fill(0)
    // circle(x,y,10)
    y+=random(h*.05,h*0.1)
  }
  noFill()
  for(k=0;k<points.length-2;k++){
    t=new Triangle(points[k].x,points[k].y,points[k+1].x,points[k+1].y,points[k+2].x,points[k+2].y)
    // t.show()
    tris=t.triangleSplit(6,0)
    for(tri of tris){
      if(tri!=undefined){
        cent = tri.centroid
        rnd=map(pow(cent.y,2),pow(h*0.1,2),pow(h*0.9,2),0.9,0.2)
        if(random()<rnd)tri.show()
      }
    }
  }
  filename="img_"+str(Date.now())+".png"
  saveCanvas(cnv, filename)
}
Triangle = function(_x1, _y1, _x2, _y2, _x3, _y3) {
  this.x1 = _x1;
  this.y1 = _y1;
  this.x2 = _x2;
  this.y2 = _y2;
  this.x3 = _x3;
  this.y3 = _y3;
  this.centroid=createVector((_x1+_x2+_x3)/3,(_y1+_y2+_y3)/3)

  this.show = function() {
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
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
      if(random()<0.8){
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
      if(random()<0.5)t1.show()
      if(random()<0.5)t2.show()
      if(random()<1){
          t1.recurse(maxDepth,currentDepth+1)
          t2.recurse(maxDepth,currentDepth+1)
      }
    }
  }
}
