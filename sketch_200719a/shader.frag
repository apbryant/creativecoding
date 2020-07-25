#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// Based off of @patriciogv
// Polar shapes example
// https://thebookofshaders.com/07/
void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  vec2 pos = vec2(0.5) - st;
  float r = length(pos) * 2.0;
  float a = atan(pos.y, pos.x);
  float f = abs(cos(a * 3) * sin(a * 3));
  color = vec3( 1.-smoothstep(f,f+(0.1 * cos(a)),r) );
  gl_FragColor = vec4(color, 1.);
}
