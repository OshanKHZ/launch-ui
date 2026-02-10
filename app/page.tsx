import CTA from "../components/sections/cta/default";
import Footer from "../components/sections/footer/default";
import Navbar from "../components/sections/navbar/default";
import Skills from "../components/sections/skills";
import Projects from "../components/sections/projects";
import Services from "../components/sections/services/index";
import About from "@/components/sections/about/index";
import TechStackCarousel from "../components/sections/logos/tech-stack";
import { LayoutLines } from "../components/ui/layout-lines";

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

