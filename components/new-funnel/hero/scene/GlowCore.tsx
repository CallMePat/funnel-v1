"use client";

import { useMemo } from "react";
import { AdditiveBlending, Color } from "three";
import { orbConfig } from "./orbConfig";

// center-facing glow: brightest where the surface faces the camera, so the
// halo reads as a soft radial bloom around the nucleus even without postprocessing
const haloVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const haloFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uPower;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    float facing = pow(max(dot(vNormalW, vViewDir), 0.0), uPower);
    gl_FragColor = vec4(uColor, facing * uIntensity);
  }
`;

// Warm gold nucleus (emissive, tone-mapped) plus a soft additive halo.
function GlowCore() {
  const c = orbConfig.core;
  const haloUniforms = useMemo(
    () => ({
      uColor: { value: new Color(c.halo.color) },
      uIntensity: { value: c.halo.intensity },
      uPower: { value: c.halo.power },
    }),
    [c.halo.color, c.halo.intensity, c.halo.power]
  );

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[c.radius, c.detail]} />
        <meshStandardMaterial
          color={c.color}
          emissive={c.emissive}
          emissiveIntensity={c.emissiveIntensity}
          roughness={c.roughness}
          metalness={0}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[c.halo.radius, 32, 32]} />
        <shaderMaterial
          vertexShader={haloVertex}
          fragmentShader={haloFragment}
          uniforms={haloUniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default GlowCore;
