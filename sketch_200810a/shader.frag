/* Adapted from Twisted Medallion
by t420babe
https://www.shadertoy.com/view/wtXfRS
*/
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265359

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

void main(){
  vec2 position = gl_FragCoord.xy/u_resolution.xy;
  position*=2.0;
  position-=1.0;
  vec3 color = vec3(0.0);
  float center = 0.0;
  float scale = 1.0;
  float r = length(position) * scale;
  float theta = atan(position.y, position.x);
  float g = noise(theta+noise(u_time*0.1)*PI)*PI*noise(r);
  float d = cos(cos(cos(g*noise(r*r))));
  float c = sin(cos(g*noise(r*r)));
  float f = smoothstep(-0.5, 1.0, cos(d*c*r *u_time*0.01* 100.) * -200 + 0.5);
  float thickness = 0.3;
  color = vec3(1.0 - smoothstep(f, f + thickness, r));
  gl_FragColor = vec4(color, 1.0);
}
