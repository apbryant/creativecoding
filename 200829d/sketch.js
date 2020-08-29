let colors,c;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9"))
  createCanvas(w=600,w)
  c=colors.pop()
  background(c)
  fill(random(colors))
  noStroke()
}
draw=_=>{
  background(c)
  beginShape();
  for(i=0;i<100;i++){
    x=map(f1(i,noise(i)),-w,w,0,w)
    y=map(f2(i,noise(i,i)),-w,w,0,w)
    vertex(x,y)
  }
  endShape()
}

f1=(i,j)=>{
  return tan(radians(i * j)) * w;
}

f2=(i,j)=>{
  return tan(radians(i * j)) * w;
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
