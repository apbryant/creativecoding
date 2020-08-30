let colors,c;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
  createCanvas(w=600,w)
  c=colors.pop()
  background(c)
  fill(random(colors))
  noStroke()
  m = 0.2;
  while(m > 0.1) {
   makeRects(m);
   m *= 0.8;
  }
  fill(random(colors))
  circle(random(width), random(height), random(600));
}

makeRects = (m) => {
  l = random(width * m);
  w = random(height * m);
  buf = random(0.5, 2);
  fill(random(colors))
  if (l >= w) {
    x = 0;
    y = random(height);
    while (x < width) {
      rect(x, y, w, l);
      x += w + w * buf;
    }
  } else {
    y = 0;
    x = random(width);
    while (y < height) {
      rect(x, y, w, l);
      y += l + l * buf;
    }
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
