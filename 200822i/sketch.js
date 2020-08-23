setup=_=>{
  colors=shuffle(createCols("https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9"))
  createCanvas(w=600,w)
  background(colors.pop())
  stroke(random(colors))
  for(i=0;i<w;i++){
    off=sin(i)*100
    buf=off*0.02
    line(w/2-off,i,w/2+off,i)
    stroke(random(colors))
    line(w/2-off+buf,i,w/2+off-buf,i)
  }
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
