setup=_=>{
  createCanvas(w=800,w)
  background(255)
  fill(0)
  noFill()
  stroke(0)
  r=300
  c=createVector(w/2,w/2)
  circle(c.x,c.y,r*2)
  points=[]
  a=0
  while(a<TAU){
    points.push(createVector(c.x+cos(a)*r,c.y+sin(a)*r))
    a+=random(TAU/20,TAU/10)
  }
  for(i=0;i<50;i++){
    vec=createVector(random(w+r),random(w-r))
    if(p5.Vector.dist(vec,c)<r){
      points.push(vec)
    }
  }
  shuffle(points)
  for(k=0;k<points.length;k++){
    distances=[]
    idx=k
    p=points[idx]

    for(j=0;j<points.length;j++){
      if(j!=idx){
        d=p5.Vector.dist(p,points[j])
        distances.push({"num":j,"d":d})
      }
    }

    distances.sort((a,b)=>a.d-b.d)
    v1=points[distances[0].num]
    v2=points[distances[1].num]
    v3=points[distances[2].num]
    t=new Triangle(v1.x,v1.y,v2.x,v2.y,v3.x,v3.y)
    // t.show()
    tris=t.triangleSplit(5,0)
    print(tris)
    for(tri of tris){
      if(tri!=undefined)tri.show()
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
      f=map(noise(t1.y1),0,w,)
      if(random()<noise(t1.y1))t1.show()
      if(random()<noise(t2.y1))t2.show()
      if(random()<map(t1.y1,0,w,1,0)){
          t1.recurse(maxDepth,currentDepth+1)
          t2.recurse(maxDepth,currentDepth+1)
      }
    }
  }
}
