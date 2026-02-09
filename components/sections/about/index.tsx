"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeader } from "@/components/ui/section-header";

export default function About() {
    return (
        <section className="relative bg-[#1E1C1B] z-30 -mt-[10vh]">
            <div
                className="bg-background rounded-t-[5rem] text-foreground relative w-full pt-32 pb-32 px-6"
            >
                <div className="max-w-container mx-auto">
                    <SectionHeader title="About" />

                    <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 mt-8">
                        <div className="col-span-12 md:col-span-9">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-normal tracking-tight leading-[1]">
                                I'm a multidisciplinary developer and designer obsessed with crafting polished, high-performance digital experiences. I bridge the gap between design and engineering.
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
