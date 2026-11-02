"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 px-4 py-4 md:px-6">
      <div className="mx-auto max-w-[1180px] rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-[14px]">
        <div className="flex items-center justify-between py-2.5 pl-5 pr-3">
          <a href="#hero" className="font-mono text-lg font-medium tracking-[0.02em]" aria-label="vito.dev, home">
            vito<span className="text-rose-500">.dev</span>
          </a>
          <nav className="flex items-center gap-1" aria-label="Main">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hidden rounded-[10px] px-3.5 py-3 text-[15px] text-zinc-400 transition-colors hover:text-white md:block">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn btn-primary ml-2 min-h-11 px-5">Contact Me</a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="ml-1 flex h-11 w-11 items-center justify-center rounded-xl text-zinc-300 md:hidden"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
        {open && (
          <div id="mobile-menu" className="flex flex-col border-t border-white/10 p-2 md:hidden">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3.5 text-base text-zinc-300 active:bg-white/5">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
