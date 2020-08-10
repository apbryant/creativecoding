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
// Chapter eight
// Scale section
// https://thebookofshaders.com/08/
mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


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

// Cellular noise ("Worley noise") in 2D in GLSL.
// Copyright (c) Stefan Gustavson 2011-04-19. All rights reserved.
// This code is released under the conditions of the MIT license.
// See LICENSE file for details.

// Permutation polynomial: (34x^2 + x) mod 289
vec4 permute(vec4 x) {
  return mod((34.0 * x + 1.0) * x, 289.0);
}

// Cellular noise, returning F1 and F2 in a vec2.
// Speeded up by using 2x2 search window instead of 3x3,
// at the expense of some strong pattern artifacts.
// F2 is often wrong and has sharp discontinuities.
// If you need a smooth F2, use the slower 3x3 version.
// F1 is sometimes wrong, too, but OK for most purposes.
vec2 cellular2x2(vec2 P) {
#define K 0.142857142857 // 1/7
#define K2 0.0714285714285 // K/2
#define jitter 0.8 // jitter 1.0 makes F1 wrong more often
	vec2 Pi = mod(floor(P), 289.0);
 	vec2 Pf = fract(P);
	vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);
	vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);
	vec4 p = permute(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));
	p = permute(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));
	vec4 ox = mod(p, 7.0)*K+K2;
	vec4 oy = mod(floor(p*K),7.0)*K+K2;
	vec4 dx = Pfx + jitter*ox;
	vec4 dy = Pfy + jitter*oy;
	vec4 d = dx * dx + dy * dy; // d11, d12, d21 and d22, squared
	// Sort out the two smallest distances
#if 0
	// Cheat and pick only F1
	d.xy = min(d.xy, d.zw);
	d.x = min(d.x, d.y);
	return d.xx; // F1 duplicated, F2 not computed
#else
	// Do it right and find both F1 and F2
	d.xy = (d.x < d.y) ? d.xy : d.yx; // Swap if smaller
	d.xz = (d.x < d.z) ? d.xz : d.zx;
	d.xw = (d.x < d.w) ? d.xw : d.wx;
	d.y = min(d.y, d.z);
	d.y = min(d.y, d.w);
	return sqrt(d.xy);
#endif
}

// From The Book of Shaders
// Chapter seven
// Circles section
// https://thebookofshaders.com/07/
float circle(in vec2 _st, in float _radius, in vec2 pos, in float blur){
  vec2 dist = _st-pos;
	return 1.-smoothstep(_radius-(_radius*blur),
                         _radius+(_radius*blur),
                         dot(dist,dist)*4.0);
}


// Based on cell
// by @patriciogv
// https://thebookofshaders.com/edit.php#12/cell.frag
void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec3 color = vec3(0.);
  color = vec3(circle(st, 0.5, vec2(0.5),1.5));

  st = (st-.5)*1.+.5;
  if (u_resolution.y > u_resolution.x ) {
      st.y *= u_resolution.y/u_resolution.x;
      st.y -= (u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x;
  } else {
      st.x *= u_resolution.x/u_resolution.y;
      st.x -= (u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y;
  }
// Centering
st -= .5;
// Zooming
st *= .7;
/* Create Voornoi noise. The circular pattern happens here
(example from cell by patriciogv)
vec2 F = cellular2x2(st*40.*(.1+1.0-dot(st,st)*5.));

st is base. 40 coefficient increases scale.
Dot product:
The sum of the products of the corresponding entries of
two sequences of numbers. Creates the circle pattern.
Subtracting the dot product from
1. inverts the pattern. The larger pieces go on the outside and
the smaller pieces go inside. 5. is the coefficient to modify the
"difference" between the small and large pieces. .1 coefficent changes
size of center.
*/

vec2 F = cellular2x2((st+vec2(0.1*sin(noise(u_time))))*50.*sin(.1*abs(sin(u_time))+(dot(st, st)*5.)));
// Change brightness of "pieces"
float facets = 0.1+(F.y-F.x);

// Create borders of "pieces"
float n = smoothstep(.2,.75,facets);
color*=vec3(n);
gl_FragColor = vec4(color, 1.0);
}
