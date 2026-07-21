"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color } from "three";
import type { ShaderMaterial } from "three";
import { orbConfig } from "./orbConfig";

const groundVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Concentric bands via fract(radius), crawling outward, with a radial fade at
// the center and edges so the field dissolves rather than reading as a disc.
const groundFragment = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uInner;
  uniform vec3 uOuter;
  uniform float uDensity;
  uniform float uSpeed;
  uniform float uIntensity;
  void main() {
    float d = length(vUv - 0.5) * 2.0; // 0 center → 1 edge
    float saw = abs(fract(d * uDensity - uTime * uSpeed) - 0.5) * 2.0;
    float line = smoothstep(0.9, 1.0, saw); // thin bright bands
    float fade = smoothstep(0.03, 0.22, d) * smoothstep(1.0, 0.5, d);
    vec3 col = mix(uInner, uOuter, clamp(d, 0.0, 1.0));
    gl_FragColor = vec4(col, line * fade * uIntensity);
  }
`;

function GroundRings() {
  const cfg = orbConfig.ground;
  const materialRef = useRef<ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uInner: { value: new Color(cfg.innerColor) },
      uOuter: { value: new Color(cfg.outerColor) },
      uDensity: { value: cfg.density },
      uSpeed: { value: cfg.speed },
      uIntensity: { value: cfg.intensity },
    }),
    [cfg.innerColor, cfg.outerColor, cfg.density, cfg.speed, cfg.intensity]
  );

  useFrame((_, delta) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, cfg.y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[cfg.size, cfg.size]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={groundVertex}
        fragmentShader={groundFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export default GroundRings;
