setup=_=>{
  createCanvas(w=600,w)
  background(0)
  stroke(255)
  fill(255)
  // strokeWeight(5)
  for(x=0;x<w;x++){
    for(y=0;y<w;y++){
      push()
      rotate(sin(radians(x^y))*noise(x,y)*0.05)
      point(x,y)
      pop()
    }
  }
  saveCanvas()
}
