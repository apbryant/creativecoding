#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.14159265359

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

vec3 hollowRect(vec2 st, float b, float w) {
  float pct = getRectPct(b - w, st);
  vec3 color = vec3(0.0);
  color = vec3(pct);
  pct = getRectPct(b + w, st);
  color -= vec3(pct);
  return color;
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
    float m = sin(u_time);
    // Rotate each cell according to the index
    if(index == 1.0){
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st,PI*0.5*m);
    } else if(index == 2.0){
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st,PI*-0.5*m);
    } else if(index == 3.0){
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st,PI*m);
    }

    return _st;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st*=10.;
  st=fract(st);
  st=rotateTilePattern(st);
  st+=vec2(0.5)*sin(u_time);
  vec3 color = vec3(0.);
  color += hollowRect(st, 0.1, 0.05);
  gl_FragColor = vec4(color, 1.0);
}
