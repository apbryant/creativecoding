#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

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


void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  float pct = smoothstep(st.x - 0.25, st.x + 0.25, st.y);
  color = vec3(pct);
  float a = atan(st.y, st.x);
  float s = abs(sin(a) - sin(90));
  color += circle(st, 0.5, vec2(0.75,0.75), 0.9 * s);
  color *= 1. - circle(st, 0.5, vec2(0.25,0.25), 0.9 * s);
  color *= 1. - circle(st, 0.06, vec2(0.75,0.75), 0.5 * s);
  color += circle(st, 0.06, vec2(0.25,0.25), 0.5 * s);
  gl_FragColor = vec4(color, 0.1);
}
