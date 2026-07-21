import { CanvasTexture, EquirectangularReflectionMapping, SRGBColorSpace } from "three";
import { orbConfig } from "./orbConfig";

// Builds a small equirectangular gradient on a 2D canvas to use as the scene's
// reflection/refraction environment. Cheap, deterministic, and no asset fetch —
// it just gives the glass believable colored highlights to bend.
export function createOrbEnvironmentTexture(): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  const env = orbConfig.environment;

  ctx.fillStyle = env.base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (const light of env.lights) {
    const cx = light.x * canvas.width;
    const cy = light.y * canvas.height;
    const radius = light.r * canvas.height;
    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    gradient.addColorStop(0, light.color);
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = light.alpha;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const texture = new CanvasTexture(canvas);
  texture.mapping = EquirectangularReflectionMapping;
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
