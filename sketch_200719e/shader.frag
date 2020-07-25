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

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
// via  @patriciogv - 2015
// https://thebookofshaders.com/edit.php#11/circleWave-noise.frag
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  vec2 pos = vec2(0.5) - st;
  float r = length(pos) * 2.0;
  float a = atan(pos.y, pos.x);
  float f = abs(cos(a * 3) * sin(a * 3 * sin(u_time * 0.01) * 10));
  color = vec3( 1.-smoothstep(f,f+(0.1 * cos(a) + noise(a * 2)),r) );
  gl_FragColor = vec4(color, 1.);
}
