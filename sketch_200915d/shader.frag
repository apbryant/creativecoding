#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265358979323846

// From The Book of Shaders
// Chapter ten
// Random section
// https://thebookofshaders.com/10/
float rand(float x) {
  return fract(sin(x)*10000.0);
}

// From The Book of Shaders
// Chapter eight
// Rotations section
// https://thebookofshaders.com/08/
vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

// from: https://gist.github.com/companje/29408948f1e8be54dd5733a74ca49bb9
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

// From The Book of Shaders
// Chapter seven
// Circles section
// https://thebookofshaders.com/07/
float circle(in vec2 _st, in float _radius, in vec2 pos, in float blur){
  vec2 dist = _st-pos;
	return 1.-smoothstep(_radius-(_radius*blur),
                         _radius+(_radius*blur),
                         dot(dist,dist)*4.0);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(1.);
    float t = floor(st.y*10.);
    st.x+=sin(rand(t)*u_time);
    st=rotate2D(st, t*PI*u_time*0.01);
    for(int i=0;i<20;i++){
      float j = rand(i);
      float k = rand(j);
      vec2 p = vec2(map(sin(i*j),-1,1,0.,1.),map(cos(i*k),-1,1,0,1));
      float r = fract(rand(cos(i)))/8;
      color-=vec3(circle(st, r, p,0.))*vec3(abs(sin(k)),abs(sin(j*k)),abs(sin(j*j*k)));
    }
    gl_FragColor = vec4(color,1.0);
}
