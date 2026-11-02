"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, MousePointerClick } from "lucide-react";
import ZPrototype from "./ZPrototype";
import type { Project } from "@/lib/data";
import {
  Dialog, DialogContent, DialogDescription, DialogTitle,
} from "@/components/ui/dialog";

/** Scales a fixed-size child to the width of its container. */
function useFit(baseWidth: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / baseWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseWidth]);
  return { ref, scale };
}

function WebThumb({ url }: { url: string }) {
  const { ref, scale } = useFit(1280);
  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 260 }}>
      <iframe
        src={url}
        title="Live preview"
        loading="lazy"
        tabIndex={-1}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 bg-white"
        style={{ width: 1280, height: 260 / scale, transform: `scale(${scale})` }}
      />
    </div>
  );
}

function PhoneFrame({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  return (
    <div
      className="origin-top overflow-hidden rounded-[36px] border-[6px] border-zinc-700 bg-black shadow-[0_0_40px_rgba(225,29,72,0.25)]"
      style={{ width: 300, height: 600, transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}

function MobileThumb() {
  return (
    <div
      className="relative flex w-full justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_30%,rgba(225,29,72,.28),transparent_65%)]"
      style={{ height: 260 }}
    >
      <div className="pointer-events-none mt-5" aria-hidden {...({ inert: "" } as Record<string, string>)}>
        <PhoneFrame scale={0.72}>
          <ZPrototype />
        </PhoneFrame>
      </div>
    </div>
  );
}

export default function ProjectPreview({
  p, open, onOpenChange,
}: {
  p: Project;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const isWeb = p.previewKind === "web";
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpenChange(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenChange(true);
          }
        }}
        aria-label={`Open interactive preview of ${p.title}`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.12] bg-zinc-950 text-left transition hover:border-rose-500/60 hover:shadow-[0_0_36px_rgba(225,29,72,0.25)]"
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
          <span className="font-mono tracking-[0.2em] text-rose-500">•••</span>
          <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-xs text-zinc-500">{p.mockLabel}</span>
        </div>
        {isWeb ? <WebThumb url={p.liveUrl} /> : <MobileThumb />}
        <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent px-4 pb-4 pt-12 font-mono text-xs text-rose-300 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
          <MousePointerClick size={14} aria-hidden /> {isWeb ? "Click to open the live app" : "Click to try the prototype"}
        </span>
      </div>

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex h-[88vh] max-h-[900px] max-w-5xl flex-col gap-4 p-5 md:p-6">
          <div className="pr-8">
            <DialogTitle className="text-xl font-bold tracking-tight">{p.title}</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-zinc-400">
              {isWeb
                ? "This is the deployed app. Log in and explore."
                : "Interactive prototype recreated from the app's real theme. Sample content is fictional."}
            </DialogDescription>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
            {isWeb ? (
              <iframe src={p.liveUrl} title={`${p.title} live app`} className="h-full w-full border-0 bg-white" allow="clipboard-write" />
            ) : (
              <div className="flex h-full items-center justify-center overflow-auto p-4">
                <PhoneFrame>
                  <ZPrototype />
                </PhoneFrame>
              </div>
            )}
          </div>

          {isWeb && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start font-mono text-xs text-rose-300 hover:text-white">
              Not loading? Open in a new tab <ExternalLink size={12} aria-hidden />
            </a>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
