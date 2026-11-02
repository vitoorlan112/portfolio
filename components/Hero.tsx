"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "@/lib/data";

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="hero" className="wrap pt-[110px] text-center">
      <motion.div
        {...fade(0)}
        className="inline-flex items-center gap-2.5 rounded-full border border-rose-500/35 bg-rose-500/[0.08] px-4 py-2"
      >
        <span className="h-2 w-2 animate-ping2 rounded-full bg-rose-500 shadow-[0_0_0_0_rgba(244,63,94,0.7)]" />
        <span className="font-mono text-[13px] text-rose-300">Open to internships</span>
      </motion.div>

      <motion.h1
        {...fade(0.1)}
        className="mt-7 bg-gradient-to-r from-white from-35% to-rose-500 bg-clip-text text-[clamp(46px,9vw,112px)] font-bold leading-none tracking-[-0.035em] text-transparent"
      >
        Hi, I&apos;m {profile.name}
      </motion.h1>

      <motion.p {...fade(0.2)} className="mt-6 text-[clamp(18px,2.4vw,26px)] text-zinc-400">
        {profile.title}
      </motion.p>

      <motion.div {...fade(0.3)} className="mt-11 flex flex-wrap justify-center gap-3">
        <a href="#work" className="btn btn-primary">
          Explore Work <ArrowRight size={18} aria-hidden />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn">
          <FaGithub size={18} aria-hidden /> GitHub
        </a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn">
          <FaLinkedinIn size={18} aria-hidden /> LinkedIn
        </a>
        <a href={profile.cv} download className="btn">
          <Download size={18} aria-hidden /> Download CV
        </a>
      </motion.div>

      <div className="mt-[72px] font-mono text-xs tracking-[0.25em] text-zinc-500">
        SCROLL <span className="text-rose-500">↓</span>
      </div>
    </section>
  );
}
