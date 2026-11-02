"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import type { IconType } from "react-icons";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiDart, SiHtml5,
  SiReact, SiNextdotjs, SiNodedotjs, SiFlutter, SiTensorflow, SiPytorch,
  SiScikitlearn, SiOpencv, SiHuggingface, SiFastapi, SiPostgresql, SiPrisma,
  SiTailwindcss, SiGit, SiGithub, SiDocker,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Reveal from "./Reveal";
import { skillTiers, type Skill, type TechIconKey } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const icons: Record<TechIconKey, IconType> = {
  tensorflow: SiTensorflow, pytorch: SiPytorch, sklearn: SiScikitlearn, opencv: SiOpencv, huggingface: SiHuggingface,
  node: SiNodedotjs, fastapi: SiFastapi, postgres: SiPostgresql, prisma: SiPrisma,
  react: SiReact, next: SiNextdotjs, flutter: SiFlutter, tailwind: SiTailwindcss, html: SiHtml5,
  git: SiGit, github: SiGithub, docker: SiDocker, vscode: VscVscode,
  python: SiPython, javascript: SiJavascript, typescript: SiTypescript, cpp: SiCplusplus, dart: SiDart,
};


/** Official brand colors. Marks that are black/near-black by default (Next.js, GitHub, Prisma) use white/light so they stay visible on the dark UI. Python uses its blue-to-yellow gradient. */
const BRAND: Record<TechIconKey, string> = {
  tensorflow: "#FF6F00", pytorch: "#EE4C2C", sklearn: "#F7931E", opencv: "#5C3EE8", huggingface: "#FFD21E",
  node: "#5FA04E", fastapi: "#009688", postgres: "#4169E1", prisma: "#E2E8F0",
  react: "#61DAFB", next: "#FFFFFF", flutter: "#54C5F8", tailwind: "#06B6D4", html: "#E34F26",
  git: "#F05032", github: "#FFFFFF", docker: "#2496ED", vscode: "#007ACC",
  python: "url(#brand-python)", javascript: "#F7DF1E", typescript: "#3178C6", cpp: "#659AD2", dart: "#40C4FF",
};

function BrandDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
      <defs>
        <linearGradient id="brand-python" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0.45" stopColor="#4B8BBE" />
          <stop offset="0.55" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- pyramid geometry (desktop design is 1180px wide, scaled to fit) ---------- */
const DESIGN_W = 1180;
const TIER_H = 112;
const GAP = 10;
const DESIGN_H = TIER_H * skillTiers.length + GAP * (skillTiers.length - 1);
// Width of the horizontal edges between tiers: edges[j] is tier j's top, edges[j+1] its bottom.
const EDGES = [170, 330, 450, 570, 690, 790, 880];
// Crimson ramp: pale at the apex, deep at the base.
const STROKE = ["#fda4af", "#fb7185", "#f43f5e", "#e11d48", "#be123c", "#9f1239"];
const FILL = ["#2a0e16", "#260d14", "#210b12", "#1c0a10", "#18090e", "#14080c"];

function Tile({ skill }: { skill: Skill }) {
  const reduce = useReducedMotion();
  const Icon = icons[skill.key];
  const [open, setOpen] = useState(false);
  const touch = useRef(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-14, 14]), { stiffness: 220, damping: 18 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [14, -14]), { stiffness: 220, damping: 18 });

  const move = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <Tooltip open={open} onOpenChange={(v) => { if (!touch.current) setOpen(v); }}>
      <TooltipTrigger asChild>
        <motion.div
          tabIndex={0}
          aria-label={`${skill.name}, ${skill.level}: ${skill.usage}`}
          onPointerDown={(e: PointerEvent) => { touch.current = e.pointerType === "touch"; }}
          onPointerUp={(e: PointerEvent) => { if (e.pointerType === "touch") setOpen((o) => !o); }}
          onMouseMove={move}
          onMouseLeave={reset}
          onBlur={() => { reset(); if (touch.current) setOpen(false); }}
          whileHover={reduce ? undefined : { y: -6 }}
          style={{ rotateX, rotateY, transformPerspective: 600 }}
          className="group flex h-[88px] w-[78px] shrink-0 cursor-default flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/80 transition-[border-color,box-shadow] duration-300 hover:border-rose-500/60 hover:shadow-[0_0_30px_rgba(225,29,72,0.4)] focus-visible:border-rose-500/60 max-lg:h-[78px] max-lg:w-[58px] max-lg:gap-1.5"
        >
          <Icon
            size={26}
            aria-hidden
            fill={BRAND[skill.key].startsWith("url") ? BRAND[skill.key] : "currentColor"}
            style={{ color: BRAND[skill.key] }}
            className="transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_6px_rgba(255,255,255,0.25))]"
          />
          <span className="px-0.5 text-center text-[11px] leading-tight max-lg:text-[10px] text-zinc-400 transition-colors group-hover:text-white">
            {skill.name}
          </span>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="mb-0.5 block font-mono text-[11px] uppercase tracking-wider text-rose-300">{skill.level}</span>
        {skill.usage}
      </TooltipContent>
    </Tooltip>
  );
}

