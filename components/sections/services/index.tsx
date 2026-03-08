"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import ClickSpark from "@/components/ui/click-spark";
import ScrollRevealText from "@/components/ui/scroll-reveal-text";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const cards = [
    {
        id: "01",
        title: "DATA ENGINEERING & CLOUD",
        description: "A reliable, auditable data infrastructure. Your raw data becomes structured pipelines — migrated, transformed, and governed across cloud providers. You get clean data, at scale, you can actually trust.",
    },
    {
        id: "02",
        title: "AI & AUTOMATION",
        description: "Hours back in your team's day. Repetitive workflows become intelligent automations — from no-code n8n flows to custom AI agents. You get systems that work while you sleep.",
    },
    {
        id: "03",
        title: "SOFTWARE DEVELOPMENT",
        description: "A production-ready product, not a prototype. Whether a full web app, internal tool, or API integration — you get something deployed, documented, and built to last beyond the handoff.",
    },
    {
        id: "04",
        title: "UI/UX DESIGN",
        description: "Interfaces your users actually understand. From wireframes to high-fidelity design systems — you get a product that looks premium, feels intuitive, and converts. Design that earns trust on first glance.",
    },
    {
        id: "05",
        title: "CONSULTING & STRATEGY",
        description: "A clear path forward. Whether you're stuck on architecture, scaling a team, or modernizing a legacy system — you get a technical partner who maps the problem, defines the plan, and stays accountable.",
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
                            <SectionHeader title="Services" className="text-primary col-span-12 mb-12" />

                            {/* Main Text */}
                            <div ref={containerRef} className="col-span-12 md:col-span-7 relative z-10">
                                <ScrollRevealText
                                    text="Whatever the stack, whatever the scale — you get something that works, that's built to last, and that actually moves the needle."
                                    className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1]"
                                    style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
                                    progress={textProgress}
                                />
                            </div>

                            {/* Lottie Animation */}
                            <div className="col-span-12 md:col-start-8 md:col-span-5 flex justify-end relative z-10">
                                <DotLottieReact
                                    src="https://lottie.host/ed042078-bbd7-49fa-b8c1-5b7e8c0d4fc0/N3HOcqgg87.lottie"
                                    style={{ width: "200px", height: "200px" }}
                                    autoplay
                                    loop
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
