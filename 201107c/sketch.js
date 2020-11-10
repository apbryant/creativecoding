setup=_=>{
  createCanvas(w=800,w)
  background(255)
  fill(0)
  noFill()
  stroke(0)
  p1=createVector(random(w),random(w))
  p2=createVector(random(w),random(w))
  p3=createVector(random(w),random(w))
  t=new Triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y)
  t.show()
  t.recurse(5,1)
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

  this.triangleSplit=function(){
    p1=createVector(this.x1,this.y1)
    p2=createVector(this.x2,this.y2)
    p3=createVector(this.x3,this.y3)
    d1=p5.Vector.dist(p1,p2)
    d2=p5.Vector.dist(p2,p3)
    d3=p5.Vector.dist(p3,p1)
    arr=[d1,d2,d3]
    i=arr.indexOf(max(arr))

    let mp,t1,t2
    v=random(0.4,0.6)
    switch(i){
      case 1:
      mp=p5.Vector.lerp(p2,p3,v)
      t1=new Triangle(p1.x,p1.y,mp.x,mp.y,p2.x,p2.y)
      t2=new Triangle(p1.x,p1.y,mp.x,mp.y,p3.x,p3.y)
      break

      case 2:
      mp=p5.Vector.lerp(p1,p3,v)
      t1=new Triangle(p2.x,p2.y,mp.x,mp.y,p3.x,p3.y)
      t2=new Triangle(p2.x,p2.y,mp.x,mp.y,p1.x,p1.y)
      break

      case 0:
      mp=p5.Vector.lerp(p1,p2,v)
      t1=new Triangle(p3.x,p3.y,mp.x,mp.y,p1.x,p1.y)
      t2=new Triangle(p3.x,p3.y,mp.x,mp.y,p2.x,p2.y)
      break
    }
    return [t1,t2]
  }
  this.recurse = function(maxDepth, currentDepth){
    if(currentDepth<=maxDepth){
      arr=this.triangleSplit()
      t1=arr[0]
      t2=arr[1]
      t1.show()
      t2.show()
      if(random()<0.5)t1.recurse(maxDepth,currentDepth+1)
      if(random()<0.5)t2.recurse(maxDepth,currentDepth+1)
    }

  }
}
