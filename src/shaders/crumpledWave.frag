precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
    // Normalize fragment coordinates: center at (0,0)
    vec2 uv = (2.0 * gl_FragCoord.xy - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Distort UV based on sine waves
    for (float i = 1.0; i < 8.0; i++) {
        uv.y += (i * 0.1 / i) * 
            sin(uv.x * i * i + u_time * 0.5) *
            sin(uv.y * i * i + u_time * 0.5);
    }

    // Simple coloring based on Y position
    vec3 col;
    col.r = uv.y - 0.1;
    col.g = uv.y + 0.3;
    col.b = uv.y + 0.95;

    gl_FragColor = vec4(col, 1.0);
}
