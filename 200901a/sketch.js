let colors,t,c;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
  createCanvas(w=600,w)
  c=colors.pop(t=0)
  background(c)
noFill()
  stroke(random(colors))
  strokeWeight(2)
  for(i=w*0.4;i<w*0.6;i++){
    t=0
    stroke(random(colors))
    oldx=0
    oldy=i
    for(x=w*-.5;x<w*1.5;x++){
      push()
      y=oldy+map(noise(t),0,1,-1,1)
      rotate(sin(radians(x))*.5)
      line(oldx,oldy,x,y)
      oldx=x
      oldy=y
      t+=0.01
      pop();
    }
  }
  saveCanvas()
}


draw=_=>{

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
