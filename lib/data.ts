/**
 * Single source of truth for portfolio content.
 * Edit this file to update the site — no need to touch components.
 * Leave a URL as "" to hide the matching button.
 */

export const profile = {
  name: "Vito Orlando",
  initials: "VO",
  title: "Computer Science Student & Aspiring AI Developer",
  location: "Central Jakarta, Indonesia",
  university: "Universitas Tarumanagara",
  graduation: "Expected Feb 2028",
  gpa: "GPA 3.75 / 4.00",
  email: "vito.linggau@gmail.com",
  github: "https://github.com/vitoorlan112",
  linkedin: "https://www.linkedin.com/in/vito-orlando-49611b445",
  instagram: "", // add your Instagram URL to show the button
  cv: "/cv.pdf",
};

export const story =
  "I'm a Computer Science student who likes turning ideas into software people actually use. I've shipped a full-stack inventory system tested by a real grocery store, built a cross-platform social app, and trained a model that reads facial expressions. I also spent 1.5 years as a data analyst at an AI-driven marketing startup, where I learned how the data behind a model shapes what it produces.";

export const about = {
  focus: [
    "AI-assisted software engineering",
    "Mobile & frontend development",
    "Data mining",
  ],
  goodToKnow: [
    { label: "Languages", value: "Indonesian, English" },
    { label: "Availability", value: "6 months – 1 year" },
    { label: "Based in", value: "Central Jakarta" },
  ],
};

export type TechIconKey =
  | "tensorflow" | "pytorch" | "sklearn" | "opencv" | "huggingface"
  | "node" | "fastapi" | "postgres" | "prisma"
  | "react" | "next" | "flutter" | "tailwind" | "html"
  | "git" | "github" | "docker" | "vscode"
  | "python" | "javascript" | "typescript" | "cpp" | "dart";

export type SkillLevel = "Daily" | "Often" | "Project" | "Learning";

export type Skill = { key: TechIconKey; name: string; level: SkillLevel; usage: string };
export type Tier = { label: string; skills: Skill[] };

/** Top of the pyramid = specialisations, base = foundations. */
export const skillTiers: Tier[] = [
  {
    label: "AI & ML",
    skills: [
      { key: "tensorflow", name: "TensorFlow", level: "Project", usage: "Facial expression classifier for my Machine Learning course" },
      { key: "pytorch", name: "PyTorch", level: "Learning", usage: "Exploring deep learning beyond TensorFlow" },
    ],
  },
  {
    label: "Models & Vision",
    skills: [
      { key: "sklearn", name: "scikit-learn", level: "Learning", usage: "Classic ML baselines and data mining practice" },
      { key: "opencv", name: "OpenCV", level: "Learning", usage: "Image preprocessing for computer vision" },
      { key: "huggingface", name: "Hugging Face", level: "Learning", usage: "Pretrained transformers and NLP models" },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { key: "node", name: "Node.js", level: "Often", usage: "Express API behind the inventory system" },
      { key: "fastapi", name: "FastAPI", level: "Learning", usage: "Serving ML models as APIs" },
      { key: "postgres", name: "PostgreSQL", level: "Often", usage: "Supabase-hosted stock and batch data" },
      { key: "prisma", name: "Prisma", level: "Often", usage: "Type-safe ORM and migrations" },
    ],
  },
  {
    label: "Frameworks & UI",
    skills: [
      { key: "react", name: "React", level: "Often", usage: "Component-driven web interfaces" },
      { key: "next", name: "Next.js", level: "Daily", usage: "Inventory frontend and this portfolio" },
      { key: "flutter", name: "Flutter", level: "Project", usage: "Cross-platform Z social media app" },
      { key: "tailwind", name: "Tailwind CSS", level: "Daily", usage: "Styling every web project" },
      { key: "html", name: "HTML/CSS", level: "Often", usage: "Responsive layouts and animation" },
    ],
  },
  {
    label: "Tools & DevOps",
    skills: [
      { key: "git", name: "Git", level: "Daily", usage: "Branching and merging in team projects" },
      { key: "github", name: "GitHub", level: "Daily", usage: "Code review and collaboration with 3 teammates" },
      { key: "docker", name: "Docker", level: "Learning", usage: "Containerising apps for repeatable deploys" },
      { key: "vscode", name: "VS Code", level: "Daily", usage: "Primary editor for web and ML work" },
    ],
  },
  {
    label: "Languages",
    skills: [
      { key: "python", name: "Python", level: "Often", usage: "Machine learning and data work" },
      { key: "javascript", name: "JavaScript", level: "Daily", usage: "Full-stack web development" },
      { key: "typescript", name: "TypeScript", level: "Often", usage: "Typed React and Next.js code" },
      { key: "cpp", name: "C++", level: "Project", usage: "Coursework: data structures and algorithms" },
      { key: "dart", name: "Dart", level: "Project", usage: "Flutter mobile development" },
    ],
  },
];

