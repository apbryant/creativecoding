#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// From The Book of Shaders
// Chapter ten
// Random section
// https://thebookofshaders.com/10/
float rand(float x) {
  return fract(sin(x)*10000.0);
}

// From The Book of Shaders
// Chapter eleven
// Noise section
// https://thebookofshaders.com/11/
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
}

// Distance field code adapted from The Book of Shaders
// chapter seven https://thebookofshaders.com/07/
// x & y formulae adapted from Paul Bourke
// Find in Horn section: http://paulbourke.net/geometry/spiral/
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  vec2 pos = vec2(0.5)-st;
  float r = length(pos)*2.0;
  float a = atan(st.y, st.x);
  float x = (2 + r * cos(a)) * sin(360 * r * u_time*0.005) ;
  float y = (2 + r * cos(a)) * cos(360 * r * u_time*0.005) + 2 * r;
  float f = noise(x)*noise(y);
  color = vec3( 1.-smoothstep(f,f+0.02,r)  );
  gl_FragColor = vec4(color, 0.1);
}
