"use client";

import { orbConfig } from "./orbConfig";

// The transparent refractive outer shell. Physically based: real transmission
// + IOR give see-through glass; iridescence adds the subtle blue/cyan/violet
// sheen; attenuation tints the light travelling through the volume.
function GlassShell() {
  const s = orbConfig.shell;
  return (
    <mesh>
      <sphereGeometry args={[s.radius, s.segments, s.segments]} />
      <meshPhysicalMaterial
        color={s.color}
        metalness={0}
        roughness={s.roughness}
        transmission={s.transmission}
        thickness={s.thickness}
        ior={s.ior}
        iridescence={s.iridescence}
        iridescenceIOR={s.iridescenceIOR}
        iridescenceThicknessRange={s.iridescenceThickness}
        attenuationColor={s.attenuationColor}
        attenuationDistance={s.attenuationDistance}
        clearcoat={s.clearcoat}
        clearcoatRoughness={s.clearcoatRoughness}
        envMapIntensity={s.envMapIntensity}
      />
    </mesh>
  );
}

export default GlassShell;
