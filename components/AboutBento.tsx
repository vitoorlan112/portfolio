"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { about, profile, story } from "@/lib/data";
import { cn } from "@/lib/utils";

const steps = [
  { name: "Brainstorm", note: "Sketch the problem before the solution." },
  { name: "Learn", note: "Pick up whatever the project demands." },
  { name: "Design", note: "Plan the data, the flow and the screens." },
  { name: "Build", note: "Ship a thin slice, then iterate." },
  { name: "Ship", note: "Deploy it and put it in front of real users." },
];

const label = "font-mono text-xs tracking-[0.15em]";

export default function AboutBento() {
  const [active, setActive] = useState(4);

  return (
    <section id="about" className="wrap pt-[110px] max-md:pt-20">
      <Reveal>
        <div className="eyebrow">// 01 About</div>
        <h2 className="h2">Learning how machines learn.</h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-6">
        <Reveal className="md:col-span-4">
          <div className="glass h-full">
            <div className={cn(label, "text-rose-500")}>THE STORY</div>
            <p className="mt-4 text-[19px] leading-[1.65] text-zinc-300">{story}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="tag">{profile.university}</span>
              <span className="tag">{profile.graduation}</span>
              <span className="tag">{profile.gpa}</span>
              <span className="tag">{profile.location}</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-2">
          <div className="glass h-full border-rose-500/30 bg-[linear-gradient(160deg,rgba(159,18,57,0.45),rgba(24,24,27,0.7)_70%)]">
            <div className={cn(label, "text-rose-300")}>MINDSET</div>
            <p className="mt-4 text-2xl font-medium leading-[1.35]">
              “I can build anything with what I know now — and with everything I haven&apos;t
              learned yet.”
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-3">
          <div className="glass h-full">
            <div className={cn(label, "text-rose-500")}>WORKFLOW</div>
            <div className="mt-[22px] flex flex-wrap items-center gap-x-2 gap-y-2.5" role="group" aria-label="Workflow steps">
              {steps.map((s, i) => (
                <span key={s.name} className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      "tag text-sm transition",
                      active === i && "border-rose-600 bg-rose-600 text-white shadow-[0_0_20px_rgba(225,29,72,0.45)]"
                    )}
                  >
                    {s.name}
                  </button>
                  {i < steps.length - 1 && <span className="text-rose-500">→</span>}
                </span>
              ))}
            </div>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-[22px] leading-relaxed text-zinc-400"
              aria-live="polite"
            >
              {steps[active].note} Small loops, fast feedback, and something real at the end of every cycle.
            </motion.p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="md:col-span-3">
          <div className="glass h-full">
            <div className={cn(label, "text-rose-500")}>CURRENT FOCUS &amp; GOOD TO KNOW</div>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2.5 text-sm text-zinc-400">Now exploring</div>
                <ul className="flex flex-col gap-2 text-base">
                  {about.focus.map((f) => (
                    <li key={f}>▸ {f}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="mb-2.5 text-sm text-zinc-400">Good to know</div>
                <ul className="flex flex-col gap-2 text-base">
                  {about.goodToKnow.map((g) => (
                    <li key={g.label}>
                      <span className="text-zinc-400">{g.label}: </span>
                      {g.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
