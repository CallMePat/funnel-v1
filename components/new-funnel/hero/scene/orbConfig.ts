// Central, single-source-of-truth for every tunable value in the glass orb.
// Adjust look-and-feel here — no need to touch the component files.
export const orbConfig = {
  // transparent refractive outer shell
  shell: {
    radius: 1.5,
    segments: 64, // smooth enough for glass without facets; keeps tris ~8k
    transmission: 1, // fully see-through (light passes through)
    thickness: 1.3, // enough mass for attenuation to darken/tint the body
    roughness: 0.05, // crisp refraction
    ior: 1.45, // index of refraction (~real glass)
    iridescence: 0.3, // thin-film blue/violet shimmer on the rim
    iridescenceIOR: 1.3,
    iridescenceThickness: [100, 380] as [number, number],
    // transmission refracts the env map (not the HTML page), so a deep-blue
    // attenuation over a short distance is what makes the body read dark & tinted
    attenuationColor: "#33509e",
    attenuationDistance: 1.8,
    clearcoat: 0.55, // crisp glossy top layer for bright speculars
    clearcoatRoughness: 0.18,
    envMapIntensity: 1.2, // reflections carry the blue/cyan/violet highlights
    color: "#ffffff",
  },

  // warm gold nucleus + soft halo
  core: {
    radius: 0.44,
    detail: 4,
    color: "#ffcf8f",
    emissive: "#ff7a1e",
    emissiveIntensity: 5, // must punch through the tinted glass to read as glowing
    roughness: 0.45,
    halo: {
      radius: 1.05,
      color: "#ffb066",
      intensity: 0.95,
      power: 2, // higher = tighter, more central glow
    },
  },

  // faint cool haze filling the interior
  atmosphere: {
    radius: 1.36,
    segments: 48,
    color: "#5f86d8",
    intensity: 0.16, // faint — an edge hint, not an interior fill
    power: 3.2, // tight grazing rim
  },

  // idle life
  motion: {
    rotationSpeed: 0.08, // rad/s, slow drift
    breatheSpeed: 0.55, // rad/s of the sine
    breatheAmount: 0.018, // ±1.8% scale
  },

  // thin elliptical data-rings orbiting the core. one shared torus geometry is
  // reused for every ring (scaled per-ring); colors collapse to 4 shared
  // materials. Irregular tilts/axes/speeds avoid the symmetric "atom" look.
  rings: {
    geometry: { tube: 0.011, radialSegments: 8, tubularSegments: 200 },
    colors: { blue: "#5aa8ff", gold: "#e2a457" },
    opacity: { bright: 0.72, subtle: 0.3 },
    items: [
      // rx/ry = elliptical radii; shell radius is 1.5 (inside vs outside)
      { id: "r1", rx: 1.0, ry: 0.78, tilt: [0.5, 0.3, 0.9], axis: [0.2, 1, 0.35], speed: 0.12, color: "blue", subtle: false, spin: 0.4 },
      { id: "r2", rx: 1.24, ry: 1.06, tilt: [1.15, -0.5, 0.3], axis: [1, 0.3, -0.4], speed: -0.08, color: "gold", subtle: false, spin: -0.6 },
      { id: "r3", rx: 1.4, ry: 1.32, tilt: [-0.6, 0.85, -0.4], axis: [0.4, -0.7, 0.5], speed: 0.06, color: "blue", subtle: false, spin: 0.2 },
      { id: "r4", rx: 1.72, ry: 1.5, tilt: [0.9, 0.3, 1.35], axis: [0.6, 0.5, 0.6], speed: -0.05, color: "gold", subtle: true, spin: 1.0 },
      { id: "r5", rx: 1.94, ry: 1.8, tilt: [-0.35, 1.2, 0.6], axis: [-0.3, 1, 0.2], speed: 0.04, color: "blue", subtle: true, spin: -0.3 },
    ],
  },

  // holographic concentric rings on the floor beneath the orb. A single shader
  // plane draws expanding rings with a radial fade so it dissolves at the
  // center and edges — reads as a projected field, not a solid pedestal.
  ground: {
    y: -1.9,
    size: 9,
    innerColor: "#e0a45a", // warm near the light column
    outerColor: "#4f86d8", // cool toward the edges
    density: 9, // number of ring bands
    speed: 0.32, // outward crawl
    intensity: 0.5,
  },

  // procedural reflection environment (drawn to a canvas, no network fetch).
  // Mostly black with small punchy glints so the glass reads dark/clear against
  // the hero background, picking up only colored highlights — not a bright fill.
  environment: {
    base: "#040409",
    lights: [
      { x: 0.24, y: 0.3, r: 0.1, color: "#4fb0ff", alpha: 0.75 }, // cyan glint
      { x: 0.76, y: 0.34, r: 0.09, color: "#9a6cff", alpha: 0.65 }, // violet glint
      { x: 0.5, y: 0.15, r: 0.07, color: "#ffffff", alpha: 0.75 }, // bright key spec
      { x: 0.62, y: 0.8, r: 0.08, color: "#ffb060", alpha: 0.4 }, // warm underside
    ],
  },
} as const;
