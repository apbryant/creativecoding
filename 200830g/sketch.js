let colors,t,c;

  chunks = [];

let stream, recorder;
function record() {
  chunks.length = 0;

  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.start();
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement('video');
  vid.id = 'recorded'
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}
let cnv;
var gif, recording = false;
let w=600
setup=_=>{
  colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"))
  cnv=createCanvas(600,600)
  c=colors.pop(t=0)
  background(c)
noFill()
  stroke(random(colors))
 stream = document.querySelector('canvas').captureStream(30)
 recorder = new MediaRecorder(stream);
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
  oldY = w/2+sin(a)*r
  ainc=(map(noise(t),0,1,1,2));
  a+=ainc

  while(r > 1){

    x=w/2+cos(a)*r
    y=w/2+sin(a)*r
    line(oldX,oldY,x,y)
    oldX=x
    oldY=y
    a+=ainc
    r--;
  }
  t+=0.0001
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
