
draw=_=>{
  createCanvas(w=800,w)
	frameRate(1)
	colors=shuffle(createCols("https://coolors.co/3d5a80-98c1d9-e0fbfc-ee6c4d-293241"))
	background(colors.pop())
  for(i=0;i<10;i++){
    stroke(random(colors))
    oldx=w/2
    oldy=w/2
    c=0
    while(c<200){
  		translate(oldx,oldy)
  		strokeWeight(map(noise(c*0.003),0,1,0.5,2))
  		a=random(TAU/3,TAU/2)
  		a*=pow(-1,c)
  		c++
  		x=random(-20,20)
  		y=random(20,100)
  		v1=createVector(0,0)
  		v2=createVector(x,y)
  		for(lp=0;lp<1;lp+=0.005){
  			px=lerp(v1.x,v2.x,lp)
  			py=lerp(v1.y,v2.y,lp)
        rotate(radians(noise(lp)))
  			point(px,py)
  		}
  		oldx=x
  		oldy=y
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
