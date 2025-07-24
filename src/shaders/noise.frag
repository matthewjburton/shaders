precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    float val = hash(floor(uv * 50.0));
    vec3 color = vec3(val);
    
    gl_FragColor = vec4(color, 1.0);
}