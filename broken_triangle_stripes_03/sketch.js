draw=_=>{
  frameRate(1)
  cnv=createCanvas(w=2000,w)
  background(255)
  fill(0)
  // noFill()
  fill(0)
  stroke(0)
  for(j=0;j<4;j++){
    y=w*0.1
    points=[]
    while(y<w*0.9){
      maxleft=w*(0.2*(j+1))-w*0.05
      maxright=w*(0.2*(j+1))+w*0.05

      x=random(maxleft,maxright)
      points.push(createVector(x,y))
      fill(0)
      if(j==0)circle(x,y,10)

      y+=random(w*.05,w*0.1)
    }
    noFill()
    for(k=0;k<points.length-2;k++){
      t=new Triangle(points[k].x,points[k].y,points[k+1].x,points[k+1].y,points[k+2].x,points[k+2].y)
      if(j==1)t.show()
      tris=t.triangleSplit(5,0,j)
      if(j==0)tris=[undefined]
      for(tri of tris){
        if(tri!=undefined){
          if(j==3){
            if(random()<0.4)tri.show()
          }else{
            tri.show()
          }
        }
      }
    }
  }
  filename="img_"+str(Date.now())+".png"
  saveCanvas(cnv,filename)
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

  this.triangleSplit=function(maxDepth,currentDepth,j){
    let arr
    if(j<2){
      return [undefined]
    } else {
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
          // if(j==2){
          //   fill(255,0,0)
          //   circle(mp.x,mp.y,10)
          //   noFill()
          // }

          t1=new Triangle(p1.x,p1.y,mp.x,mp.y,p2.x,p2.y)
          t2=new Triangle(p1.x,p1.y,mp.x,mp.y,p3.x,p3.y)
          break

          case 2:
          mp=p5.Vector.lerp(p1,p3,v)
          // if(j==2){
          //   fill(255,0,0)
          //   circle(mp.x,mp.y,10)
          //   noFill()
          // }
          t1=new Triangle(p2.x,p2.y,mp.x,mp.y,p3.x,p3.y)
          t2=new Triangle(p2.x,p2.y,mp.x,mp.y,p1.x,p1.y)
          break

          case 0:
          mp=p5.Vector.lerp(p1,p2,v)
          // if(j==2){
          //   fill(255,0,0)
          //   circle(mp.x,mp.y,10)
          //   noFill()
          // }
          t1=new Triangle(p3.x,p3.y,mp.x,mp.y,p1.x,p1.y)
          t2=new Triangle(p3.x,p3.y,mp.x,mp.y,p2.x,p2.y)
          break
        }
        arr=[t1,t2]
        if(random()<0.8){
          arr=concat([t1,t2],t1.triangleSplit(maxDepth,currentDepth+1),j)
          arr=concat(arr,t2.triangleSplit(maxDepth,currentDepth+1),j)
        }
        return arr
      }
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
