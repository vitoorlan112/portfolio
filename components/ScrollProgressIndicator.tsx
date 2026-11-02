"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { sections } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const LAST = sections.length - 1;

export default function ScrollProgressIndicator() {
  const { scrollY } = useScroll();
  const raw = useMotionValue(0);
  const fill = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.4 });
  const height = useTransform(fill, (v) => `${Math.min(Math.max(v, 0), 1) * 100}%`);
  const [position, setPosition] = useState(0); // 0..LAST (fractional)
  const anchors = useRef<number[]>([]);

  // Scroll offsets where each section "starts", so the bar tracks real sections.
  const measure = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const a = sections.map((s, i) => {
      if (i === 0) return 0;
      const el = document.getElementById(s.id);
      if (!el) return 0;
      return el.getBoundingClientRect().top + window.scrollY - 96;
    });
    a[LAST] = Math.min(a[LAST], maxScroll);
    for (let i = 1; i <= LAST; i++) a[i] = Math.max(a[i], a[i - 1] + 1);
    anchors.current = a;
  }, []);

  const update = useCallback(
    (y: number) => {
      const a = anchors.current;
      if (a.length === 0) return;
      let f = LAST;
      if (y <= a[0]) f = 0;
      else {
        for (let i = 0; i < LAST; i++) {
          if (y < a[i + 1]) {
            f = i + (y - a[i]) / (a[i + 1] - a[i]);
            break;
          }
        }
      }
      raw.set(f / LAST);
      setPosition(f);
    },
    [raw]
  );

  useEffect(() => {
    measure();
    update(window.scrollY);
    const ro = new ResizeObserver(() => {
      measure();
      update(window.scrollY);
    });
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, update]);

  useMotionValueEvent(scrollY, "change", update);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
    <motion.div
      aria-hidden
      style={{ scaleX: fill, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-40 h-[3px] bg-rose-500 shadow-[0_0_12px_2px_rgba(244,63,94,0.8)] lg:hidden"
    />
    <nav
      aria-label="Page progress"
      className="fixed right-[30px] top-1/2 z-20 hidden h-[280px] w-[2px] -translate-y-1/2 lg:block"
    >
      <div className="absolute left-0 top-0 h-full w-[2px] rounded-sm bg-white/10" />
      <motion.div
        style={{ height }}
        className="absolute left-0 top-0 w-[2px] rounded-sm bg-rose-500 shadow-[0_0_12px_2px_rgba(244,63,94,0.8)]"
      />
      {sections.map((s, i) => {
        const on = position >= i - 0.02;
        return (
          <Tooltip key={s.id}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => go(s.id)}
                aria-label={`${s.label}, ${s.dist}`}
                style={{ top: `${(i / LAST) * 100}%` }}
                className="group absolute -right-[15px] -mt-4 flex h-8 w-8 items-center justify-center"
              >
                <i
                  className={cn(
                    "block h-3 w-3 rounded-full border-2 transition duration-200 group-hover:scale-150 group-hover:border-rose-500",
                    on
                      ? "border-rose-500 bg-rose-500 shadow-[0_0_14px_3px_rgba(244,63,94,0.8)]"
                      : "border-zinc-600 bg-zinc-950"
                  )}
                />
                <span className="absolute right-10 font-mono text-[11px] text-zinc-400">
                  {s.dist}
                </span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" sideOffset={52}>
              {s.label}
            </TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
    </>
  );
}
