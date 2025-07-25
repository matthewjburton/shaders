import { useState } from "react";
import ShaderCanvas from "./components/ShaderCanvas";

import aurora from "./shaders/aurora.frag?raw";
import blackhole from "./shaders/blackhole.frag?raw";
import crumpledWave from "./shaders/crumpledWave.frag?raw";
import halo from "./shaders/halo.frag?raw";
import star from "./shaders/star.frag?raw";
import warp from "./shaders/warp.frag?raw";

const shaders = {
  Aurora: aurora,
  Blackhole: blackhole,
  "Crumpled Wave": crumpledWave,
  Halo: halo,
  Star: star,
  Warp: warp,
};

function App() {
  const [selected, setSelected] = useState<keyof typeof shaders>("Aurora");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100vw",
        background: "#111",
        color: "white",
        fontFamily: "sans-serif",
        padding: "1rem",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>GLSL Shader Playground</h1>

      <div
        style={{
          border: "2px solid #444",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <ShaderCanvas
          key={selected} // <- resets shader on change
          fragmentShaderSrc={shaders[selected]}
        />
      </div>

      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value as keyof typeof shaders)}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid #888",
          background: "#222",
          color: "white",
        }}
      >
        {Object.keys(shaders).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default App;
