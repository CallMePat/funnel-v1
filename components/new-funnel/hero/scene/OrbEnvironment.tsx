"use client";

import { useEffect, useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { PMREMGenerator } from "three";
import { createOrbEnvironmentTexture } from "./createOrbEnvironment";

// Generates the procedural environment, prefilters it (PMREM) so the shell can
// use it for roughness-correct reflection/refraction, and attaches it as
// scene.environment declaratively (R3F detaches on unmount). The prefiltered
// texture is disposed manually since we created it outside the reconciler.
function OrbEnvironment() {
  const gl = useThree((state) => state.gl);

  const envTexture = useMemo(() => {
    const equirect = createOrbEnvironmentTexture();
    const pmrem = new PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();
    const target = pmrem.fromEquirectangular(equirect);
    equirect.dispose(); // source no longer needed after prefiltering
    pmrem.dispose(); // generator done; the produced texture stays valid
    return target.texture;
  }, [gl]);

  useEffect(() => () => envTexture.dispose(), [envTexture]);

  return <primitive object={envTexture} attach="environment" />;
}

export default OrbEnvironment;
