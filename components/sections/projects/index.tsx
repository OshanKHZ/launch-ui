"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
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
}

const projects: Project[] = [
  {
    title: "Bee2Bee",
    category: "AI Multi-Agent System",
    description: "Built the indexing engine with tree-sitter AST parsing, dual embedding system, and intelligent chunking. Developed custom n8n nodes and architected the RAG pipeline for semantic code search with context-aware retrieval.",
    src: "/projects-thumbnail/bee2bee-thumb.webp",
    link: "https://bee2bee-nine.vercel.app/login",
    code: "https://github.com/OshanKHZ/bee2bee-indexer",
    tech: ["Next.js 14", "Python", "tree-sitter", "RAG", "n8n"],
    role: "Frontend & AI Infrastructure"
  },
  {
    title: "Custom CRM",
    category: "SaaS",
    description: "A revolutionary AI platform that transforms how we interact with data. Built with performance and scalability in mind using the latest web technologies.",
    src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
    link: "https://google.com",
    code: "https://github.com",
    tech: ["Next.js", "OpenAI", "Supabase"],
    role: "Full Stack Developer"
  },
  {
    title: "Participa DF",
    category: "Government Ombudsman",
    description: "Digital experience platform for a leading creative agency. Features immersive animations, WebGL interactions, and a custom CMS.",
    src: "/projects-thumbnail/participa-df-thumb.webp",
    link: "https://google.com",
    code: "https://github.com",
    tech: ["React", "WebGL", "GSAP"],
    role: "Frontend Developer"
  },
  {
    title: "Supavisor",
    category: "SQL Linter",
    description: "Developed a fast SQL linter for Supabase migrations that detects RLS issues and performance bottlenecks, generating automatic fixes to improve developer experience.",
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    link: "https://www.npmjs.com/package/supavisor", // Placeholder for NPM link request
    code: "https://github.com/OshanKHZ/supavisor",
    tech: ["TypeScript", "Node.js", "Postgres"],
    role: "Creator & Maintainer"
  },
  {
    title: "Stephany Rocha",
    category: "E-Commerce",
    description: "Modern e-commerce solution with real-time inventory, seamless checkout, and a highly optimized mobile experience.",
    src: "/projects-thumbnail/stephanyrocha-thumb.webp",
    link: "https://google.com",
    code: "https://github.com",
    tech: ["Shopify", "React", "Tailwind"],
    role: "Frontend Developer"
  }
];

export default function Projects() {
  const container = useRef(null);

  return (
    <section ref={container} className="relative bg-background" id="projects">
      {/* Section Label */}
      <div className="max-w-container mx-auto px-6 pt-20">
        <SectionHeader title="Selected_Work" />
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => {
          // Calculate scale target for stacking effect
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              {...project}
              progress={null} // We handle internal progress if needed, or pass from parent.
              // Actually simplest is sticky stacking without parent scroll link for now.
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              total={projects.length}
            />
          );
        })}
      </div>
      {/* Spacer at bottom */}
      <div className="h-[10vh]" />
    </section>
  );
}

interface CardProps extends Project {
  i: number;
  progress: MotionValue<number> | null;
  range: [number, number];
  targetScale: number;
  total: number;
}

const Card = ({ i, title, category, description, src, link, code, tech, role, targetScale, total }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"]
  });

  // Removed imageScale effect - images stay static now

  //   const scale = useTransform(progress, range, [1, targetScale]); // Re-enable if using parent progress

  return (
    <div
      ref={container}
      className="h-[370px] sticky flex items-start justify-center px-2 pb-2 md:px-6 md:pb-6 pt-0"
      style={{ top: `calc(4rem + ${i * 50}px)` }}
    >
      <motion.div
        className="w-full h-full md:h-[350px] grid grid-cols-1 md:grid-cols-12 bg-background border-t-2 border-foreground overflow-hidden relative pt-4"
      >
        {/* Left Image - 6 Cols */}
        <div className="md:col-span-6 h-full relative overflow-hidden group border-r border-border">
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
          <div className="w-full flex justify-between items-center pl-6 pr-6">
            <h2 className="text-2xl md:text-4xl font-mono uppercase tracking-tighter font-bold leading-none">{title}</h2>
            <span className="font-mono text-xs tracking-widest uppercase hidden md:block text-muted-foreground">{category}</span>
          </div>

          <div className="flex-1 flex flex-col pl-6 pr-6 pb-0">
            {/* Spacer to push everything to bottom */}
            <div className="flex-1" />

            {/* 1. Buttons */}
            <div className="flex items-center gap-4 mb-6">
              <ActionButton href={link} label="Live Site" Icon={ExternalLink} variant="outline" />
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
