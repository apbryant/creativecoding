draw=_=>{
  frameRate(1)
  // https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4
  colors=shuffle(createCols("https://coolors.co/22223b-4a4e69-9a8c98-c9ada7-f2e9e4"))
  //https://coolors.co/03071e-370617-6a040f-9d0208-d00000-dc2f02-e85d04-f48c06-faa307-ffba08
  cnv=createCanvas(w=800,w)
  background(colors.pop())
  noStroke()
  fill(0)


  centers=[]
  num=int(random(3,11))
  for(j=1/num;j<=1-(1/num);j+=1/num){
    for(i=1/num;i<=1-(1/num);i+=1/num){
      centers.push(createVector(w*i,w*j))
    }
  }

  for(let cent of centers){
    cent.x+=map(noise(cent.x),0,1,-w*0.1,w*0.1)
    cent.y+=map(noise(cent.y),0,1,-w*0.1,w*0.1)
    n=6
    r=map(num,3,11,50,100)
    points=[]
    newPoints=[]
    for(a=0;a<TAU;a+=TAU/n){
      x=cent.x+cos(a)*r
      y=cent.y+sin(a)*r
      obj={"x":x,"y":y,"a":a,"r":r}
      points.push(obj)
    }
    for(i=0;i<points.length;i++){
      if(i==points.length-1){
        diff=abs(points[0].a-points[i].a)
      } else {
        diff=abs(points[i+1].a-points[i].a)
      }
      _r=random(points[i].r,points[i].r*1.1)
      _a=random(points[i].a,points[i].a+diff)
      x=cent.x+cos(_a)*_r
      y=cent.y+sin(_a)*_r
      obj={"x":x,"y":y,"a":_a,"r":_r}
      newPoints.push(points[i])
      newPoints.push(obj)
    }
    rmult=0.1
    jlim=5
    c=color(random(colors))
    for(j=0;j<jlim;j++){
      newPoints=[]
      for(i=0;i<points.length;i++){
        if(i==points.length-1){
          diff=abs(points[0].a-points[i].a)
        } else {
          diff=abs(points[i+1].a-points[i].a)
        }
        _r=random(points[i].r,points[i].r*(1+rmult))
        _a=random(points[i].a,points[i].a+diff)
        x=cent.x+cos(_a)*_r
        y=cent.y+sin(_a)*_r
        obj={"x":x,"y":y,"a":_a,"r":_r}
        newPoints.push(points[i])
        newPoints.push(obj)
      }
      rmult*=0.75
      points=newPoints
      c.setAlpha(map(j,0,jlim-1,100,10))
      fill(c)
      beginShape()
      for(let p of points)vertex(p.x,p.y)
      endShape(CLOSE)
    }
  }


  filename="img_"+str(Date.now())+".png"
  saveCanvas(cnv,filename)
  // noLoop()
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
