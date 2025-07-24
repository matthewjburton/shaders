precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float d = length(uv - 0.5);
    float ring = sin(d * 40.0 - u_time * 4.0);
    float mask = smoothstep(0.1, 0.0, abs(ring));
    vec3 color = vec3(mask);

    gl_FragColor = vec4(color, 1.0);
}