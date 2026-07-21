"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { orbConfig } from "./orbConfig";
import Atmosphere from "./Atmosphere";
import GlowCore from "./GlowCore";
import GlassShell from "./GlassShell";

// Composes the orb systems and applies idle life: slow rotation + a gentle
// breathing scale. (No scroll / pointer interaction yet — that comes later.)
function GlassOrb() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;
    group.rotation.y += delta * orbConfig.motion.rotationSpeed;
    const breathe =
      1 + Math.sin(state.clock.elapsedTime * orbConfig.motion.breatheSpeed) * orbConfig.motion.breatheAmount;
    group.scale.setScalar(breathe);
  });

  return (
    <group ref={groupRef}>
      <Atmosphere />
      <GlowCore />
      <GlassShell />
    </group>
  );
}

export default GlassOrb;
