let colors,t,c;
let cnv;
var gif, recording = false;
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
  createCanvas(w=600,w)
  c=colors.pop(t=0)
  background(c)
noFill()
  stroke(random(colors))
  var start_rec = createButton("Start Recording");
      start_rec.mousePressed(saveVid);

      var stop_rec = createButton("Stop Recording");
      stop_rec.mousePressed(saveVid);

      start_rec.position(700, 500);
      stop_rec.position(700, 700);

      setupGIF();
}

function saveVid() {
    recording = !recording;
    if (!recording) {
        gif.render();
    }
}


    function setupGIF() {
    gif = new GIF({
        workers: 5,
        quality: 20
    });
    gif.on('finished', function(blob) {
        window.open(URL.createObjectURL(blob));
    });
}

draw=_=>{
  if (recording) {
          gif.addFrame(cnv.elt, {
              delay: 1,
              copy: true
          });
      }
  background(c)
  r = 400;
  a=0
  oldX = w/2+cos(a)*r
  oldY = w/2+sin(a)*r;
  a++
  while(r > 1){
    x=w/2+cos(a)*r
    y=w/2+sin(a)*r
    arc(w/2,w/2,r,r,a,a+PI*noise(t*r*0.01));
    a++
    r--;
  }
  t+=0.01
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
