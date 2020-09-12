// bg code from samaya: https://www.openprocessing.org/user/159668
let bg;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/ffa69e-faf3dd-b8f2e6-aed9e0-5e6472"))
  createCanvas(w=600,w)
  background(c=colors.pop(t=0))
  noFill(a=0)
  bg = createGraphics(width, height);
  bg.noStroke();
  for (let i = 0; i < 300000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x*0.01, y*0.01) + 0.5;
		bg.fill(255,50);
    bg.rect(x, y, s, s);
  }
  while(a<TAU){
    stroke(random(colors))
    d=map(noise(t*0.001),0,1,400,500)
    while(d>1){
      arc(w/2,w/2,d,d,map(noise(t*d*0.001),0,1,a,QUARTER_PI+a),a+PI*noise(t*d*0.001))
      d--;
      t+=0.1
    }
    a+=random(TAU/6,TAU/3)
  }
  image(bg,0,0);
  saveCanvas()
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
