#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


// From The Book of Shaders
// https://thebookofshaders.com/13/
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


// From The Book of Shaders
// https://thebookofshaders.com/13/
#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noiseVec2(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 c1 = vec3(.65,.25,.1);
      vec3 c2 = vec3(.25,.25,.25);
      vec3 color = c1;
      vec2 pos = vec2(0.5)-st;
float r = length(pos)*2.0;
float a = atan(pos.y,pos.x);
    color=mix(c1,c2,fbm(st*5.*r)*sin(a));
    gl_FragColor = vec4(color,.1);
}
