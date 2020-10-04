
t=0;let bg;setup=_=> {
	createCanvas(w=windowWidth, h=windowHeight);
	colors=shuffle(createCols("https://coolors.co/f94144-f3722c-f8961e-f9844a-f9c74f-90be6d-43aa8b-4d908e-577590-277da1"))
	bg=colors.pop()
	background(bg);
	noStroke();
	scl=0.001
	y=0
	k=0
	i=0
	while(y<h){
		stroke(colors[i])
		i++
		for(x=0;x<w;x++){
			nx=map(noise(x*scl,k*scl),0,1,-20,20)
			l=y + sin(radians(x+k))*50+sin(nx)*20
			line(x,l,x,l-50)
			k++
		}
		y+=random(h*0.1,h*0.2)
	}
}


draw=_=>{
	background(bg)
	scl=0.001
	y=0
	k=0
	i=0
	while(y<h){
		stroke(colors[i])
		i++
		for(x=0;x<w;x++){
			nx=map(noise(x*scl,k*scl,t*scl),0,1,-20,20)
			l=y + sin(radians(x+k)*noise(t*0.5))*50+sin(nx)*20*noise(t*scl)
			line(x,l,x,l-20)
			k++
		}
		y+=map(noise(t*scl*0.01,k*scl*0.01),0,1,h*0.1,h*0.2)
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
