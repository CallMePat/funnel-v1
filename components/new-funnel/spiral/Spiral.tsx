"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { DictShape } from "@/app/i18n/dictionaries/fr";
import AnimatedCopy from "./AnimatedCopy";

type SpiralContent = DictShape["newFunnel"]["spiral"];

interface SpiralProps {
  content: SpiralContent;
}

const spiralVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;

const spiralFragmentShader = `
  uniform sampler2D uMap;
  uniform vec3 uCameraPosition;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vec4 tex = texture2D(uMap, vUv);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    float facing = max(dot(-normalize(vWorldNormal), viewDir), 0.0);
    float falloff = smoothstep(-0.2, 0.5, facing) * 0.45 + 0.42;
    vec3 color = mix(vec3(1.0), tex.rgb * falloff, 0.975) * 1.25;
    gl_FragColor = vec4(color, tex.a);
  }
`;

const SPIRAL_CONFIG = {
  tilesPerRevolution: 15,
  revolutions: 2,
  startRadius: 5,
  endRadius: 5,
  tileHeightRatio: 1.1,
  tileSegments: 24,
  spiralGap: 1.35,
  tileOverlap: 0.005,
  cameraZ: 12,
  // gapSize: 5,
  cameraSmoothing: 1.075,
  baseRotationSpeed: 0.004,
  scrollRotationMultiplier: 0.00022,
  rotationDecay: 0.9,
  scrollMultiplier: 1.25,
  cameraYMultiplier: 0.2,
};

export default function Spiral({ content }: SpiralProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || content.images.length === 0) return;

    const totalTiles = Math.floor(
      SPIRAL_CONFIG.tilesPerRevolution * SPIRAL_CONFIG.revolutions,
    );
    const angleStep = (Math.PI * 2) / SPIRAL_CONFIG.tilesPerRevolution;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      section.clientWidth / section.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = SPIRAL_CONFIG.cameraZ;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(section.clientWidth, section.clientHeight);
    renderer.domElement.className = "absolute inset-0 z-[1] h-full w-full";
    section.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const textures = content.images.map((src) =>
      textureLoader.load(src, (texture) => {
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      }),
    );

    const cameraPositionUniform = {
      value: new THREE.Vector3(0, 0, SPIRAL_CONFIG.cameraZ),
    };

    const tileEdgesY = [0];
    for (let index = 0; index < totalTiles; index++) {
      const progress = index / totalTiles;
      const radius =
        SPIRAL_CONFIG.startRadius +
        (SPIRAL_CONFIG.endRadius - SPIRAL_CONFIG.startRadius) * progress;
      const arcWidth =
        (2 * Math.PI * radius) / SPIRAL_CONFIG.tilesPerRevolution;
      const tileHeight = arcWidth * SPIRAL_CONFIG.tileHeightRatio;
      tileEdgesY.push(
        tileEdgesY[index] -
          (tileHeight + SPIRAL_CONFIG.spiralGap) /
            SPIRAL_CONFIG.tilesPerRevolution,
      );
    }

    const group = new THREE.Group();
    scene.add(group);

    for (let index = 0; index < totalTiles; index++) {
      const progress = index / totalTiles;
      const radius =
        SPIRAL_CONFIG.startRadius +
        (SPIRAL_CONFIG.endRadius - SPIRAL_CONFIG.startRadius) * progress;
      const arcWidth =
        (2 * Math.PI * radius) / SPIRAL_CONFIG.tilesPerRevolution;
      const tileHeight = arcWidth * SPIRAL_CONFIG.tileHeightRatio;
      const tileAngle = arcWidth / radius + SPIRAL_CONFIG.tileOverlap;
      const centerY = (tileEdgesY[index] + tileEdgesY[index + 1]) / 2;
      const slope = tileEdgesY[index + 1] - tileEdgesY[index];

      const positions: number[] = [];
      const uvs: number[] = [];
      const indices: number[] = [];
      const segments = SPIRAL_CONFIG.tileSegments;

      for (let row = 0; row <= 1; row++) {
        for (let col = 0; col <= segments; col++) {
          const angle = (col / segments - 0.5) * tileAngle;
          positions.push(
            Math.sin(angle) * radius,
            (row - 0.5) * tileHeight + (col / segments - 0.5) * slope,
            Math.cos(angle) * radius,
          );
          uvs.push(col / segments, row);
        }
      }

      for (let col = 0; col < segments; col++) {
        const current = col;
        const below = current + segments + 1;
        indices.push(
          current,
          below,
          current + 1,
          below,
          below + 1,
          current + 1,
        );
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3),
      );
      geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      const material = new THREE.ShaderMaterial({
        vertexShader: spiralVertexShader,
        fragmentShader: spiralFragmentShader,
        uniforms: {
          uMap: { value: textures[index % textures.length] },
          uCameraPosition: cameraPositionUniform,
        },
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = centerY;

      const tile = new THREE.Group();
      tile.rotation.y = index * angleStep;
      tile.add(mesh);
      group.add(tile);
    }

    const spiralHeight = Math.abs(tileEdgesY[totalTiles]);
    let lastPageYOffset = window.pageYOffset;
    let scrollY = window.pageYOffset;
    let spinVelocity = 0;
    let rafId = 0;

    const updateScale = () => {
      const scale = Math.min(1, section.clientWidth / 1400);
      group.scale.setScalar(Math.max(0.78, scale));
    };

    const onScroll = () => {
      const nextYOffset = window.pageYOffset;
      const delta = nextYOffset - lastPageYOffset;
      lastPageYOffset = nextYOffset;
      scrollY = nextYOffset;
      spinVelocity += delta * SPIRAL_CONFIG.scrollRotationMultiplier;
    };

    const onResize = () => {
      camera.aspect = section.clientWidth / section.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(section.clientWidth, section.clientHeight);
      updateScale();
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);

      const progress = Math.min(
        scrollY / (window.innerHeight * SPIRAL_CONFIG.scrollMultiplier),
        1,
      );

      camera.position.y +=
        (-(progress * spiralHeight * SPIRAL_CONFIG.cameraYMultiplier) -
          camera.position.y) *
        SPIRAL_CONFIG.cameraSmoothing;

      cameraPositionUniform.value.copy(camera.position);
      group.rotation.y += SPIRAL_CONFIG.baseRotationSpeed + spinVelocity;
      spinVelocity *= SPIRAL_CONFIG.rotationDecay;
      renderer.render(scene, camera);
    };

    updateScale();
    animate();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();

      if (section.contains(renderer.domElement)) {
        section.removeChild(renderer.domElement);
      }

      group.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((material) => material.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      textures.forEach((texture) => texture.dispose());
    };
  }, [content.images]);

  return (
    <section
      ref={sectionRef}
      className=" relative h-[150svh] w-full overflow-hidden p-5 sm:p-8 lg:p-0"
    >
      <div className=" pointer-events-none relative z-10 flex h-full w-full items-start justify-center pt-16 sm:pt-20 lg:pt-24">
        <div className="flex w-full justify-center">
          <AnimatedCopy
            text={content.heading}
            animateOnScroll={false}
            delayMs={650}
            as="h1"
            className="max-w-6xl text-center text-[clamp(2rem,8vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white"
          />
        </div>
      </div>
    </section>
  );
}
