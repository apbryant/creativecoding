setup=_=>{
  createCanvas(w=600,w)
  background(0)
  stroke(255)
  fill(255)
  // strokeWeight(5)
  for(x=0;x<w;x++){
    for(y=0;y<w;y++){
      push()
      rotate(cos(radians(x^y))*noise(x,y)*0.01)
      point(x,y)
      pop()
    }
  }
  // saveCanvas()
}
