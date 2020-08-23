let bg;
setup=_=>{
  colors=createCols("https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9")
  shuffle(colors)
  createCanvas(w=600,w)
  background(colors.pop())
  bgcolors=createCols("coolors.co/eddcd2-fff1e6-fde2e4-fad2e1-c5dedd-dbe7e4-f0efeb-d6e2e9-bcd4e6-99c1de")
  shuffle(bgcolors)
  noStroke()
  bg = createGraphics(w, w)
  bg.background(bgcolors.pop())
  bg.fill(random(bgcolors))
  fill(random(colors))
  for(i=0;i<w;i+=20){
    push()
    translate(0,i)
    rotate(random(-0.05,0.05))
    rect(-50,i,w*2,10)
    pop()
    push()
    translate(i,0)
    rotate(random(-0.05,0.05))
    rect(i,-50,10,w*2)
    pop()
  }
}
draw=_=>{image(bg,w/2,w/2);image(bg,-w/2,-w/2);saveCanvas();noLoop()}

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
