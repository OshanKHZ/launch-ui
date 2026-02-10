"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import ScrollTypingText from "@/components/ui/scroll-typing-text";

export default function About() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to typing progress (adjusted range for better UX)
    const textProgress = useTransform(scrollYProgress, [0.10, 0.50], [0, 1]);

    return (
        <section ref={targetRef} className="relative bg-[#1E1C1B] -mt-[20vh]">
            <div
                className="bg-background text-foreground relative w-full pt-32 pb-32 px-6"
            >
                <div className="max-w-container mx-auto">
                    <SectionHeader title="About" />

                    <div className="grid grid-cols-12 gap-8">
                        {/* Left Column - Text Content */}
                        <div className="col-span-12 md:col-span-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground mb-6">
                                Building the future,
                                <br />
                                one line at a time.
                            </h2>
                            <ScrollTypingText
                                text="I'm a multidisciplinary developer and designer obsessed with crafting polished, high-performance digital experiences. I bridge the gap between design and engineering, creating solutions that are as beautiful as they are functional."
                                className="text-base md:text-lg text-muted-foreground font-mono leading-relaxed"
                                progress={textProgress}
                                showCursor={true}
                            />
                        </div>

                        {/* Right Column - Photo Placeholder */}
                        <div className="col-span-12 md:col-span-6">
                            <div className="w-full aspect-[4/3] bg-zinc-900/50 border border-white/10 flex items-center justify-center">
                                <span className="text-muted-foreground/50 font-mono text-sm">
                                    [Your Photo Here]
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
