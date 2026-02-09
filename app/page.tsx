import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Logos from "../components/sections/logos/default";
import Navbar from "../components/sections/navbar/default";
import Pricing from "../components/sections/pricing/default";
import Skills from "../components/sections/skills";
import Projects from "../components/sections/projects";
import Services from "../components/sections/services/index";
import About from "@/components/sections/about/index"; // Added this line
import TechStackCarousel from "../components/sections/logos/tech-stack";
import Stats from "../components/sections/stats/default";
import { LayoutLines } from "../components/ui/layout-lines";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full">
      <LayoutLines />
      <Navbar />
      {/* <Hero /> */}
      {/* <Logos /> */}
      {/* <Items /> */}
      {/* <Stats /> */}
      <Skills />
      <TechStackCarousel />
      <Projects />
      <Services />
      <About />
      {/* <Pricing /> */}
      {/* <FAQ /> */}
      <CTA />
      <Footer />
    </main>
  );
}

