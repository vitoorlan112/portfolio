"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 900;

export default function CursorGlow() {
  const mouseX = useMotionValue(-SIZE);
  const mouseY = useMotionValue(-SIZE);
  const x = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.5 });
  const y = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.5 });
  // Inner core follows faster so the light feels dense at the pointer.
  const cx = useSpring(mouseX, { stiffness: 380, damping: 28, mass: 0.3 });
  const cy = useSpring(mouseY, { stiffness: 380, damping: 28, mass: 0.3 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      mouseX.set(e.clientX - SIZE / 2);
      mouseY.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          x, y, width: SIZE, height: SIZE,
          background: "radial-gradient(circle at center, rgba(225,29,72,0.26) 0, rgba(225,29,72,0.12) 35%, transparent 70%)",
        }}
        className="pointer-events-none fixed left-0 top-0 z-0"
      />
      <motion.div
        aria-hidden
        style={{
          x: cx, y: cy, width: SIZE, height: SIZE,
          background: "radial-gradient(circle at center, rgba(244,63,94,0.30) 0, rgba(244,63,94,0.10) 9%, transparent 16%)",
        }}
        className="pointer-events-none fixed left-0 top-0 z-0"
      />
    </>
  );
}
