# Vito Orlando · Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Radix UI · Lucide + React Icons

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Edit content
Everything lives in `lib/data.ts`: profile, story, skill tiers, projects. Each skill has a `level` (Daily / Often / Project / Learning); adjust these to match your real experience.
- Leave `liveUrl` / `instagram` as "" to hide that button.
- Add screenshots to `public/projects/` and set `image: "/projects/name.png"` on a project.
- Replace `public/cv.pdf` to update the CV.

## Project previews
- **Warung Sembako**: the card embeds the deployed app (`liveUrl` in `lib/data.ts`) in an iframe. Click the preview to use it in a dialog.
- **Z**: a Flutter app with no web build, so `components/ZPrototype.tsx` is an interactive recreation using the app's real theme colors (sample content is fictional).
- If the embedded site ever refuses to load inside an iframe, the dialog has an "Open in a new tab" link. The cause would be an `X-Frame-Options` / `frame-ancestors` header on that site.

## Deploy (Vercel)
Push to GitHub, import the repo in Vercel, keep the defaults (Framework: Next.js).

## Fonts
Space Grotesk and JetBrains Mono (SIL OFL 1.1), bundled locally in `app/fonts/`.
