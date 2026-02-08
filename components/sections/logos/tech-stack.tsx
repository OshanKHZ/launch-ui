"use client";

import { motion, useSpring, useMotionValue, AnimatePresence, useScroll, useVelocity, useTransform, useAnimationFrame } from "motion/react";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const logos = [
    {
        name: "React",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
        className: "h-14 w-auto",
    },
    {
        name: "Next.js",
        src: "https://svgl.app/library/nextjs_icon_dark.svg",
        className: "h-14 w-auto grayscale contrast-200 mix-blend-multiply",
        isImage: true,
    },
    {
        name: "TypeScript",
        src: "https://cdn.simpleicons.org/typescript",
        className: "h-14 w-auto",
    },
    {
        name: "Python",
        src: "https://cdn.simpleicons.org/python",
        className: "h-14 w-auto",
    },
    {
        name: "PostgreSQL",
        src: "https://www.svgrepo.com/show/306591/postgresql.svg",
        className: "h-16 w-auto grayscale contrast-[100] mix-blend-multiply",
        isImage: true,
    },
    {
        name: "n8n",
        src: "https://upload.wikimedia.org/wikipedia/commons/5/53/N8n-logo-new.svg",
        className: "h-14 w-auto grayscale contrast-200 brightness-0",
        isImage: true
    },
    {
        name: "Docker",
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Docker-svgrepo-com.svg",
        className: "h-22 w-auto grayscale contrast-200 brightness-0",
        isImage: true
    },
    {
        name: "Git",
        src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Git-icon-black.svg",
        className: "h-14 w-auto grayscale contrast-200 brightness-0",
        isImage: true
    },
    {
        name: "Redis",
        src: "https://www.svgrepo.com/show/303460/redis-logo.svg",
        className: "h-16 w-auto grayscale brightness-50 contrast-200 mix-blend-multiply",
        isImage: true
    },
    {
        name: "Claude Code",
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg",
        className: "h-16 w-auto grayscale brightness-50 contrast-200 mix-blend-multiply",
        isImage: true
    },
    {
        name: "Supabase",
        src: "/logos/supabase.svg",
        className: "h-18 w-auto grayscale brightness-50 contrast-400 mix-blend-multiply",
        isImage: true
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

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Animation frame loop
    useAnimationFrame((_t, delta) => {
        // Base movement in current direction
        let moveBy = directionFactor.current * baseSpeed * (delta / 1000);

        // Add velocity boost from scroll (always adds speed in current direction)
        const velFactor = Math.abs(velocityFactor.get());
        moveBy += directionFactor.current * baseSpeed * (delta / 1000) * velFactor;

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <section className="py-10">
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
                <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-foreground py-2 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
                    <div className="flex overflow-hidden w-full">
                        <motion.div
                            ref={carouselRef}
                            className="flex min-w-full shrink-0 items-center gap-2 px-1"
                            style={{ x }}
                        >
                            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                                <div
                                    key={index}
                                    className="relative flex h-28 w-52 shrink-0 items-center justify-center rounded-md bg-background cursor-pointer group"
                                    onMouseEnter={() => setHoveredLogo(logo.name)}
                                    onMouseLeave={() => setHoveredLogo(null)}
                                >
                                    {logo.isImage ? (
                                        <img src={logo.src} alt={logo.name} className={cn("object-contain transition-transform duration-300 group-hover:scale-105 opacity-80 group-hover:opacity-100", logo.className)} />
                                    ) : (
                                        <img src={logo.src} alt={logo.name} className={cn("object-contain transition-transform duration-300 group-hover:scale-105 brightness-0 opacity-80 group-hover:opacity-100", logo.className)} />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
