precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  
  vec2 grid = fract(uv * 10.0);         // 10x10 grid
  vec2 p = grid - 0.5;

  float dist = length(p);
  float r = 0.2 + 0.1 * sin(u_time + uv.x * 10.0);

  float circle = smoothstep(r, r - 0.01, dist);
  vec3 color = mix(vec3(1.0), vec3(0.2, 0.4, 0.9), circle);

  gl_FragColor = vec4(color, 1.0);
}
