"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { ActionButton } from "@/components/ui/action-button";
import { SectionHeader } from "@/components/ui/section-header";

interface Project {
  title: string;
  category: string;
  description: string;
  src: string;
  link: string;
  code: string;
  tech: string[];
  role: string;
  tab: string;
}

const projects: Project[] = [
  {
    title: "Bee2Bee",
    category: "AI Multi-Agent System",
    description: "Built the indexing engine with tree-sitter AST parsing, dual embedding system, and intelligent chunking. Developed custom n8n nodes and architected the RAG pipeline for semantic code search with context-aware retrieval.",
    src: "/projects-thumbnail/bee2bee-thumb.webp",
    link: "https://bee2bee-nine.vercel.app/login",
    code: "https://github.com/OshanKHZ/bee2bee-indexer",
    tech: ["Python", "pgvector", "n8n"],
    role: "Frontend & AI Infrastructure",
    tab: "AI"
  },
  {
    title: "Delta-Z",
    category: "SaaS",
    description: "A revolutionary AI platform that transforms how we interact with data. Built with performance and scalability in mind using the latest web technologies.",
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    link: "",
    code: "https://github.com",
    tech: ["Next.js", "PostgreSQL", "Supabase", "Redis", "TypeScript", "Prisma"],
    role: "Full Stack Developer",
    tab: "Web"
  },
  {
    title: "Participa DF",
    category: "Civic Tech PWA",
    description: "A Progressive Web App (PWA) for the Federal District Ombudsman to facilitate citizen feedback. Features offline-first architecture, universal accessibility (WCAG 2.1 AA), and multi-channel reporting (text, audio, video) with secure identity protection.",
    src: "/projects-thumbnail/participa-df-thumb.webp",
    link: "https://participa.df.gov.br",
    code: "https://github.com/OshanKHZ/participa-df-pwa",
    tech: ["Next.js 16", "TypeScript", "Tailwind", "Drizzle ORM", "PWA"],
    role: "Frontend Developer",
    tab: "Web"
  },
  {
    title: "Stephany Rocha",
    category: "Landing Page",
    description: "Landing page for a psychologist, designed to convey trust, warmth, and professionalism. Focused on clear service presentation, emotional connection with the visitor, and optimized conversion for scheduling consultations.",
    src: "/projects-thumbnail/stephanyrocha-thumb.webp",
    link: "https://google.com",
    code: "https://github.com",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    role: "UI/UX & Full Stack Developer",
    tab: "Web"
  },
  {
    title: "Claude Code AI Kit",
    category: "Agentic AI",
    description: "A collection of AI agents, skills and commands designed to assist developers with various coding tasks. Includes agents for code generation, code review, and code optimization.",
    src: "/projects-thumbnail/cc-swiss-knife.png",
    link: "",
    code: "https://github.com/OshanKHZ/cc-swiss-knife",
    tech: ["Claude", "TypeScript", "Tailwind", "Vercel"],
    role: "Creator & Maintainer",
    tab: "AI"
  },
  {
    title: "BitBadges",
    category: "Experimental",
    description: "8-bit style badge generator API for README files. Create pixel art badges with custom colors, logos and text.",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    link: "",
    code: "https://github.com/OshanKHZ/bitbadges",
    tech: ["TypeScript", "Express", "Vercel"],
    role: "Creator & Maintainer",
    tab: "Lab"
  }
];

const TABS = ["Web", "AI", "Data", "Lab"];

