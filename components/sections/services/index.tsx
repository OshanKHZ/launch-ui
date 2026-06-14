"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import ClickSpark from "@/components/ui/click-spark";
import ScrollRevealText from "@/components/ui/scroll-reveal-text";

const cards = [
    {
        id: "01",
        title: "CLEAR DOCUMENTATION",
        description: "I keep a clear trail of decisions, evidence, issues, PRs, and implementation context, so the work is easy to review, maintain, and continue.",
    },
    {
        id: "02",
        title: "CLEAN SYSTEMS",
        description: "I write pragmatic, organized code with clear architecture, sensible taxonomy, and simple patterns that stay understandable as the product grows.",
    },
    {
        id: "03",
        title: "PROCESS OPTIMIZATION",
        description: "I map workflows, spot hidden inefficiencies, and turn manual or fragile processes into faster, cleaner systems with practical quick wins.",
    },
    {
        id: "04",
        title: "AUTONOMOUS OWNERSHIP",
        description: "I can talk to business, product, and engineering, create my own issues, investigate usage, and move from ambiguity to execution without waiting for perfect instructions.",
    },
    {
        id: "05",
        title: "QUALITY MINDSET",
        description: "I care about reliable delivery: validations, tests, data quality, governance, edge cases, and the small details that prevent problems later.",
    },
];

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 20,
        mass: 0.5
    });

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-60%"]);
    const textProgress = useTransform(smoothProgress, [0, 0.5], [0, 1]);

    return (
        <section ref={targetRef} id="services" className="relative h-[200vh] bg-[#1E1C1B] text-white">

            <ClickSpark className="flex flex-col h-full">
                <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                    {/* Intro Section */}
                    <div className="pt-12 pb-0 max-w-container mx-auto px-6 w-full shrink-0">
                        <div className="grid grid-cols-12 gap-y-6 md:gap-y-0 relative items-center">
                            <SectionHeader title="How I Work" className="text-primary col-span-12 mb-12" />

                            {/* Main Text */}
                            <div ref={containerRef} className="col-span-12 md:col-span-7 relative z-10">
                                <ScrollRevealText
                                    text="I turn ambiguity into documented, maintainable, and reliable systems."
                                    className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1]"
                                    style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
                                    progress={textProgress}
                                />
                            </div>


                            {/* Divider Line */}
                            <div className="col-span-12 mt-6">
                                <div className="w-full h-px bg-white/20" />
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Scroll Section */}
                    <div className="flex w-full items-start pt-8">
                        <motion.div style={{ x }} className="flex gap-4 px-24">
                            {cards.map((card) => (
                                <div
                                    key={card.id}
                                    className="group relative h-[420px] w-[350px] flex-shrink-0 flex flex-col justify-between rounded-[2rem] border border-white/10 bg-transparent p-8 transition-colors hover:bg-white/5"
                                >
                                    <div className="flex flex-col gap-6">
                                        <span className="text-sm font-mono text-white/40">({card.id})</span>
                                        <h3 className="text-4xl font-bold uppercase leading-[1.1] text-primary">
                                            {card.title}
                                        </h3>
                                    </div>
                                    <p className="text-base leading-relaxed text-white/60 text-left">
                                        {card.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </ClickSpark>
        </section>
    );
}
