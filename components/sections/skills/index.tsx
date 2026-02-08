import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BentoGrid } from "@/components/ui/bento-grid";

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
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-foreground/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-foreground/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-foreground/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-foreground/60 pointer-events-none" />
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
  return (
    <section id="skills" className="py-20">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col gap-2 mb-8">
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">/ Skills</span>
          <div className="w-full h-[1.5px] bg-muted-foreground" />
        </div>
        <BentoGrid className="gap-3">
          {/* Esquerda - 2 retângulos grandes (3 col cada, 2 linhas) */}
          <ProjectCard isLarge liveUrl="#" codeUrl="#">
            <div className="bg-card min-h-[400px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill A1 (Large)</span>
            </div>
          </ProjectCard>
          <ProjectCard isLarge>
            <div className="bg-card min-h-[400px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill A2 (Large)</span>
            </div>
          </ProjectCard>

          {/* Direita - 4 retângulos pequenos (3 col cada, 1 linha) - linha 1 */}
          <ProjectCard>
            <div className="bg-card min-h-[194px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill A3</span>
            </div>
          </ProjectCard>
          <ProjectCard>
            <div className="bg-card min-h-[194px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill A4</span>
            </div>
          </ProjectCard>

          {/* Direita - 4 retângulos pequenos (3 col cada, 1 linha) - linha 2 */}
          <ProjectCard>
            <div className="bg-card min-h-[194px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill B3</span>
            </div>
          </ProjectCard>
          <ProjectCard>
            <div className="bg-card min-h-[194px] w-full h-full flex items-center justify-center">
              <span className="text-card-foreground">Skill B4</span>
            </div>
          </ProjectCard>

        </BentoGrid>
      </div>
    </section>
  );
}

