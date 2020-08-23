let bg
setup=_=>{
  // https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9
  colors=["#f08080","#f4978e","#f8ad9d","#fbc4ab","#ffdab9"]
  //https://coolors.co/eddcd2-fff1e6-fde2e4-fad2e1-c5dedd-dbe7e4-f0efeb-d6e2e9-bcd4e6-99c1de
  bgcolors=["#eddcd2","#fff1e6","#fde2e4","#fad2e1","#c5dedd","#dbe7e4","#f0efeb","#d6e2e9","#bcd4e6","#99c1de"]
  shuffle(colors)
  shuffle(bgcolors)
  createCanvas(w=600,w)
  background(colors.pop())
  fill(random(colors))
  noStroke()
  bg=createGraphics(w,w)
  bg.background(bgcolors.pop())
  bg.fill(random(bgcolors))
  bg.noStroke()
  for(i=0;i<w;i+=20){
    bg.rect(0,i,w,10)
    rect(i,0,10,w)
  }
}
draw=_=>{image(bg,w/2,w/2);image(bg,-w/2,-w/2)}
