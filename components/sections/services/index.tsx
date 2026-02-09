"use client";

import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { useEffect, useRef } from "react";
// import VariableProximity from "@/components/ui/variable-proximity";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import ScrollRevealText from "@/components/ui/scroll-reveal-text";

const cards = [
    {
        id: "01",
        title: "UX/UI DESIGN",
        description: "Digital product experiences that engage, convert, and keep users coming back. Every interface is crafted to bridge user needs with business goals—clear, functional, and beautiful.",
    },
    {
        id: "02",
        title: "AI UX",
        description: "AI-driven experiences that help users work smarter, faster, and with confidence. Whether AI is the product or just powering part of it, what matters most is how it feels to use.",
    },
    {
        id: "03",
        title: "DIGITAL PRODUCT STRATEGY",
        description: "From first principles to launch, we help teams navigate ambiguity, align faster, and build with purpose. High clarity, low friction, and maximum impact.",
    },
    {
        id: "04",
        title: "FULL STACK DEV",
        description: "Robust, scalable, and secure applications built with modern technologies. We handle everything from the database to the frontend, ensuring a seamless experience.",
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

    const x = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
    const textProgress = useTransform(smoothProgress, [0, 0.5], [0, 1]);

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
        <section ref={targetRef} id="services" className="relative h-[200vh] bg-[#1E1C1B] text-white">
            <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
                {/* Intro Section */}
                <div className="pt-12 pb-0 max-w-container mx-auto px-6 w-full shrink-0">
                    <div className="grid grid-cols-12 gap-y-6 md:gap-y-0 relative items-center">
                        <SectionHeader title="Services" className="text-primary col-span-12 mb-12" />

                        {/* Main Text */}
                        <div ref={containerRef} className="col-span-12 md:col-span-7 relative z-10">
                            <ScrollRevealText
                                text="We engineer high-performance systems and AI-driven solutions designed to scale, deliver real metrics, and never just for show."
                                className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1]"
                                style={{ fontFamily: 'var(--font-roboto-flex), sans-serif' }}
                                progress={textProgress}
                            />
                        </div>

                        {/* Lottie Animation */}
                        <div className="col-span-12 md:col-start-8 md:col-span-5 flex justify-end relative z-10">
                            {/* @ts-ignore */}
                            <dotlottie-wc
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
        </section>
    );
}
