precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float wave = sin(uv.x * 10.0 + u_time * 2.0) * 0.05;
    float d = abs(uv.y - 0.5 + wave);
    float mask = smoothstep(0.02, 0.01, d);
    vec3 color = mix(vec3(0.0, 0.3, 0.8), vec3(0.0), mask);
    
    gl_FragColor = vec4(color, 1.0);
}