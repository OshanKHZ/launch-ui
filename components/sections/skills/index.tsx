"use client";

import { type ReactNode, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { BentoGrid } from "@/components/ui/bento-grid";
import { SectionHeader } from "@/components/ui/section-header";
import VariableProximity from "@/components/ui/variable-proximity";
import ScrollRevealText from "@/components/ui/scroll-reveal-text";

const easing: [number, number, number, number] = [0.87, 0, 0.13, 1];
const duration = 0.5;

const skillsDetails: Record<string, { title: string; description?: string; items?: Array<{ title: string; description: string }> }> = {
  "AI Engineering": {
    title: "AI Engineering",
    items: [
      { title: "AI AGENTS", description: "Autonomous systems that plan, execute and deliver tasks without human intervention." },
      { title: "RAG", description: "Integration of internal/external databases for smarter and more contextual responses." },
      { title: "PROMPT ENGINEERING", description: "The art of guiding AI models with precision and creativity." },
      { title: "AI TOOL STACKING", description: "Combining multiple AI tools to build scalable workflows." },
    ],
  },
  "Fullstack Product": {
    title: "Fullstack Product",
    items: [
      { title: "END-TO-END DEVELOPMENT", description: "From frontend to backend, integrating all application layers." },
      { title: "SYSTEM ARCHITECTURE", description: "Designing scalable systems ready to grow." },
      { title: "SCALABILITY", description: "Optimizing performance and preparing infrastructure to support millions of users." },
      { title: "CI/CD PIPELINES", description: "Complete automation of deploy, tests and monitoring." },
    ],
  },
  "Workflow Automation": {
    title: "Workflow Automation",
    description: "Intelligent automation orchestrating complex processes to eliminate manual errors and save hundreds of hours.",
  },
  "Integrations & APIs": {
    title: "Integrations & APIs",
    description: "Enterprise-grade API ecosystems connecting systems with robust security and real-time processing.",
  },
  "UI/UX Design": {
    title: "UI/UX Design",
    description: "Comprehensive design systems and data-driven interfaces that scale with perfect visual consistency.",
  },
  "Tech Advisory": {
    title: "Tech Advisory",
    description: "Strategic guidance for technology transformations, optimizing infrastructure and modernizing legacy systems.",
  },
  "Database Architecture": {
    title: "Database Architecture",
    items: [
      { title: "DATA MODELING", description: "Structuring data efficiently and scalable." },
      { title: "PERFORMANCE OPTIMIZATION", description: "Optimizing queries, indexes and caching." },
      { title: "REPLICATION & SHARDING", description: "Configuring data replication and partitioning." },
      { title: "DATA GOVERNANCE", description: "Access policies, backup and data compliance." },
    ],
  },
  "DevOps & Infra": {
    title: "DevOps & Infra",
    items: [
      { title: "DOCKER", description: "Containerizing applications for portability and scalability." },
      { title: "CLOUD ARCHITECTURE", description: "AWS, GCP, Azure – cloud infrastructure." },
      { title: "CI/CD", description: "Automated integration and deploy pipelines." },
      { title: "MONITORING", description: "Prometheus, Grafana – complete system observability." },
    ],
  },
};

import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  liveUrl?: string;
  codeUrl?: string;
  disableHover?: boolean;
  overlayColor?: string;
  skillName?: string;
}

function ProjectCard({ children, className, isLarge = false, liveUrl, codeUrl, disableHover = false, overlayColor = "bg-foreground", skillName }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("relative p-1 group/card h-full", isLarge ? "col-span-3 row-span-2" : "col-span-3", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cantoneiras nas 4 pontas - FORA, z-50 para sempre ficar visíveis */}
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-foreground/60 group-hover/card:border-primary pointer-events-none transition-all duration-500 ease-out group-hover/card:-translate-x-0.5 group-hover/card:-translate-y-0.5 z-50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-foreground/60 group-hover/card:border-primary pointer-events-none transition-all duration-500 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 z-50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-foreground/60 group-hover/card:border-primary pointer-events-none transition-all duration-500 ease-out group-hover/card:-translate-x-0.5 group-hover/card:translate-y-0.5 z-50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-foreground/60 group-hover/card:border-primary pointer-events-none transition-all duration-500 ease-out group-hover/card:translate-x-0.5 group-hover/card:translate-y-0.5 z-50" />

      {/* Container interno com overflow-hidden */}
      <div className="relative overflow-hidden h-full">
        {/* Elastic Wave Overlay - múltiplas fatias com delays escalonados */}
        {!disableHover && (
          <div className="absolute inset-0 z-20 flex">
            {[0, 1, 2, 3, 4, 5, 6].map((index) => {
              // Calcula o delay baseado na distância do centro (índice 3)
              const distanceFromCenter = Math.abs(index - 3);
              const delay = distanceFromCenter * 0.05; // 50ms por "step" de distância do centro

              return (
                <motion.div
                  key={index}
                  className={`flex-1 ${overlayColor}`}
                  initial={{ y: "-100%" }}
                  animate={{ y: isHovered ? "0%" : "-100%" }}
                  transition={{
                    duration,
                    ease: easing,
                    delay: isHovered ? delay : 0 // delay apenas no hover in, não no out
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Conteúdo detalhado - aparece completo após o wave */}
        {skillName && skillsDetails[skillName] && (
          <motion.div
            className="absolute inset-0 z-30 p-6 flex flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            {/* Single Description or Items */}
            {skillsDetails[skillName].description ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="text-base font-bold font-mono text-background leading-relaxed"
              >
                {skillsDetails[skillName].description}
              </motion.p>
            ) : (
              <div className="space-y-3">
                {skillsDetails[skillName].items?.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                    transition={{ delay: 0.35 + i * 0.05, duration: 0.3 }}
                    className="flex flex-col gap-1"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">{item.title}</span>
                    <span className="text-xs font-mono text-background/80 leading-tight">{item.description}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full">{children}</div>
      </div>

      {/* Buttons Overlay */}
      {(liveUrl || codeUrl) && (
        <div className="absolute bottom-5 right-5 flex gap-3 z-50">
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
              className="text-4xl md:text-5xl font-normal tracking-tight leading-[1] text-foreground text-center cursor-default"
              style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
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
            <ProjectCard isLarge skillName="AI Engineering">
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

            <ProjectCard isLarge skillName="Fullstack Product">
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
            <ProjectCard skillName="Workflow Automation">
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

            <ProjectCard skillName="Integrations & APIs">
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
            <ProjectCard skillName="UI/UX Design">
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

            <ProjectCard overlayColor="bg-primary" skillName="Tech Advisory">
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
            <ProjectCard className="col-span-6" skillName="Database Architecture">
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

            <ProjectCard className="col-span-6" skillName="DevOps & Infra">
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

