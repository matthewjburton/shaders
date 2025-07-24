precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;

  vec2 uv2 = uv + 0.05 * sin(u_time + uv.yx * 20.0);
  vec2 c = floor(uv2 * 10.0);
  float checker = mod(c.x + c.y, 2.0);
  vec3 color = vec3(checker);

  gl_FragColor = vec4(color, 1.0);
}
