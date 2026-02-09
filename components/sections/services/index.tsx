"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { useEffect, useRef } from "react";
import VariableProximity from "@/components/ui/variable-proximity";

export default function Services() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.11/dist/dotlottie-wc.js";
        script.type = "module";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section id="services" className="pt-16 pb-32 bg-[#1E1C1B] text-white">
            <div className="max-w-container mx-auto px-6">
                <div className="grid grid-cols-12 gap-y-12 md:gap-y-0 relative items-center">

                    <SectionHeader title="Services" className="text-[#ff4d00] col-span-12 mb-12" />

                    {/* Main Text */}
                    <div ref={containerRef} className="col-span-12 md:col-span-7 relative z-10">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1]" style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}>
                            <VariableProximity
                                label="We engineer high-performance systems and AI-driven solutions designed to scale, deliver real metrics, and never just for show."
                                className="cursor-pointer"
                                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                                toFontVariationSettings="'wght' 900, 'opsz' 40"
                                radius={100}
                                falloff="linear"
                                containerRef={containerRef as any}
                            />
                        </h2>
                    </div>

                    {/* Lottie Animation */}
                    <div className="col-span-12 md:col-start-8 md:col-span-5 flex justify-end relative z-10">
                        {/* @ts-ignore */}
                        <dotlottie-wc
                            src="https://lottie.host/ed042078-bbd7-49fa-b8c1-5b7e8c0d4fc0/N3HOcqgg87.lottie"
                            style={{ width: '300px', height: '300px' }}
                            autoplay
                            loop
                        />
                    </div>

                    {/* Divider Line */}
                    <div className="col-span-12 mt-12">
                        <div className="w-full h-px bg-white/20" />
                    </div>

                </div>
            </div>
        </section>
    );
}
