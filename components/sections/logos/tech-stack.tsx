"use client";

import { motion, useSpring, useMotionValue, AnimatePresence, useScroll, useVelocity, useTransform, useAnimationFrame } from "motion/react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Type for section ref
type SectionRef = HTMLElement | null;

const logos = [
    {
        name: "React",
        src: "/logos/react.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Next.js",
        src: "/logos/nextjs.svg",
        className: "h-14 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "TypeScript",
        src: "/logos/typescript.svg",
        className: "h-14 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Python",
        src: "/logos/python.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "PostgreSQL",
        src: "/logos/postgresql.svg",
        className: "h-16 w-auto",
        width: 64,
        height: 64,
    },
    {
        name: "n8n",
        src: "/logos/n8n.svg",
        className: "h-18 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Docker",
        src: "/logos/docker.svg",
        className: "h-20 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Git",
        src: "/logos/git.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Redis",
        src: "/logos/redis.svg",
        className: "h-14 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Claude Code",
        src: "/logos/claude.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Supabase",
        src: "/logos/supabase.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Google Cloud",
        src: "/logos/google-cloud.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
    {
        name: "Databricks",
        src: "/logos/azure-databricks.svg",
        className: "h-16 w-auto",
        width: 56,
        height: 56,
    },
];

interface FilmCarouselProps {
    baseSpeed?: number;
}

function useElementWidth(ref: React.RefObject<HTMLDivElement | null>) {
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        function updateWidth() {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        }
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, [ref]);

    return width;
}

function wrap(min: number, max: number, v: number) {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
}

export default function TechStackCarousel({ baseSpeed = 80 }: FilmCarouselProps) {
    const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isInView, setIsInView] = useState(true);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the tooltip movement
    const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

    // Scroll velocity tracking
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

    // Direction state (1 for left, -1 for right)
    const directionFactor = useRef(-1);

    // Intersection Observer ref to pause animation when off-screen
    const sectionRef = useRef<SectionRef>(null);

    // Update direction based on scroll velocity
    useEffect(() => {
        const unsubscribe = smoothVelocity.on("change", (v) => {
            if (v < -50) {
                // Scrolling up - go left
                directionFactor.current = -1;
            } else if (v > 50) {
                // Scrolling down - go right
                directionFactor.current = 1;
            }
        });
        return () => unsubscribe();
    }, [smoothVelocity]);

    // Velocity factor - maps scroll velocity to speed multiplier (always positive for speed boost)
    const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [5, 0, 5], { clamp: false });

    const baseX = useMotionValue(0);

    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselWidth = useElementWidth(carouselRef);

    // X position transform
    const x = useTransform(baseX, (v) => {
        // Use half of carousel width since we have duplicated content
        const width = carouselWidth / 2;
        if (width === 0) return "0px";
        return `${wrap(-width, 0, v)}px`;
    });

    // Intersection Observer to pause animation when off-screen
    useEffect(() => {
        if (!sectionRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Animation frame loop - only runs when in view
    useAnimationFrame((_t, delta) => {
        if (!isInView) return;

        // Base movement in current direction
        let moveBy = directionFactor.current * baseSpeed * (delta / 1000);

        // Add velocity boost from scroll (always adds speed in current direction)
        const velFactor = Math.abs(velocityFactor.get());
        moveBy += directionFactor.current * baseSpeed * (delta / 1000) * velFactor;

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section ref={sectionRef} className="py-1">
            <div className="max-w-container mx-auto px-6">
                {/* Tooltip Portal */}
                {mounted && createPortal(
                    <AnimatePresence>
                        {hoveredLogo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                style={{
                                    left: springX,
                                    top: springY,
                                    position: 'fixed',
                                    zIndex: 9999,
                                    pointerEvents: 'none',
                                    x: 16,
                                    y: 16,
                                }}
                                className="bg-[#0E100F] border border-zinc-800 text-white text-xs px-3 py-1.5 rounded-md font-mono shadow-xl uppercase tracking-wider"
                            >
                                {hoveredLogo}
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}

                {/* Container "Preto" (bg-foreground) adjustado com padding menor e mask mais sutil */}
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-foreground dark:bg-primary py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                    <div className="flex overflow-hidden w-full">
                        <motion.div
                            ref={carouselRef}
                            className="flex min-w-full shrink-0 items-center gap-2 px-1"
                            style={{ x }}
                        >
                            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                                <div
                                    key={`${logo.name}-${index}`}
                                    className="relative flex h-16 w-32 sm:h-20 sm:w-40 md:h-28 md:w-52 shrink-0 items-center justify-center rounded-md bg-background cursor-pointer group text-foreground"
                                    onMouseEnter={() => setHoveredLogo(logo.name)}
                                    onMouseLeave={() => setHoveredLogo(null)}
                                >
                                    {/* Subtle glow effect behind logo */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-foreground/5 blur-2xl rounded-full" />
                                    </div>
                                    <Image
                                        src={logo.src}
                                        alt={logo.name}
                                        width={logo.width}
                                        height={logo.height}
                                        className={cn("object-contain transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100 relative z-10 max-h-11 sm:max-h-14 md:max-h-none", logo.className)}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
