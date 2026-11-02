"use client";

import { useState } from "react";
import { Bell, Heart, Home, MessageCircle, Repeat2, Search, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Interactive recreation of the Z app (Flutter) using its real theme colors:
 * background #000000, text #E7E9EA, secondary #71767B, accent #1D9BF0, divider #2F3336.
 * Sample content is fictional; this is a prototype, not the shipped app.
 */

const C = { bg: "#000000", text: "#E7E9EA", sub: "#71767B", accent: "#1D9BF0", line: "#2F3336" };

type Post = { id: number; name: string; handle: string; body: string; likes: number; liked: boolean; replies: number; reposts: number };
type Msg = { from: "me" | "them"; text: string };
type Tab = "home" | "search" | "notif" | "chat" | "profile";

const initialPosts: Post[] = [
  { id: 1, name: "Rina", handle: "@rina.codes", body: "Shipped my first Flutter app today. Hot reload is addictive.", likes: 24, liked: false, replies: 3, reposts: 2 },
  { id: 2, name: "Dimas", handle: "@dimasdev", body: "Firebase auth + Firestore streams = real-time chat in an afternoon.", likes: 41, liked: false, replies: 5, reposts: 7 },
  { id: 3, name: "Sari", handle: "@sari.ui", body: "Dark mode first. Light mode is just the bonus level.", likes: 18, liked: false, replies: 1, reposts: 0 },
];

const topics = ["#flutter", "#firebase", "#mobiledev", "#uidesign", "#darkmode", "#hackathon"];
const people = ["Rina · @rina.codes", "Dimas · @dimasdev", "Sari · @sari.ui", "Budi · @budi.mobile"];
const notifs = [
  "Dimas liked your post",
  "Sari replied: “Love this layout”",
  "Rina started following you",
  "Budi mentioned you in a post",
];
const chats = [
  { name: "Rina", last: "Did you push the new feed UI?", seed: ["Did you push the new feed UI?"] },
  { name: "Dimas", last: "Chat streams are working now", seed: ["Chat streams are working now"] },
];

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{ width: size, height: size, background: C.line, color: C.text, fontSize: size * 0.42 }}
    >
      {name[0]}
    </span>
  );
}

