import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        ping2: {
          "70%": { boxShadow: "0 0 0 10px rgba(244,63,94,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(244,63,94,0)" },
        },
        load: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(260%)" },
        },
        blink: { "50%": { opacity: "0" } },
      },
      animation: {
        ping2: "ping2 1.8s infinite",
        load: "load 1.4s linear infinite",
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
