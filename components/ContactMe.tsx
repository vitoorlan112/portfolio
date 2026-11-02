"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Download, Mail } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import Reveal from "./Reveal";
import { profile } from "@/lib/data";

export default function ContactMe() {
  const [copied, setCopied] = useState(false);
  const t = useRef<number>();
  useEffect(() => () => window.clearTimeout(t.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.clearTimeout(t.current);
      t.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="wrap pb-[110px] pt-[110px] text-center max-md:pt-20">
      <svg
        className="pointer-events-none absolute left-0 top-[60px] h-[520px] w-full"
        viewBox="0 0 1180 520"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g stroke="rgba(244,63,94,.28)" strokeWidth="1" fill="none">
          <path d="M60 120 L260 300 L460 140 L700 330 L930 150 L1120 300" />
          <path d="M260 300 L330 470 L700 330 L840 480 L1120 300" />
          <path d="M460 140 L600 40 L930 150" />
        </g>
        <g fill="#F43F5E">
          {[[60,120,4],[260,300,5],[460,140,4],[700,330,6],[930,150,4],[1120,300,5],[330,470,3],[840,480,4],[600,40,3]].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>

      <Reveal className="relative">
        <div className="eyebrow">// 05 Contact Me</div>
        <h2 className="mt-4 text-[clamp(40px,7vw,88px)] font-bold leading-none tracking-[-0.03em]">
          Let&apos;s build something.
        </h2>
        <p className="mx-auto mt-5 max-w-[480px] text-lg text-zinc-400">
          Internships, collaborations, or a good idea over coffee. My inbox is open.
        </p>
        <div className="mt-11 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={copy} className="btn btn-primary" aria-live="polite">
            {copied ? <Check size={18} aria-hidden /> : <Copy size={18} aria-hidden />}
            {copied ? "Copied" : "Copy Email"}
          </button>
          <a href={`mailto:${profile.email}`} className="btn"><Mail size={18} aria-hidden /> Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn"><FaGithub size={18} aria-hidden /> GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn"><FaLinkedinIn size={18} aria-hidden /> LinkedIn</a>
          {profile.instagram && (
            <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="btn"><FaInstagram size={18} aria-hidden /> Instagram</a>
          )}
          <a href={profile.cv} download className="btn"><Download size={18} aria-hidden /> Download CV</a>
        </div>
      </Reveal>
    </section>
  );
}
