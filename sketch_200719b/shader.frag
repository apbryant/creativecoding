#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// From The Book of Shaders
// Chapter five
// Shaping functions section
// https://thebookofshaders.com/05/
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.3, pct, st.y) -
          smoothstep( pct, pct+0.3, st.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  float y = 0.4;
  float pct = plot(st, y);
  vec3 c1 = vec3(0.75, 0.05, 0.05);
  vec3 c2 = vec3(0.95, 0.75, 0.05);
  color = mix(c1, c2, pct);
  gl_FragColor = vec4(color, 1.);
}
