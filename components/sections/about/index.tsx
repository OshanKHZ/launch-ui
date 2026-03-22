"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { EASE_OUT_EXPO } from "@/lib/animations";

const services = [
    {
        title: "Data Engineering",
        description: "End-to-end data pipelines built for scale and reliability.",
        items: [
            "Cloud database migration (AWS, GCP, Azure)",
            "OLTP & OLAP architecture design",
            "ETL / ELT pipeline development",
            "Data modeling and warehousing",
            "Real-time streaming and batch processing",
        ],
    },
    {
        title: "Full Stack Development",
        description: "From API design to pixel-perfect frontends — shipped fast.",
        items: [
            "Web apps with React, Next.js & TypeScript",
            "REST & GraphQL API development",
            "Python backends and microservices",
            "Database design & optimization",
            "Performance tuning and code review",
        ],
    },
    {
        title: "UI & UX Design",
        description: "Engineering-driven design that solves real problems beautifully.",
        items: [
            "Interface design and prototyping",
            "Design systems and component libraries",
            "User flows and interaction design",
            "Responsive and accessible layouts",
        ],
    },
    {
        title: "Infrastructure & DevOps",
        description: "Reliable deployments and cloud architecture that scales.",
        items: [
            "Docker and containerization",
            "CI/CD pipeline setup",
            "Cloud infrastructure (GCP, AWS)",
            "Monitoring, logging and alerting",
            "Database administration",
        ],
    },
    {
        title: "Project Management",
        description: "Agile-native — from planning to delivery with clarity.",
        items: [
            "Agile / Scrum methodology",
            "Sprint planning and backlog grooming",
            "Cross-functional team coordination",
            "Tooling setup (Jira, ClickUp, Notion)",
        ],
    },
    {
        title: "AI Automation & No-Code",
        description: "From manual workflows to intelligent agents — automated end to end.",
        items: [
            "Workflow automation with n8n",
            "AI agent development with Python & n8n",
            "No-code and low-code integrations",
            "LLM-powered pipelines and tools",
            "API orchestration and event-driven flows",
        ],
    },
];

function AccordionItem({
    title, description, items, isOpen, onToggle
}: {
    title: string;
    description: string;
    items: string[];
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-t border-foreground/15">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-3 text-left group cursor-pointer"
            >
                <span className="text-sm font-dm-mono uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                    {title}
                </span>
                <span className="text-foreground/50 group-hover:text-primary transition-colors duration-200 text-base font-light select-none">
                    {isOpen ? "−" : "+"}
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                    >
                        <div className="pb-3">
                            <p className="text-xs text-muted-foreground font-mono mb-2 leading-relaxed">
                                {description}
                            </p>
                            <ul className="space-y-1">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-start gap-2 text-xs text-foreground/70 font-mono"
                                    >
                                        <span className="text-primary mt-0.5 shrink-0">—</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function About() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    return (
        <section className="relative bg-[#1E1C1B] -mt-[20vh]">
            <div className="bg-background text-foreground relative w-full pt-32 pb-32 px-6">
                <div className="max-w-container mx-auto">
                    <SectionHeader title="About" />

                    {/* Top: headline + photo */}
                    <div className="grid grid-cols-12 gap-8 items-stretch">
                        {/* Left Column - Text at top, Accordion at bottom */}
                        <div className="col-span-12 md:col-span-6 flex flex-col justify-between gap-8">
                            <div>
                                <blockquote className="text-2xl md:text-3xl lg:text-4xl tracking-tight leading-[1.1] text-foreground mb-6">
                                    <span className="font-black">Give me the problem.</span>{" "}
                                    <span className="font-light italic font-serif">I&apos;ll figure the rest.</span>
                                </blockquote>
                                {/* <ScrollTypingText
                                    text="I'm a multidisciplinary developer and designer obsessed with crafting polished, high-performance digital experiences. I bridge the gap between design and engineering, creating solutions that are as beautiful as they are functional."
                                    className="text-base md:text-lg text-muted-foreground font-mono leading-relaxed"
                                    progress={textProgress}
                                    showCursor={true}
                                /> */}
                            </div>

                            {/* What I do accordion */}
                            <div className="border-b border-foreground/15">
                                {services.map((s) => (
                                    <AccordionItem
                                        key={s.title}
                                        {...s}
                                        isOpen={openItem === s.title}
                                        onToggle={() => setOpenItem(openItem === s.title ? null : s.title)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Photo */}
                        <div className="col-span-12 md:col-span-6">
                            <div className="relative w-full aspect-[4/3] bg-zinc-900/50 border border-white/10 overflow-hidden rounded-lg sticky top-32">
                                <Image
                                    src="/lucas.png"
                                    alt="Lucas Oshan"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
