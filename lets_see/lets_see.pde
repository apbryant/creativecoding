import java.util.UUID;

void setup() {
   size(600, 600);
}

void draw() {
  frameRate(1);
  float w = width;
  translate(w/2, w/2);
  rotate(PI/2);
  background(255);
  noFill();
  float a=0;
  float r=w*.375;
  float startr=r;
  float ainc=0.05;
  float rdec=0.05;
  float g=11;
  float oldx=cos(a)*r*cos(a);
  float oldy=sin(a)*r*sin(a);
  a+=ainc;
  r-=rdec;
  float t=random(10000);
  float tinc=0.001;
  float c=0;
  
  while (r>0) {
    stroke(0, 100);
    float scl=0.004;
    float m=30;
    float nx=map(noise(r*scl, a*scl, oldx*scl), 0, 1, -m, m);
    float ny=map(noise(r*scl, a*scl, oldy*scl), 0, 1, -m, m);
    float x=(nx)+cos(a)*r*sin(a);
    float y=(ny)+sin(a)*r*sin(a);
    if (c>2) {
      beginShape();
      vertex(oldx, oldy);
      vertex(x, y);
      endShape();
    }
    c++;
    a+=ainc+noise(t, scl)*0.01;
    t+=tinc;
    r-=rdec;
    oldx=x;
    oldy=y;
  }

  translate(startr/2, startr/2);
  rotate(random(PI/4, PI/2));

  for (int iter=0; iter<5; iter++) {
    a=0;
    r=w*.375*(.5*(iter+1));
    startr=r;
    ainc=0.05;
    rdec=0.05;
    g=11;
    oldx=cos(a)*r*cos(a);
    oldy=sin(a)*r*sin(a);
    a+=ainc;
    r-=rdec;
    t=random(10000);
    tinc=0.001;
    c=0;
    while (r>0) {
      stroke(0, 100);
      float scl=0.004;
      float m=30;
      float nx=map(noise(r*scl, a*scl, oldx*scl), 0, 1, -m, m);
      float ny=map(noise(r*scl, a*scl, oldy*scl), 0, 1, -m, m);
      float x=(nx)+cos(a)*r*sin(a);
      float y=(ny)+sin(a)*r*sin(a);
      if (c>2) {
        beginShape();
        vertex(oldx, oldy);
        vertex(x, y);
        endShape();
      }
      c++;
      a+=ainc+noise(t, scl)*0.01;
      t+=tinc;
      r-=rdec;
      oldx=x;
      oldy=y;
    }
    translate(startr/2, startr/2);
    rotate(random(PI/4, PI/2));
  }
}