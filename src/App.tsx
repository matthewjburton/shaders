import { useState } from "react";
import ShaderCanvas from "./components/ShaderCanvas";

import aurora from "./shaders/aurora.frag?raw";
import checkerboard from "./shaders/checkerboard.frag?raw";
import circleGrid from "./shaders/circleGrid.frag?raw";
import motionBlur from "./shaders/motionBlur.frag?raw";
import noise from "./shaders/noise.frag?raw";
import orbitals from "./shaders/orbitals.frag?raw";
import rings from "./shaders/rings.frag?raw";
import water from "./shaders/water.frag?raw";

const shaders = {
  Aurora: aurora,
  "Checker Board": checkerboard,
  "Circle Grid": circleGrid,
  "Motion Blur": motionBlur,
  Noise: noise,
  Orbitals: orbitals,
  Rings: rings,
  Water: water,
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
