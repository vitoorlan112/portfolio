"use client";

import { useState } from "react";
import { ExternalLink, Layers, Play } from "lucide-react";
import ProjectPreview from "./ProjectPreview";
import Reveal from "./Reveal";
import { projects, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

function Info({ p, n, onTry }: { p: Project; n: number; onTry: () => void }) {
  return (
    <div>
      <div className="font-mono text-[64px] font-medium leading-none text-rose-500/85">{String(n).padStart(2, "0")}</div>
      <h3 className="mb-3 mt-4 text-[32px] leading-tight tracking-[-0.01em]">{p.title}</h3>
      <span className="tag border-rose-600 bg-rose-800 text-white">{p.badge}</span>
      <div className="mt-3 font-mono text-xs text-zinc-500">{p.role} · {p.period}</div>
      <p className="mt-5 leading-[1.65] text-zinc-400">
        <b className="text-white">Problem.</b> {p.problem}
        <br />
        <b className="text-white">Solution.</b> {p.solution}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        {p.liveUrl ? (
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Live Demo <ExternalLink size={16} aria-hidden />
          </a>
        ) : (
          <button type="button" onClick={onTry} className="btn btn-primary">
            <Play size={16} aria-hidden /> Try Prototype
          </button>
        )}
        <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn">
          Source Code
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button type="button" className="btn">
              <Layers size={16} aria-hidden /> Architecture
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="text-2xl font-bold tracking-tight">{p.title}</DialogTitle>
            <DialogDescription className="mt-1 font-mono text-xs text-zinc-500">Architecture notes</DialogDescription>
            <ul className="mt-5 flex flex-col gap-3 text-[15px] leading-relaxed text-zinc-300">
              {p.architecture.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="text-rose-500">▸</span>
                  {a}
                </li>
              ))}
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const [open, setOpen] = useState(false);
  const flip = i % 2 === 1;
  const preview = <ProjectPreview p={p} open={open} onOpenChange={setOpen} />;
  const info = <Info p={p} n={i + 1} onTry={() => setOpen(true)} />;
  return (
    <Reveal>
      <article className="glass grid grid-cols-1 items-center gap-10 p-10 max-md:p-5 md:grid-cols-[1fr_1.1fr]">
        {flip ? (
          <>
            <div className="max-md:order-2">{preview}</div>
            <div className="max-md:order-1">{info}</div>
          </>
        ) : (
          <>
            {info}
            {preview}
          </>
        )}
      </article>
    </Reveal>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="work" className="wrap pt-[110px] max-md:pt-20">
      <Reveal>
        <div className="eyebrow">// 04 Work</div>
        <h2 className="h2">Featured projects.</h2>
      </Reveal>
      <div className="mt-12 flex flex-col gap-7">
        {projects.map((p, i) => (
          <Card key={p.id} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
