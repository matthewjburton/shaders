precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 cell = floor(uv * 5.0);
    vec2 gridUV = fract(uv * 5.0) - 0.5;
    float angle = u_time + dot(cell, vec2(1.0, 3.0));
    vec2 orbit = 0.3 * vec2(cos(angle), sin(angle));
    float d = length(gridUV - orbit);
    float mask = smoothstep(0.05, 0.03, d);
    vec3 color = mix(vec3(0.0), vec3(1.0, 0.4, 0.2), mask);
    
    gl_FragColor = vec4(color, 1.0);
}