

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


draw=_=>{
  frameRate(1)
  createCanvas(w=800, w);
  colors=shuffle(createCols("https://coolors.co/353535-3c6e71-ffffff-d9d9d9-284b63"))
  background(colors.pop());
  fill(colors[int(random(colors.length))])
  noStroke()
  for(i=0;i<15;i++){
    fill(colors[int(random(colors.length))])
    x=random(-w*0.1,w)
    y=random(w*0.75,w*0.9)
    wi=random(w/4,w/2)
    he=random(w/4,w/2)
    m=int(random(10))%2==0?1:-1
    yoff=he*random(0,0.05)*m
    beginShape()
    vertex(x,y)
    vertex(x+wi,y-yoff)
    vertex(x+wi,y+he)
    vertex(x,y+he)
    endShape(CLOSE)
    buf=20
    f=random(2,20)
    g=random(2,20)


    for(u=x+buf;u+f<x+wi-buf;u+=f*1.5)for(v=y+buf;v+g<y+he-buf;v+=g*1.5){
      fill(0)
      square(u,v,f)
    }
  }
  // saveCanvas()
}
