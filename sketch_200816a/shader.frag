#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//From The Book of Shaders
// Chapter ten
// Random section
// https://thebookofshaders.com/10/
float rand(float x) {
  return fract(sin(x)*10000.0);
}

// Voornoi algorithm from CellularNoise
// by @patriciogv
// https://thebookofshaders.com/12/
void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.);
  vec2 points[20];
  for(int i=0;i<20;i++){
    points[i] = vec2(-.2+abs(sin(rand(rand(i)))),-.4+abs(cos(rand(i*i))));
  }
  float m_dist = 1.;  // minimum distance
    vec2 m_point;        // minimum position

    // Iterate through the points positions
    for (int i = 0; i < 20; i++) {
        float dist = distance(st, points[i]);
        if ( dist < m_dist ) {
            // Keep the closer distance
            m_dist = dist;

            // Kepp the position of the closer point
            m_point = points[i];
        }
    }

    color = vec3(rand(m_point.x), rand(m_point.y), rand(dot(m_point, m_point)));
  gl_FragColor=vec4(color,1.);
}
