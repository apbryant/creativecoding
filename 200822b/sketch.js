let bg;
setup=_=>{
  // https://coolors.co/f08080-f4978e-f8ad9d-fbc4ab-ffdab9
  colors=["#f08080","#f4978e","#f8ad9d","#fbc4ab","#ffdab9"]
  createCanvas(w=600,w)
  background(random(colors))
  //https://coolors.co/eddcd2-fff1e6-fde2e4-fad2e1-c5dedd-dbe7e4-f0efeb-d6e2e9-bcd4e6-99c1de
  bgcolors=["#eddcd2","#fff1e6","#fde2e4","#fad2e1","#c5dedd","#dbe7e4","#f0efeb","#d6e2e9","#bcd4e6","#99c1de"]

  noStroke()
  bg = createGraphics(w, w);
  bg.noStroke();
  for(i=0;i<500;i++){
    bg.fill(random(bgcolors))
    bg.rect(random(w),random(-w*0.1,w),random(w),random(w))
  }
  for(i=0;i<200;i++){
    fill(random(colors))
    x=random(1)
    circle(random(w),random(w),x*200)
  }
}
draw=_=>{image(bg,w/2,w/2);image(bg,-w/2,-w/2)}
