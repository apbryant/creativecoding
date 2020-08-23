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

// From The Book of Shaders
// Chapter eleven
// Noise section
// https://thebookofshaders.com/11/
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  return mix(rand(i), rand(i + 1.0), smoothstep(0.,1.,f));
}
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

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.);

  vec2 points[20];
  int c = 0;
  for(int i=0;i<20;i++){
    points[i] = vec2(-.2+sin(rand(i)),-.4+cos(rand(i*i)));
  }
  vec2 pos = vec2(0.5)-st;

   float a = atan(pos.y,pos.x);
  st=rotate2D(st, sin(noise(a))*sin(a)*10)*st;
  float m_dist = 1.;  // minimum distance
    vec2 m_point;        // minimum position

    // Iterate through the points positions
    for (int i = 0; i < 20; i++) {
        float dist = distance(st, points[i]);
        if ( dist < m_dist ) {
            // Keep the closer distance
            m_dist = dist;

            // Keep the position of the closer point
            m_point = points[i];
        }
    }

color = vec3(rand(m_point.x), rand(m_point.y), rand(dot(m_point, m_point)));
  gl_FragColor=vec4(color,1.);
}
