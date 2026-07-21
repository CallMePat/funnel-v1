"use client";

import { Component, Suspense, type ReactNode } from "react";
import Spline from "@splinetool/react-spline";

interface SplineBackgroundProps {
  scene: string;
}

// If the scene fails to load (network blip, offline dev, CDN hiccup), Spline
// throws "Failed to fetch". Without a boundary that error bubbles up and takes
// down the whole page. Here we swallow it and simply render nothing, so the
// hero falls back to its dark background instead of crashing.
class SplineErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

// Client-side Spline runtime. Loading it in the browser (rather than the
// `/next` server component) avoids a server-side fetch that can hang and leave
// the hero's Suspense boundary pending forever.
export default function SplineBackground({ scene }: SplineBackgroundProps) {
  return (
    <SplineErrorBoundary>
      <Suspense fallback={null}>
        <Spline scene={scene} className="!h-full !w-full" />
      </Suspense>
    </SplineErrorBoundary>
  );
}
