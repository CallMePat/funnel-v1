"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, MeshBasicMaterial, TorusGeometry, Vector3 } from "three";
import type { Group } from "three";
import { orbConfig } from "./orbConfig";

// Thin elliptical rings orbiting the core. One torus geometry is shared across
// every ring (scaled to each ellipse); the palette collapses to 4 materials.
function OrbitalRings() {
  const cfg = orbConfig.rings;
  const groupRefs = useRef<(Group | null)[]>([]);

  const geometry = useMemo(
    () =>
      new TorusGeometry(
        1,
        cfg.geometry.tube,
        cfg.geometry.radialSegments,
        cfg.geometry.tubularSegments
      ),
    [cfg.geometry.tube, cfg.geometry.radialSegments, cfg.geometry.tubularSegments]
  );

  const materials = useMemo(() => {
    const make = (hex: string, opacity: number) =>
      new MeshBasicMaterial({
        color: new Color(hex),
        transparent: true,
        opacity,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false, // keep the neon color pure, not darkened by tone mapping
      });
    return {
      blueBright: make(cfg.colors.blue, cfg.opacity.bright),
      blueSubtle: make(cfg.colors.blue, cfg.opacity.subtle),
      goldBright: make(cfg.colors.gold, cfg.opacity.bright),
      goldSubtle: make(cfg.colors.gold, cfg.opacity.subtle),
    };
  }, [cfg.colors.blue, cfg.colors.gold, cfg.opacity.bright, cfg.opacity.subtle]);

  const axes = useMemo(
    () => cfg.items.map((r) => new Vector3(r.axis[0], r.axis[1], r.axis[2]).normalize()),
    [cfg.items]
  );

  useEffect(
    () => () => {
      geometry.dispose();
      for (const material of Object.values(materials)) material.dispose();
    },
    [geometry, materials]
  );

  useFrame((_, delta) => {
    for (let i = 0; i < cfg.items.length; i++) {
      const group = groupRefs.current[i];
      if (group) group.rotateOnAxis(axes[i], cfg.items[i].speed * delta);
    }
  });

  return (
    <group>
      {cfg.items.map((r, i) => {
        const key = `${r.color}${r.subtle ? "Subtle" : "Bright"}` as keyof typeof materials;
        return (
          <group
            key={r.id}
            ref={(el) => {
              groupRefs.current[i] = el;
            }}
            rotation={[r.tilt[0], r.tilt[1], r.tilt[2]]}
          >
            <mesh
              geometry={geometry}
              material={materials[key]}
              scale={[r.rx, r.ry, r.rx]}
              rotation-z={r.spin}
            />
          </group>
        );
      })}
    </group>
  );
}

export default OrbitalRings;