function Label({ children, i }: { children: string; i: number }) {
  return (
    <span
      className="shrink-0 whitespace-nowrap rounded-lg border px-3.5 py-2 text-sm font-semibold text-white"
      style={{ borderColor: STROKE[i], background: FILL[i] }}
    >
      {children}
    </span>
  );
}

/** Desktop: stepped trapezoid pyramid with side labels and dotted connectors. */
function DesktopPyramid() {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      if (el.clientWidth > 0) setScale(Math.min(1, el.clientWidth / DESIGN_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={host} className="hidden w-full lg:block">
      <div className="mx-auto" style={{ width: DESIGN_W * scale, height: DESIGN_H * scale }}>
        <div style={{ width: DESIGN_W, height: DESIGN_H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {skillTiers.map((tier, j) => {
            const top = EDGES[j];
            const bottom = EDGES[j + 1];
            const inset = ((bottom - top) / 2 / bottom) * 100;
            const left = j % 2 === 0;
            const reach = (bottom - top) / 4; // connector ends at the slanted edge's midpoint
            const line = (
              <span
                aria-hidden
                className="h-0 flex-1 border-t-2 border-dashed border-zinc-600"
                style={left ? { marginRight: -reach } : { marginLeft: -reach }}
              />
            );
            return (
              <div key={tier.label} className="flex items-center" style={{ height: TIER_H, marginTop: j ? GAP : 0 }}>
                <div className="flex flex-1 items-center">{left && (<><Label i={j}>{tier.label}</Label>{line}</>)}</div>

                <div className="relative z-10 h-full" style={{ width: bottom }}>
                  <svg
                    aria-hidden
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    style={{ filter: "drop-shadow(0 0 14px rgba(225,29,72,0.16))" }}
                  >
                    <polygon
                      points={`${inset},0 ${100 - inset},0 100,100 0,100`}
                      fill={FILL[j]}
                      stroke={STROKE[j]}
                      strokeWidth="2"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                  <div className="relative flex h-full items-center justify-center gap-2.5">
                    {tier.skills.map((s) => <Tile key={s.key} skill={s} />)}
                  </div>
                </div>

                <div className="flex flex-1 flex-row-reverse items-center">{!left && (<><Label i={j}>{tier.label}</Label>{line}</>)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Mobile: the same tiers stacked, each band slightly wider than the last. */
function MobilePyramid() {
  const widths = [62, 76, 90, 100, 100, 100];
  return (
    <div className="flex flex-col items-center gap-3 lg:hidden">
      {skillTiers.map((tier, j) => (
        <div key={tier.label} className="w-full" style={{ maxWidth: `${widths[j]}%` }}>
          <div className="mb-1.5 text-center font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: STROKE[j] }}>
            {tier.label}
          </div>
          <div
            className="flex flex-wrap justify-center gap-1.5 rounded-2xl border p-2.5 sm:gap-2.5"
            style={{ borderColor: STROKE[j], background: FILL[j] }}
          >
            {tier.skills.map((s) => <Tile key={s.key} skill={s} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SkillsToolkit() {
  return (
    <section id="skills" className="wrap pt-[110px] text-center max-md:pt-20">
      <Reveal>
        <div className="eyebrow">// 02 Toolkit</div>
        <h2 className="h2">Skills &amp; Toolkit</h2>
        <p className="mx-auto mt-4 max-w-[540px] text-[17px] text-zinc-400">
          Hover or tap a tile. Specialisations at the peak, foundations at the base.
        </p>
      </Reveal>
      <Reveal delay={0.1} className="mt-14">
        <BrandDefs />
        <DesktopPyramid />
        <MobilePyramid />
      </Reveal>
    </section>
  );
}
