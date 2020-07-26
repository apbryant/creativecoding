#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// Based on plot function
// from The Book of Shaders
// chapter five
// https://thebookofshaders.com/05/
float plot(vec2 st, float pct, float w){
  return  step( pct-w, st.y) -
          step( pct+w, st.y);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 10.0;
    st = fract(st);
    st = st * 2.0 - 1.0;
    vec3 color = vec3(0.0);
    float y = abs(st.x);
    float pct = plot(st, y, 0.05);
    color = vec3(1.0 - pct);
    gl_FragColor = vec4(color,1.0);
}
