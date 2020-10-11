draw=_=>{
	frameRate(1)
	createCanvas(w=800,w)
	colors=shuffle(createCols("https://coolors.co/ef476f-ffd166-06d6a0-118ab2-073b4c"))
	background(colors.pop())
	noFill()
	for(i=0;i<8;i++){
		strokeWeight(random(5,50))
		stroke(colors[int(random(colors.length))])
		rect(random(-w,w),random(-w,w),random(w,w*2),random(w,w*2),50)
		stroke(colors[int(random(colors.length))])
		rect(random(-w*2,-w*1.5),random(-w*2,-w*1.5),random(w,w*2),random(w,w*2),50)
	}
}

// Function from https://www.openprocessing.org/sketch/973782
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
