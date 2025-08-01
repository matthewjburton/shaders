precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

// 🟠 Simple replacement for snoise from the original
float snoise(vec3 uv, float res) {
    const vec3 s = vec3(1e0, 1e2, 1e4);
    uv *= res;
    vec3 uv0 = floor(mod(uv, res)) * s;
    vec3 uv1 = floor(mod(uv + vec3(1.0), res)) * s;
    vec3 f = fract(uv);
    f = f*f*(3.0 - 2.0*f);
    vec4 v = vec4(uv0.x + uv0.y + uv0.z,
                  uv1.x + uv0.y + uv0.z,
                  uv0.x + uv1.y + uv0.z,
                  uv1.x + uv1.y + uv0.z);
    vec4 r = fract(sin(v * 1e-3) * 1e5);
    float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    r = fract(sin((v + uv1.z - uv0.z) * 1e-3) * 1e5);
    float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);
    return mix(r0, r1, f.z) * 2.0 - 1.0;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = -0.5 + uv;
    p.x *= aspect;

    // ⚠️ Fake audio freqs (static values for now)
    float freqs[4];
    freqs[0] = 0.5;
    freqs[1] = 0.5;
    freqs[2] = 0.5;
    freqs[3] = 0.5;

    // ✨ Original shader logic
    float brightness = freqs[1] * 0.25 + freqs[2] * 0.25;
    float radius = 0.24 + brightness * 0.2;
    float invRadius = 1.0 / radius;

    vec3 orange = vec3(0.8, 0.65, 0.3);
    vec3 orangeRed = vec3(0.8, 0.35, 0.1);
    float time = u_time * 0.1;

    float fade = pow(length(2.0 * p), 0.5);
    float fVal1 = 1.0 - fade;
    float fVal2 = 1.0 - fade;

    float angle = atan(p.x, p.y) / 6.2832;
    float dist = length(p);
    vec3 coord = vec3(angle, dist, time * 0.1);

    float newTime1 = abs(snoise(coord + vec3(0.0, -time * (0.35 + brightness * 0.001), time * 0.015), 15.0));
    float newTime2 = abs(snoise(coord + vec3(0.0, -time * (0.15 + brightness * 0.001), time * 0.015), 45.0));

    for (int i = 1; i <= 7; i++) {
        float power = pow(2.0, float(i + 1));
        fVal1 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2),
                                        (power * 10.0) * (newTime1 + 1.0));
        fVal2 += (0.5 / power) * snoise(coord + vec3(0.0, -time, time * 0.2),
                                        (power * 25.0) * (newTime2 + 1.0));
    }

    float corona = pow(fVal1 * max(1.1 - fade, 0.0), 2.0) * 50.0;
    corona += pow(fVal2 * max(1.1 - fade, 0.0), 2.0) * 50.0;
    corona *= 1.2 - newTime1;

    // star glow
    float starGlow = min(max(1.0 - dist * (1.0 - brightness), 0.0), 1.0);

    // 🎨 Base color (no textures hooked up)
    vec3 color = corona * orange + starGlow * orangeRed;

    gl_FragColor = vec4(color, 1.0);
}
