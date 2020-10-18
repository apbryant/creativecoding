t=0;scl=0.001;draw=_=>{
  createCanvas(w=600,w)
  r=w
  stop=map(noise(t*scl),0,1,100,400)
  while(r>stop){
    start=map(noise(r*scl,t*scl),0,1,0,PI)
    a=start
    while(a<TAU+start){
      inc=map(noise(a*scl,r*scl,t*scl),0,1,PI/10,PI/5)
      if(noise(t*scl*a^r)<0.5)arc(w/2,w/2,r,r,a,a+inc)
      a+=inc
      t+=0.005
    }
    r-=2
  }
  // saveCanvas()
}
