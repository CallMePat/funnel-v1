"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import RollingDigit from "./RollingDigit";
import Image from "next/image";
import LinesWordmark from "../footer/LinesWordmark";

type Phase = "loading" | "break" | "expand" | "done";

function Preloader() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [display, setDisplay] = useState(0);
  const progress = useMotionValue(0);
  const scaleX = useSpring(
    useTransform(progress, (v) => v / 100),
    { stiffness: 90, damping: 22 },
  );

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 5,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => setPhase("break"),
    });
    return () => controls.stop();
  }, [progress]);

  // hold the mark briefly, then let it swell
  useEffect(() => {
    if (phase !== "break") return;
    const timer = setTimeout(() => setPhase("expand"), 500);
    return () => clearTimeout(timer);
  }, [phase]);

  // start the reveal before the zoom finishes so the two blend
  useEffect(() => {
    if (phase !== "expand") return;
    const timer = setTimeout(() => setPhase("done"), 700);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const digits = String(display).padStart(3, "0").split("");

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden bg-[#111110] font-sans text-white"
        >
          {phase === "loading" ? (
            <div className="h-5 w-28 overflow-hidden bg-[#2b2b29]">
              <motion.div
                className="h-full w-full origin-left bg-white"
                style={{ scaleX }}
              />
            </div>
          ) : (
            <>
              {/* bar splits softly in two, halves drift apart as the mark takes its place */}
              <div className="pointer-events-none absolute flex items-center">
                <motion.div
                  initial={{ x: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: -64, rotate: -8, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="h-5 w-14 bg-white"
                />
                <motion.div
                  initial={{ x: 0, rotate: 0, opacity: 1 }}
                  animate={{ x: 64, rotate: 8, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="h-5 w-14 bg-white"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.35 }}
                animate={
                  phase === "expand"
                    ? { opacity: 1, scale: 70 }
                    : { opacity: 1, scale: 1 }
                }
                transition={
                  phase === "expand"
                    ? { duration: 1.2, ease: [0.65, 0, 0.35, 0] }
                    : {
                        type: "spring",
                        stiffness: 150,
                        damping: 20,
                        delay: 0.00000001,
                      }
                }
              >
                <LinesWordmark text="ISIDORE" />
                {/* <Image src="/logos/logo.png" alt="Isidore Mark" width={64} height={64} /> */}
                {/* <svg width="64" height="64" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <path d="M3 6h14l-3 4H8l4 10-3 2L3 6z" fill="white" />
                  <path d="M14 12h9l-2.5 3.5H16L14 12z" fill="white" />
                </svg> */}
              </motion.div>
            </>
          )}

          <motion.div
            animate={{ opacity: phase === "expand" ? 0 : 1 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="absolute bottom-0 left-4 translate-y-[12%] text-[22vw] font-medium leading-none sm:text-[14vw]"
          >
            {digits.map((d, i) => (
              <RollingDigit key={`${digits.length - i}`} digit={Number(d)} />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Preloader;