export default function ZPrototype() {
  const [tab, setTab] = useState<Tab>("home");
  const [posts, setPosts] = useState(initialPosts);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [openChat, setOpenChat] = useState<number | null>(null);
  const [threads, setThreads] = useState<Msg[][]>(chats.map((c) => c.seed.map((t) => ({ from: "them", text: t }))));
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "You", bio: "Building things with Flutter." });
  const [followed, setFollowed] = useState(false);

  const post = () => {
    const t = draft.trim();
    if (!t) return;
    setPosts((p) => [{ id: Date.now(), name: profile.name, handle: "@you", body: t, likes: 0, liked: false, replies: 0, reposts: 0 }, ...p]);
    setDraft("");
  };
  const like = (id: number) =>
    setPosts((p) => p.map((x) => (x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x)));

  const send = () => {
    const t = msg.trim();
    if (!t || openChat === null) return;
    const i = openChat;
    setThreads((th) => th.map((m, k) => (k === i ? [...m, { from: "me", text: t }] : m)));
    setMsg("");
    setTimeout(() => setThreads((th) => th.map((m, k) => (k === i ? [...m, { from: "them", text: "Nice, got it!" }] : m))), 900);
  };

  const q = query.toLowerCase();
  const nav: { id: Tab; icon: typeof Home; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "notif", icon: Bell, label: "Notifications" },
    { id: "chat", icon: MessageCircle, label: "Chat" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const input = "w-full rounded-full border bg-transparent px-3 py-2 text-[13px] outline-none placeholder:text-[#71767B] focus:border-[#1D9BF0]";

  return (
    <div className="flex h-full w-full flex-col text-left" style={{ background: C.bg, color: C.text, fontFamily: "system-ui, sans-serif" }}>
      <div className="flex items-center justify-center py-2.5" style={{ borderBottom: `1px solid ${C.line}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/projects/z-logo.png" alt="Z" className="h-6 w-6 rounded-md" />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "home" && (
          <div>
            <div className="flex gap-2 p-3" style={{ borderBottom: `1px solid ${C.line}` }}>
              <Avatar name={profile.name} />
              <div className="flex-1">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && post()}
                  placeholder="What's happening?"
                  aria-label="Write a post"
                  className={input}
                  style={{ borderColor: C.line, color: C.text }}
                />
                <button type="button" onClick={post} disabled={!draft.trim()} className="mt-2 rounded-full px-4 py-1.5 text-xs font-bold text-white disabled:opacity-40" style={{ background: C.accent }}>
                  Post
                </button>
              </div>
            </div>
            {posts.map((p) => (
              <article key={p.id} className="flex gap-2 p-3" style={{ borderBottom: `1px solid ${C.line}` }}>
                <Avatar name={p.name} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px]"><b>{p.name}</b> <span style={{ color: C.sub }}>{p.handle}</span></div>
                  <p className="mt-0.5 text-[13px] leading-snug">{p.body}</p>
                  <div className="mt-2 flex gap-5 text-[11px]" style={{ color: C.sub }}>
                    <span className="flex items-center gap-1"><MessageCircle size={14} />{p.replies}</span>
                    <span className="flex items-center gap-1"><Repeat2 size={14} />{p.reposts}</span>
                    <button type="button" onClick={() => like(p.id)} aria-pressed={p.liked} aria-label="Like" className="flex items-center gap-1" style={{ color: p.liked ? "#F91880" : C.sub }}>
                      <Heart size={14} fill={p.liked ? "#F91880" : "none"} />{p.likes}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {tab === "search" && (
          <div className="p-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Z" aria-label="Search" className={input} style={{ borderColor: C.line, color: C.text }} />
            <div className="mt-3 text-xs font-bold" style={{ color: C.sub }}>Trending</div>
            {topics.filter((t) => t.includes(q)).map((t) => (
              <button type="button" key={t} onClick={() => setQuery(t.slice(1))} className="block w-full py-2 text-left text-[13px] font-bold">{t}</button>
            ))}
            <div className="mt-3 text-xs font-bold" style={{ color: C.sub }}>People</div>
            {people.filter((t) => t.toLowerCase().includes(q)).map((t) => (
              <div key={t} className="py-2 text-[13px]">{t}</div>
            ))}
          </div>
        )}

        {tab === "notif" &&
          notifs.map((n) => (
            <div key={n} className="flex items-center gap-2 p-3 text-[13px]" style={{ borderBottom: `1px solid ${C.line}` }}>
              <Bell size={16} style={{ color: C.accent }} /> {n}
            </div>
          ))}

        {tab === "chat" &&
          (openChat === null ? (
            chats.map((c, i) => (
              <button type="button" key={c.name} onClick={() => setOpenChat(i)} className="flex w-full items-center gap-2 p-3 text-left" style={{ borderBottom: `1px solid ${C.line}` }}>
                <Avatar name={c.name} size={36} />
                <div className="min-w-0">
                  <div className="text-[13px] font-bold">{c.name}</div>
                  <div className="truncate text-xs" style={{ color: C.sub }}>{threads[i][threads[i].length - 1].text}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="flex h-full flex-col">
              <button type="button" onClick={() => setOpenChat(null)} className="p-3 text-left text-xs" style={{ color: C.accent }}>← {chats[openChat].name}</button>
              <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-3">
                {threads[openChat].map((m, i) => (
                  <div key={i} className={cn("max-w-[80%] rounded-2xl px-3 py-1.5 text-[13px]", m.from === "me" ? "self-end" : "self-start")} style={{ background: m.from === "me" ? C.accent : C.line }}>
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3">
                <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message" aria-label="Message" className={input} style={{ borderColor: C.line, color: C.text }} />
                <button type="button" onClick={send} aria-label="Send" style={{ color: C.accent }}><Send size={18} /></button>
              </div>
            </div>
          ))}

        {tab === "profile" && (
          <div className="p-4">
            <Avatar name={profile.name} size={56} />
            {editing ? (
              <div className="mt-3 flex flex-col gap-2">
                <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} aria-label="Name" className={input} style={{ borderColor: C.line, color: C.text }} />
                <input value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} aria-label="Bio" className={input} style={{ borderColor: C.line, color: C.text }} />
                <button type="button" onClick={() => setEditing(false)} className="self-start rounded-full px-4 py-1.5 text-xs font-bold text-white" style={{ background: C.accent }}>Save</button>
              </div>
            ) : (
              <>
                <div className="mt-3 text-base font-bold">{profile.name}</div>
                <div className="text-xs" style={{ color: C.sub }}>@you</div>
                <p className="mt-2 text-[13px]">{profile.bio}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => setEditing(true)} className="rounded-full border px-4 py-1.5 text-xs font-bold" style={{ borderColor: C.line }}>Edit profile</button>
                  <button type="button" onClick={() => setFollowed((f) => !f)} className="rounded-full px-4 py-1.5 text-xs font-bold" style={{ background: followed ? "transparent" : C.text, color: followed ? C.text : "#000", border: `1px solid ${C.line}` }}>
                    {followed ? "Following" : "Follow"}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <nav className="flex justify-around py-2" style={{ borderTop: `1px solid ${C.line}` }} aria-label="Z tabs">
        {nav.map(({ id, icon: Icon, label }) => (
          <button key={id} type="button" aria-label={label} aria-current={tab === id} onClick={() => setTab(id)} className="p-1.5" style={{ color: tab === id ? C.accent : C.sub }}>
            <Icon size={20} />
          </button>
        ))}
      </nav>
    </div>
  );
}
