#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

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

vec3 drawRect(vec2 st, float b) {
  float pct = getRectPct(b, st);
  vec3 color = vec3(0.0);
  color = vec3(pct);
  return color;
}

vec3 hollowRect(vec2 st, float b, float w) {
  float pct = getRectPct(b - w, st);
  vec3 color = vec3(0.0);
  color = vec3(pct);
  pct = getRectPct(b + w, st);
  color -= vec3(pct);
  return color;
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float randomVec2 (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noiseVec2 (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = randomVec2(i);
    float b = randomVec2(i + vec2(1.0, 0.0));
    float c = randomVec2(i + vec2(0.0, 1.0));
    float d = randomVec2(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  color = hollowRect(st, noiseVec2(st*u_time)/u_time*2., 0.005);
  gl_FragColor = vec4(color, 1.);
}
