#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

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

// From The Book of Shaders
// chapter five
// https://thebookofshaders.com/05/
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

// Based off rectangle drawing code in
// The Book of Shaders
// Chapter seven
// Rectangle section
// https://thebookofshaders.com/07/
float getRectPct(float a, vec2 st) {
  //bottom-left
  vec2 bl = step(vec2(a),st);
  float pct = bl.x * bl.y;

  //top-right
  vec2 tr = step(vec2(a),1.0-st);
  pct *= tr.x * tr.y;

  return pct;
}

vec3 drawRect(vec2 st) {
  float pct = getRectPct(0.01, st);
  vec3 color = vec3(0.0);
  color = vec3(pct);
  return color;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st = rotate2D(st, PI * 0.25);

    st *= 1.8;
    st = fract(st);
    color = drawRect(st);

    st = gl_FragCoord.xy/u_resolution.xy;
    st = rotate2D(st, PI * 0.25);
    st *= 4.5;
    st = fract(st);
    color *= drawRect(st);

    st = gl_FragCoord.xy/u_resolution.xy;
    st = rotate2D(st, PI * 0.25);
    st *= 3.1;
    st = fract(st);
    color *= drawRect(st);
    gl_FragColor = vec4(color,1.0);
}
