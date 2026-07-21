"use client";

// Minimal lighting per the blueprint: one warm key light so surfaces have
// direction, plus a cool hemisphere fill. The luminous "glow" will come from
// emissive materials + bloom later — not from lights.
function SceneLights() {
  return (
    <>
      <hemisphereLight args={["#8fb0ff", "#0a0a0c", 0.55]} />
      <directionalLight position={[3, 2.5, 4]} intensity={2.4} color="#ffe6c4" />
    </>
  );
}

export default SceneLights;
