let colors,t,c;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
  createCanvas(w=600,w)
  c=colors.pop(t=0)
  background(c)
noFill()
  stroke(random(colors))

    for(i=0;i<5;i++){
      stroke(random(colors))
      r = random(100,300);
      a=0
      a++
      cx=random(w)
      cy=random(w)
      while(r > 1){
        x=cx+cos(a)*r
        y=cy+sin(a)*r
        arc(x,y,r,r,a,a+PI*noise(t*r*0.01));
        a++
        r--;
      }
      t+=0.01
    }
}

draw=_=>{
  // background(c)


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