export type Project = {
  id: "inventory" | "z-app";
  title: string;
  badge: string;
  period: string;
  role: string;
  problem: string;
  solution: string;
  stack: string[];
  architecture: string[];
  mockLabel: string;
  previewKind: "web" | "mobile";
  liveUrl: string; // real deployed app (embedded as an interactive preview)
  sourceUrl: string;
};

export const projects: Project[] = [
  {
    id: "inventory",
    title: "Warung Sembako Abah Andi",
    badge: "Tested by real users",
    period: "Feb 2026 – Jun 2026",
    role: "Full-stack Developer · Team of 4",
    problem:
      "A grocery store needed a dependable way to track stock and know when items are expiring, running low, or overstocked.",
    solution:
      "A full-stack inventory system with automatic alerts, FEFO stock rules and Economic Order Quantity (EOQ) analysis to guide restocking, validated by the shop owner and staff in daily use.",
    stack: ["Next.js 15", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    architecture: [
      "Next.js 15 frontend deployed on Vercel; Express.js REST API deployed on Railway.",
      "PostgreSQL on Supabase, accessed through Prisma ORM.",
      "Dual-JWT authentication with bcrypt password hashing.",
      "Business logic in a services layer: FEFO (first expired, first out) stock movement and EOQ analysis.",
      "Product image upload via Cloudinary; product import from spreadsheets; PDF/Excel reports.",
    ],
    mockLabel: "kelompok2-manajemen-stok-kedaluwars.vercel.app",
    previewKind: "web",
    liveUrl: "https://kelompok2-manajemen-stok-kedaluwars.vercel.app",
    sourceUrl: "https://github.com/akmals06/kelompok2-manajemen-stok-kedaluwarsa",
  },
  {
    id: "z-app",
    title: "Z: Social Media App",
    badge: "iOS & Android",
    period: "Aug 2025 – Oct 2025",
    role: "Mobile UI / Frontend Developer · Team of 4",
    problem:
      "People expect social apps to feel instant: chat, posts and comments that update in real time on any phone.",
    solution:
      "A cross-platform Flutter app with a feed, search, notifications, community, real-time chat and profile editing. I designed the homepage UI and implemented several core features.",
    stack: ["Flutter", "Dart", "Firebase", "Android Studio"],
    architecture: [
      "Single Flutter codebase targeting iOS and Android.",
      "Feature-first structure: auth, feed, search, notification, community, chat and profile modules.",
      "Firebase Auth gates the app; Firebase backs data and real-time messaging.",
      "Shared theme with dark and light variants.",
    ],
    mockLabel: "z-app · interactive prototype",
    previewKind: "mobile",
    liveUrl: "",
    sourceUrl: "https://github.com/belutamazon/UTS-Mobile-Programming",
  },
];

export const sections = [
  { id: "hero", label: "Hero", dist: "0m" },
  { id: "about", label: "About", dist: "+8m" },
  { id: "skills", label: "Skills", dist: "+15m" },
  { id: "work", label: "Work", dist: "+22m" },
  { id: "contact", label: "Contact Me", dist: "+30m" },
] as const;
