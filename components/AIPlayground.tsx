"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

/* ---------- analyzer (runs entirely in the browser) ---------- */

const POSITIVE = new Set(("love loved loves like liked great good amazing awesome excellent happy fantastic wonderful nice enjoy enjoyed best brilliant perfect fun cool helpful fast beautiful smooth clean elegant easy impressive proud excited glad thankful thanks grateful superb outstanding delightful friendly reliable useful powerful clear inspiring recommend win success successful improved better stunning lovely").split(" "));
const NEGATIVE = new Set(("hate hated hates bad terrible awful horrible sad angry worst boring slow broken poor ugly annoying useless bug buggy fail failed failure disappointing disappointed hard difficult confusing frustrating painful crash crashed error errors lag laggy messy waste problem problems worse stuck unhappy mad rude expensive unreliable weak").split(" "));
const NEGATORS = new Set(["not", "no", "never", "isnt", "wasnt", "dont", "doesnt", "didnt", "cant", "wont", "without", "hardly"]);
const BOOSTERS = new Set(["very", "really", "extremely", "so", "super", "incredibly", "absolutely", "totally"]);
const STOP = new Set(("the a an and or but if then of to in on at for with by from as is are was were be been being it its this that these those i you he she we they me my your our their them him her his hers just also than too can could would should will do does did have has had am about into over under up down out so very really not no").split(" "));

type Analysis = {
  label: "positive" | "negative" | "neutral" | null;
  confidence: number;
  score: number;
  words: number;
  chars: number;
  keywords: string[];
};

function analyze(text: string): Analysis {
  const trimmed = text.trim();
  const tokens = trimmed.toLowerCase().replace(/[’']/g, "").match(/[a-z0-9]+/g) ?? [];
  if (!tokens.length) return { label: null, confidence: 0, score: 0, words: 0, chars: text.length, keywords: [] };

  let score = 0;
  tokens.forEach((t, i) => {
    let v = POSITIVE.has(t) ? 1 : NEGATIVE.has(t) ? -1 : 0;
    if (!v) return;
    if (BOOSTERS.has(tokens[i - 1] ?? "")) v *= 1.5;
    if (NEGATORS.has(tokens[i - 1] ?? "") || NEGATORS.has(tokens[i - 2] ?? "")) v *= -0.8;
    score += v;
  });
  if ((trimmed.match(/!/g) ?? []).length) score *= 1.1;

  const label = score > 0.4 ? "positive" : score < -0.4 ? "negative" : "neutral";
  const confidence = label === "neutral" ? 0.6 : Math.min(0.99, 0.62 + 0.37 * Math.tanh(Math.abs(score) / 2.2));

  const freq = new Map<string, number>();
  tokens.forEach((t) => {
    if (t.length > 2 && !STOP.has(t) && !NEGATORS.has(t) && !BOOSTERS.has(t)) freq.set(t, (freq.get(t) ?? 0) + 1);
  });
  const keywords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
    .slice(0, 5)
    .map(([w]) => w);

  return { label, confidence, score: Math.round(score * 100) / 100, words: tokens.length, chars: text.length, keywords };
}

/* ---------- UI ---------- */

const STAGES = ["tokenizing input", "extracting keywords", "scoring sentiment"];
const SAMPLES = ["I love building with Next.js, it feels fast and clean!", "This bug is really frustrating and the docs are confusing.", "The meeting is scheduled for Monday at ten."];

function Row({ k, v, accent, last }: { k: string; v: string; accent?: boolean; last?: boolean }) {
  return (
    <div className="pl-5">
      <span className="text-zinc-500">&quot;{k}&quot;</span>: <span className={accent ? "text-rose-500" : "text-white"}>{v}</span>
      {last ? "" : ","}
    </div>
  );
}

export default function AIPlayground() {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const timers = useRef<number[]>([]);

  const result = useMemo(() => analyze(text), [text]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => clear, []);

  // Typing re-runs the analysis with a short loading flash; "Run model" replays the full pipeline.
  const flash = (full: boolean) => {
    clear();
    setBusy(0);
    if (full) {
      later(() => setBusy(1), 500);
      later(() => setBusy(2), 1000);
      later(() => setBusy(null), 1500);
    } else {
      later(() => setBusy(null), 320);
    }
  };

  const onChange = (v: string) => {
    setText(v);
    flash(false);
  };

  const hasInput = result.words > 0;

  return (
    <section id="playground" className="wrap pt-[110px] max-md:pt-20">
      <Reveal>
        <div className="eyebrow">// 03 Playground</div>
        <h2 className="h2">Try the model.</h2>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="glass mt-10 overflow-hidden border-rose-500/25 p-0">
          <div className="flex items-center gap-2 border-b border-white/[0.08] px-5 py-3.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
            <span className="ml-3 font-mono text-[13px] text-zinc-400">text-analyzer · live</span>
          </div>

          <div className="p-7 font-mono text-[15px] leading-[1.8] max-md:p-5">
            <div className="text-zinc-400">$ analyze --mode sentiment --live</div>

            <form
              className="my-4 flex flex-wrap gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (hasInput) flash(true);
              }}
            >
              <label htmlFor="pg" className="sr-only">Text to analyze</label>
              <textarea
                id="pg"
                rows={2}
                value={text}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Type or paste any sentence. Results update as you type."
                className="min-h-[72px] min-w-[220px] flex-1 resize-y rounded-xl border border-white/15 bg-zinc-950 px-4 py-3 font-mono text-[15px] leading-normal text-white placeholder:text-zinc-600"
              />
              <button type="submit" disabled={!hasInput || busy !== null} className="btn btn-primary self-start font-mono disabled:cursor-not-allowed disabled:opacity-50">
                {busy !== null ? "Running…" : "Run model"}
              </button>
            </form>

            <div className="mb-3 flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button key={s} type="button" onClick={() => onChange(s)} className="tag max-w-full truncate text-left transition hover:border-rose-500/70">
                  {s.length > 34 ? s.slice(0, 34) + "…" : s}
                </button>
              ))}
            </div>

            {busy !== null && (
              <div aria-live="polite">
                <div className="text-rose-300">
                  ▸ {STAGES[busy]}
                  <span className="animate-blink">_</span>
                </div>
                <div className="mb-3 mt-2 h-1 max-w-[420px] overflow-hidden rounded bg-white/[0.08]">
                  <div className="h-full w-2/5 animate-load bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                </div>
              </div>
            )}

            <div className="text-zinc-400">output {hasInput ? "" : "(waiting for input)"}</div>
            <div className={cn("transition-opacity", busy !== null && "opacity-40")} aria-live="polite">
              <div className="text-white">{"{"}</div>
              <Row k="label" v={result.label ? `"${result.label}"` : "null"} accent />
              <Row k="confidence" v={result.confidence.toFixed(2)} accent />
              <Row k="score" v={String(result.score)} accent />
              <Row k="words" v={String(result.words)} accent />
              <Row k="chars" v={String(result.chars)} accent />
              <Row k="keywords" v={`[${result.keywords.map((w) => `"${w}"`).join(", ")}]`} last />
              <div className="text-white">{"}"}</div>
            </div>

            <div className="mt-3 text-xs text-zinc-600">
              Lexicon-based scorer with negation and intensity handling. It runs in your browser, nothing is sent anywhere.
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
