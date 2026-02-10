"use client";

import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SectionHeader } from "@/components/ui/section-header";
import VariableProximity from "@/components/ui/variable-proximity";

import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  liveUrl?: string;
  codeUrl?: string;
}

function ProjectCard({ children, className, isLarge = false, liveUrl, codeUrl }: ProjectCardProps) {
  return (
    <div className={cn("relative p-1 group/card", isLarge ? "col-span-3 row-span-2" : "col-span-3", className)}>
      {/* Cantoneiras nas 4 pontas - fixas fora do conteúdo */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-foreground/60 pointer-events-none transition-transform duration-300 group-hover/card:-translate-x-0.5 group-hover/card:-translate-y-0.5" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-foreground/60 pointer-events-none transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-foreground/60 pointer-events-none transition-transform duration-300 group-hover/card:-translate-x-0.5 group-hover/card:translate-y-0.5" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-foreground/60 pointer-events-none transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:translate-y-0.5" />
      {children}

      {/* Buttons Overlay */}
      {(liveUrl || codeUrl) && (
        <div className="absolute bottom-5 right-5 flex gap-3 z-20">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border border-foreground bg-transparent text-foreground transition-all duration-200 hover:bg-white hover:text-black hover:border-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[3px_3px_0_0_#000000]"
            >
              <ExternalLink className="w-3 h-3" />
              Live
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border border-foreground bg-foreground text-background transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[3px_3px_0_0_#000000]"
            >
              <Github className="w-3 h-3" />
              Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<any>(null);

  return (
    <section ref={containerRef} id="skills" className="relative bg-[#1E1C1B] z-20 -mt-[10vh]">
      <div className="bg-background rounded-t-[5rem] text-foreground relative w-full pt-32 pb-32 px-6">
        <div className="max-w-container mx-auto">
          <div className="flex justify-center mb-10 overflow-hidden py-4 px-4 md:px-20">
            <VariableProximity
              label="Crafting digital experiences that merge art and technology, creating solutions that are as beautiful as they are functional."
              className="text-4xl md:text-5xl font-black tracking-normal text-foreground leading-tight text-center cursor-default"
              fromFontVariationSettings="'wght' 400, 'wdth' 100"
              toFontVariationSettings="'wght' 900, 'wdth' 115"
              containerRef={containerRef}
              radius={150}
              falloff="linear"
            />
          </div>
          <SectionHeader title="Skills" />
          <BentoGrid className="gap-3">
            {/* Esquerda - 2 retângulos grandes (3 col cada, 2 linhas) */}
            <ProjectCard isLarge>
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex flex-col justify-between p-6">
                {/* Top Section: Text */}
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                    AI<br />
                    Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono mt-2">
                    Building the next generation of autonomous agents & intelligent systems.
                  </p>
                </div>

                {/* Bottom Section: Simple Photo Rectangle */}
                <div className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-none" />
              </div>
            </ProjectCard>

            <ProjectCard isLarge>
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex flex-col justify-between p-6">
                {/* Top Section: Text */}
                <div className="flex flex-col gap-2 mb-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                    Fullstack<br />
                    Product
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono mt-2">
                    End-to-end excellence. From pixel-perfect design to scalable backend architecture.
                  </p>
                </div>

                {/* Bottom Section: Simple Photo Rectangle */}
                <div className="w-full h-32 bg-zinc-900/50 border border-white/5 rounded-none" />
              </div>
            </ProjectCard>

            {/* Direita - 4 retângulos pequenos (3 col cada, 1 linha) - linha 1 */}
            <ProjectCard>
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex flex-col justify-between p-5">
                {/* Top Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Operations</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                    Workflow<br />
                    Automation
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between w-full mt-auto pt-4">
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight max-w-[60%]">
                    Streamlined business processes.
                  </p>
                  <div className="w-12 h-12 bg-zinc-800 border border-white/10 shrink-0" />
                </div>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex flex-col justify-between p-5">
                {/* Top Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Connectivity</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                    Integrations<br />
                    & APIs
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between w-full mt-auto pt-4">
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight max-w-[60%]">
                    Connecting diverse tools into unified ecosystems.
                  </p>
                  <div className="w-12 h-12 bg-zinc-800 border border-white/10 shrink-0" />
                </div>
              </div>
            </ProjectCard>

            {/* Direita - 4 retângulos pequenos (3 col cada, 1 linha) - linha 2 */}
            <ProjectCard>
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex flex-col justify-between p-5">
                {/* Top Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Product</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                    UI/UX<br />
                    Design
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between w-full mt-auto pt-4">
                  <p className="text-[10px] text-muted-foreground font-mono leading-tight max-w-[60%]">
                    An engineering approach to design, capable of solving business problems in unexpected ways.
                  </p>
                  <div className="w-12 h-12 bg-zinc-800 border border-white/10 shrink-0" />
                </div>
              </div>
            </ProjectCard>

            <ProjectCard>
              <div className="bg-[#0E100F] hover:bg-zinc-950 transition-colors duration-500 w-full h-full flex flex-col justify-between p-5 border border-white/5">
                {/* Top Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Strategy</span>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#CDC9B9] leading-[0.9]">
                    Tech<br />
                    Advisory
                  </h3>
                </div>

                {/* Bottom Section */}
                <div className="flex items-end justify-between w-full mt-auto pt-4">
                  <p className="text-[10px] text-zinc-500 font-mono leading-tight max-w-[60%]">
                    Design of scalable, sovereign & AI-driven ecosystems.
                  </p>
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 shrink-0" />
                </div>
              </div>
            </ProjectCard>

            {/* Linha 3 - 2 retângulos médios (6 col cada) */}
            <ProjectCard className="col-span-6">
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex items-center justify-between p-6">
                {/* Left Section: Text */}
                <div className="flex flex-col justify-center gap-2 max-w-[50%]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Data</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                    Database<br />
                    Architecture
                  </h3>

                  <p className="text-[10px] text-muted-foreground font-mono leading-tight mt-2">
                    Designing scalable, high-performance data models for data-intensive applications.
                  </p>
                </div>

                {/* Right Section: Image Placeholder */}
                <div className="w-24 h-24 bg-zinc-800 border border-white/10 shrink-0" />
              </div>
            </ProjectCard>

            <ProjectCard className="col-span-6">
              <div className="bg-card/50 hover:bg-card transition-colors duration-500 w-full h-full flex items-center justify-between p-6">
                {/* Left Section: Text */}
                <div className="flex flex-col justify-center gap-2 max-w-[50%]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">Reliability</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground leading-[0.9]">
                    DevOps &<br />
                    Infra
                  </h3>

                  <p className="text-[10px] text-muted-foreground font-mono leading-tight mt-2">
                    Robust CI/CD pipelines and sovereign cloud architectures for maximum uptime.
                  </p>
                </div>

                {/* Right Section: Image Placeholder */}
                <div className="w-24 h-24 bg-zinc-800 border border-white/10 shrink-0" />
              </div>
            </ProjectCard>

          </BentoGrid>
        </div>
      </div>
    </section>
  );
}

