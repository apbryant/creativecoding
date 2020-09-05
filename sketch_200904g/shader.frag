#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


#define PI 3.14159265358979323846

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
// Chapter nine
// Truchet tiles section
// https://thebookofshaders.com/09/
vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));
    index += step(1., mod(_st.y,2.0))*2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI);
    }

    return _st;
}

// From The Book of Shaders
// Shaping functions
// https://thebookofshaders.com/05/
float plot(vec2 st, float pct){
  return step(pct-0.01,st.x)-step(pct+0.01,st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.,0.,0.);
    st *= 8.0;
    float i = mod(floor(st.x),2.);
    float j = mod(floor(st.y),2.);
    float k = i*j;
    st = fract(st);
    st = rotateTilePattern(st);
    st = rotate2D(st, PI*k);
    color += vec3(plot(st, 0.0));
    color += vec3(plot(st, 0.1));
    color += vec3(plot(st, 0.2));
    color += vec3(plot(st, 0.3));
    color += vec3(plot(st, 0.4));
    color += vec3(plot(st, 0.5));
    color += vec3(plot(st, 0.6));
    color += vec3(plot(st, 0.7));
    color += vec3(plot(st, 0.8));
    color += vec3(plot(st, 0.9));
    color += vec3(plot(st, 1.0));
    gl_FragColor = vec4(color,1.0);
}
