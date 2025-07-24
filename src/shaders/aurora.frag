precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  float a = sin(uv.x * 10.0 + u_time);
  float b = sin(uv.y * 10.0 - u_time * 1.3);
  float c = sin((uv.x + uv.y) * 10.0 + u_time * 0.7);
  float mixval = (a + b + c) * 0.33;

  vec3 color = 0.5 + 0.5 * cos(6.2831 * (vec3(0.3, 0.6, 0.9) + mixval));
  gl_FragColor = vec4(color, 1.0);
}