  function setup() {
    let colors=shuffle(createCols("https://coolors.co/264653-2a9d8f-e9c46a-f4a261-e76f51"));
    createCanvas(w=600,w)
    background(colors.pop());
    noFill()
    strokeWeight(2)

    for(i=w*0.4;i<w*0.6;i++){
      t=0
      stroke(random(colors))
      oldx=0
      oldy=i
      for(x=0;x<w;x++){
        push()
        y=oldy+map(noise(t),0,1,-3,3)
        rotate(sin(radians(x)))
        line(oldx,oldy,x,y)
        oldx=x
        oldy=y
        t+=0.01
        pop();
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
