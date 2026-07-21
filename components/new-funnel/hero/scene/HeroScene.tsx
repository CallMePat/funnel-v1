"use client";

import { Canvas } from "@react-three/fiber";
import SceneLights from "./SceneLights";
import OrbEnvironment from "./OrbEnvironment";
import GroundRings from "./GroundRings";
import OrbitalRings from "./OrbitalRings";
import GlassOrb from "./GlassOrb";

// R3F's <Canvas> owns the WebGL renderer, the render loop, ResizeObserver-based
// resize handling, and teardown on unmount — so no manual renderer/resize/cleanup
// wiring is needed here. We only configure camera, DPR, and a transparent buffer.
function HeroScene() {
  return (
    <Canvas
      // slightly raised + looking at the orb so the floor rings read in perspective
      camera={{ position: [0, 1.05, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      // transparent clear so the section's #111110 background shows through
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        camera.lookAt(0, 0, 0);
      }}
      dpr={[1, 2]}
    >
      <OrbEnvironment />
      <SceneLights />
      <GroundRings />
      <OrbitalRings />
      <GlassOrb />
    </Canvas>
  );
}

export default HeroScene;
