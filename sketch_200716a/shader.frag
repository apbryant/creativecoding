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

// from: https://gist.github.com/companje/29408948f1e8be54dd5733a74ca49bb9
float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec2 translate = vec2(u_time);
  vec3 color = vec3(0.);
  float n = noise(st.x  + st.y ) * map(u_mouse.x / u_resolution.x, 0., 1., 1., 2.);
  color += vec3(sin(st.x * st.y) + sin(st.y * 200 * n) + sin(200 * st.x * n));
  gl_FragColor = vec4(color, 1.);
}
