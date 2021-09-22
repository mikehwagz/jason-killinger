precision highp float;

uniform float uTime;

uniform vec2 uResolution;
uniform vec2 uMouse;

uniform vec3 uColor1;
uniform vec3 uColor2;

uniform sampler2D tBackground;

varying vec2 vUv;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
} 

vec2 rotate(vec2 uv, float rotation) {
  float mid = 0.5;

  return vec2(
    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
  );
}

void main() {
  float t = uTime * 12.0;
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y; // uv coordinates based on screen resolution
  
  float ratio = uResolution.x / uResolution.y; // mf ratio

  vec2 muv = vUv - 0.5; // create new uvs (based on vUv) and move origin to the center
  vec2 mousePos = uMouse * 0.5; // map values from [-1 to 1] to [-0.5 to 0.5] because muvs are from center
  float mouseOrigin = length((muv - mousePos) * vec2(ratio, 1.0)); // calculate new vector origin based on mouse position that takes into account mf aspect ratio

  // use mouse origin to change the scale origin instead of being fixed to the center or length(uv)
  float scl = map(sin(mouseOrigin * 2.0 + t * 0.05), -1.0, 1.0, 0.8, 1.0);
  uv *= scl;
  
  // distort the uvs based on mouse origin
  uv = rotate(uv, sin(mouseOrigin * 0.3 + t * 0.01));

  vec4 background = texture2D(tBackground, uv);

  vec3 color1 = uColor1 / 255.0;
  vec3 color2 = uColor2 / 255.0;

  float x = background.r;
  
  vec3 final = mix(color2, color1, x);

  gl_FragColor = vec4(final * 1.5 - 0.15, 1.0);  
}