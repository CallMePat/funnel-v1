"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// Page-wide smooth (inertial) scrolling. `root` binds Lenis to the window, so
// fixed elements (the Spline scene, the navbar) and window-scroll listeners
// (the Spiral canvas) keep working unchanged.
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
