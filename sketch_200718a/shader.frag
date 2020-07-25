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

// From The Book of Shaders
// Chapter seven
// Circles section
// https://thebookofshaders.com/07/
float circle(in vec2 _st, in float _radius){
    vec2 dist = _st-vec2(0.5);
	return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(dist,dist)*4.0);
}

// @patriciogv - 2015
// https://thebookofshaders.com/edit.php#11/circleWave-noise.frag
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
// via  @patriciogv - 2015
// https://thebookofshaders.com/edit.php#11/circleWave-noise.frag
float noiseVec2(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
  vec3 color = vec3(0.);
  st *= vec2(5.);
  float i = floor(st.x * st.y);
  float a = atan(st.x, st.y);
  st = fract(st);
  color = vec3(circle(st, 0.5 - noiseVec2(st * a)));
  color *= distance(st, vec2(0.5-noiseVec2(st)*noise(st.x*st.y*i)));
  gl_FragColor = vec4(color, 1.);
}
