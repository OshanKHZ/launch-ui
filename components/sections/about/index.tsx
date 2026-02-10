"use client";

import { SectionHeader } from "@/components/ui/section-header";

export default function About() {
    return (
        <section className="relative bg-[#1E1C1B] -mt-[20vh]">
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
                            <p className="text-base md:text-lg text-muted-foreground font-mono leading-relaxed">
                                I'm a multidisciplinary developer and designer obsessed with crafting polished,
                                high-performance digital experiences. I bridge the gap between design and engineering,
                                creating solutions that are as beautiful as they are functional.
                            </p>
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
