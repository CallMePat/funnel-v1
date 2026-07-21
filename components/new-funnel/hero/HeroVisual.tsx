"use client";

import dynamic from "next/dynamic";

// three.js is client-only; ssr:false keeps it out of the server bundle and
// avoids prerendering the WebGL canvas.
const HeroScene = dynamic(() => import("./scene/HeroScene"), { ssr: false });

function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <HeroScene />
    </div>
  );
}

export default HeroVisual;
