precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 grid = fract(uv * 10.0);
    vec2 offset = 0.1 * vec2(sin(u_time + uv.x * 5.0), cos(u_time + uv.y * 5.0));
    vec2 p = grid - 0.5 + offset;
    float d = length(p);
    float mask = smoothstep(0.2, 0.18, d);
    vec3 color = vec3(mask);

    gl_FragColor = vec4(color, 1.0);
}