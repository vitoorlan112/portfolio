import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutBento from "@/components/AboutBento";
import SkillsToolkit from "@/components/SkillsToolkit";
import AIPlayground from "@/components/AIPlayground";
import FeaturedProjects from "@/components/FeaturedProjects";
import ContactMe from "@/components/ContactMe";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { profile } from "@/lib/data";

export default function Page() {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative overflow-x-clip">
        {/* ambient top glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-180px] h-[840px] w-[840px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,72,0.22),rgba(225,29,72,0)_65%)]"
        />
        <CursorGlow />
        <ScrollProgressIndicator />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <AboutBento />
            <SkillsToolkit />
            <AIPlayground />
            <FeaturedProjects />
            <ContactMe />
          </main>
          <footer className="border-t border-white/[0.08] px-6 py-7 text-center font-mono text-sm text-zinc-400">
            © {new Date().getFullYear()} {profile.name} · Built with curiosity
          </footer>
        </div>
      </div>
    </TooltipProvider>
  );
}
