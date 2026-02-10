import CTA from "../components/sections/cta/default";
import Footer from "../components/sections/footer/default";
import Navbar from "../components/sections/navbar/default";
import Skills from "../components/sections/skills";
import { LayoutLines } from "../components/ui/layout-lines";
import dynamic from "next/dynamic";

// Lazy load sections below the fold for better initial load performance
const Projects = dynamic(() => import("../components/sections/projects").then(mod => ({ default: mod.default })), {
  loading: () => <div className="h-screen bg-background" />,
});

const TechStackCarousel = dynamic(() => import("../components/sections/logos/tech-stack").then(mod => ({ default: mod.default })), {
  loading: () => <div className="h-96 bg-background" />,
});

const Services = dynamic(() => import("../components/sections/services/index").then(mod => ({ default: mod.default })), {
  loading: () => <div className="h-screen bg-background" />,
});

const About = dynamic(() => import("@/components/sections/about/index").then(mod => ({ default: mod.default })), {
  loading: () => <div className="h-screen bg-background" />,
});

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <Navbar />
      <Skills />
      <TechStackCarousel />
      <Projects />
      <Services />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}