export default function Projects() {
  const container = useRef(null);
  const [activeTab, setActiveTab] = useState("Web");

  const filteredProjects = projects.filter(p => p.tab === activeTab);

  const rightContent = (
    <div className="flex items-center gap-1">
      {TABS.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`text-xs md:text-sm font-medium tracking-[0.02em] uppercase transition-colors whitespace-nowrap px-2.5 py-1 rounded-md ${activeTab === tab ? "bg-black text-white" : "text-muted-foreground hover:text-foreground hover:bg-black/5"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  return (
    <section ref={container} className="relative bg-[#1E1C1B]" id="projects">
      <div className="bg-background rounded-t-[5rem]">
        {/* Section Label */}
        <div className="max-w-container mx-auto px-6 pt-20">
          <SectionHeader title="FEATURED WORK" rightContent={rightContent} />
        </div>

        <div className="flex flex-col">
          {filteredProjects.map((project, i) => {
            // Calculate scale target for stacking effect
            const targetScale = 1 - ((filteredProjects.length - i) * 0.05);
            return (
              <Card
                key={project.title}
                i={i}
                {...project}
                targetScale={targetScale}
                total={filteredProjects.length}
              />
            );
          })}
        </div>
        {/* Spacer at bottom */}
        <div className="h-[10vh]" />
      </div>
    </section>
  );
}

interface CardProps extends Project {
  i: number;
  targetScale: number;
  total: number;
}

const Card = ({ i, title, category, description, src, link, code, tech, role, targetScale, total }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  return (
    <div
      ref={container}
      className="h-[520px] md:h-[370px] sticky flex items-start justify-center px-2 pb-2 md:px-6 md:pb-6 pt-0"
      style={{ top: `calc(4rem + ${i * 50}px)` }}
    >
      <motion.div
        className="w-full h-full md:h-[350px] grid grid-cols-1 md:grid-cols-12 bg-background border-t-2 border-foreground overflow-hidden relative pt-4"
      >
        {/* Left Image - 6 Cols */}
        <div className="md:col-span-6 h-[180px] md:h-full relative overflow-hidden group border-r border-border">
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
          <div className="w-full h-full relative">
            <Image
              src={src}
              alt={title}
              fill
              quality={95}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        </div>

        {/* Right Content - 6 Cols */}
        <div className="md:col-span-6 h-full flex flex-col justify-between bg-background relative z-10">
          {/* Header inside Right Col */}
          <div className="w-full flex justify-between items-center gap-3 pl-6 pr-6">
            <h2 className="text-lg md:text-4xl font-mono uppercase tracking-tighter font-bold leading-none shrink-0">{title}</h2>
            <div className="flex items-center gap-2">
              {/* Buttons on mobile - right of title */}
              <div className="flex items-center gap-1.5 md:hidden">
                <ActionButton
                  href={link}
                  label="Live"
                  Icon={ExternalLink}
                  variant={link === "" || link === "#" ? "disabled" : "outline"}
                  size="sm"
                />
                <ActionButton href={code} label="Code" Icon={Github} variant="solid" size="sm" />
              </div>
              <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">{category}</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col pl-6 pr-6 pb-0">
            {/* Spacer to push everything to bottom */}
            <div className="flex-1" />

            {/* 1. Buttons - desktop only */}
            <div className="hidden md:flex items-center gap-4 mb-6">
              <ActionButton
                href={link}
                label="Live Site"
                Icon={ExternalLink}
                variant={link === "" || link === "#" ? "disabled" : "outline"}
              />
              <ActionButton href={code} label="Source Code" Icon={Github} variant="solid" />
            </div>

            {/* 2. Description */}
            <p className="text-base md:text-lg text-muted-foreground line-clamp-3 text-landing-body mb-4">
              {description}
            </p>

            {/* 3. Bottom Stack Section */}
            <div className="w-full border-t-2 border-border pt-2 pb-2 mt-0 flex items-center justify-between gap-4">
              <span className="text-sm font-mono uppercase font-bold tracking-wider shrink-0 leading-none">Stack:</span>
              <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground leading-none text-right truncate">
                {tech.join(", ")}
              </span>
            </div>

            {/* 4. Role Section */}
            <div className="w-full border-t-2 border-border pt-2 pb-2 mt-0 flex items-center justify-between gap-4">
              <span className="text-sm font-mono uppercase font-bold tracking-wider shrink-0 leading-none">Role:</span>
              <span className="text-sm font-mono uppercase tracking-wider text-muted-foreground leading-none text-right truncate">
                {role}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
