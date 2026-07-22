"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import LinesWordmark from "../footer/LinesWordmark";
import RollingDigit from "../loader/RollingDigit";

type Phase = "loading" | "break" | "expand" | "done";

export interface PreloaderProps {
  onAnimationComplete?: () => void;
}

let isInitialLoad = true;

function Preloader({ onAnimationComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<Phase>(isInitialLoad ? "loading" : "done");
  const [display, setDisplay] = useState(0);
  const hasCompletedRef = useRef(false);
  const progress = useMotionValue(0);
  const scaleX = useSpring(
    useTransform(progress, (value) => value / 100),
    {
      stiffness: 90,
      damping: 22,
    },
  );

  useEffect(() => {
    if (!isInitialLoad) return;

    const controls = animate(progress, 100, {
      duration: 4.6,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
      onComplete: () => setPhase("break"),
    });

    return () => controls.stop();
  }, [progress]);

  useEffect(() => {
    if (phase !== "break") return;

    const timer = window.setTimeout(() => setPhase("expand"), 450);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "expand") return;

    const timer = window.setTimeout(() => setPhase("done"), 850);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        isInitialLoad = false;
        onAnimationComplete?.();
      }
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [onAnimationComplete, phase]);

  if (!isInitialLoad && phase === "done") {
    return null;
  }

  const digits = String(display).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.001, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#111110] text-white"
        >
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,161,106,0.12),transparent_32%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.08),transparent_24%)]" /> */}

          <div className="relative flex h-full items-center justify-center">
            {phase === "loading" ? (
              <div className="w-[min(18rem,72vw)]">
                <div className="h-6 overflow-hidden rounded-md bg-[#2b2b29]">
                  <motion.div
                    className="h-full w-full origin-left bg-white"
                    style={{ scaleX }}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="pointer-events-none absolute flex items-center">
                  <motion.div
                    initial={{ x: 0, rotate: 0, opacity: 1 }}
                    animate={{ x: -72, rotate: -8, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    className="h-6 w-24 rounded-md bg-white"
                  />
                  <motion.div
                    initial={{ x: 0, rotate: 0, opacity: 1 }}
                    animate={{ x: 72, rotate: 8, opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                    className="h-6 w-24 rounded-md bg-white"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={
                    phase === "expand"
                      ? { opacity: 1, scale: 42 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={
                    phase === "expand"
                      ? { duration: 1, ease: [0.65, 0, 0.35, 0] }
                      : { type: "spring", stiffness: 150, damping: 18 }
                  }
                  className="w-[min(20rem,68vw)] text-[#f5f1eb] sm:w-[min(28rem,50vw)]"
                >
                  <LinesWordmark text="ISIDORE" />
                </motion.div>
              </>
            )}

            <motion.div
              animate={{ opacity: phase === "expand" ? 0 : 1 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute bottom-4 left-4 font-sans text-[22vw] font-medium leading-none tracking-[-0.06em] text-[#f5f1eb] sm:bottom-6 sm:left-6 sm:text-[14vw]"
            >
              {digits.map((digit, index) => (
                <RollingDigit key={`${index}-${digit}`} digit={Number(digit)} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { isInitialLoad };
export default Preloader;
