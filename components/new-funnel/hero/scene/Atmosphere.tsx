"use client";

import { useMemo } from "react";
import { AdditiveBlending, BackSide, Color } from "three";
import { orbConfig } from "./orbConfig";

// A faint cool haze rendered on the inside faces (BackSide) of a sphere just
// within the shell, brightest at grazing angles — reads as interior atmosphere.
const atmosphereVertex = /* glsl */ `
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uPower;
  varying vec3 vNormalW;
  varying vec3 vViewDir;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormalW, vViewDir)), uPower);
    gl_FragColor = vec4(uColor, fresnel * uIntensity);
  }
`;

function Atmosphere() {
  const a = orbConfig.atmosphere;
  const uniforms = useMemo(
    () => ({
      uColor: { value: new Color(a.color) },
      uIntensity: { value: a.intensity },
      uPower: { value: a.power },
    }),
    [a.color, a.intensity, a.power]
  );

  return (
    <mesh>
      <sphereGeometry args={[a.radius, a.segments, a.segments]} />
      <shaderMaterial
        vertexShader={atmosphereVertex}
        fragmentShader={atmosphereFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={BackSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
}

export default Atmosphere;
