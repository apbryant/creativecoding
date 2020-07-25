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

// Based on 4 cells DF
// by @patriciogv
// https://thebookofshaders.com/12/
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(.0);

    // Cell positions
    vec2 point[10];
    for(int i = 0; i < 10; i++) {
      point[i] = vec2(abs(sin(i))*rand(i+7.25091),
       abs(cos(i))*rand((i+1)*10.89));
    }

    float m_dist = 1.;  // minimum distance
    // Iterate through the points positions
    for (int i = 0; i < 10; i++) {
         float dist = sin(distance(st + noise(st.x*st.y), point[i]) * 3.14);
        // Keep the closer distance
        m_dist = min(m_dist, dist);
    }
    color = vec3(1. - m_dist);
  vec3 c1 = vec3(0.9, 0.9, 0.9);
  vec3 c2 = vec3(0.1, 0.1, 0.1);
  color *= mix(c1, c2, sin(atan(st.x,st.y)));

    gl_FragColor = vec4(color,1.0);
}
