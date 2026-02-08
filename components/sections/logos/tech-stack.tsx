"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
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
    speed?: number;
}

export default function TechStackCarousel({ speed = 130 }: FilmCarouselProps) {
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];
    const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the tooltip movement
    const springX = useSpring(mouseX, { stiffness: 300, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 20 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="w-screen relative left-1/2 -translate-x-1/2 py-4">
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
                                x: 16, // Offset from cursor
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

            {/* Container "Preto" (bg-foreground) ajustado com padding menor */}
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-foreground py-2">
                <div className="flex overflow-hidden w-full">
                    <motion.div
                        className="flex min-w-full shrink-0 items-center gap-2 px-1"
                        animate={{
                            x: ["0%", "-100%"],
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: speed,
                        }}
                    >
                        {duplicatedLogos.map((logo, index) => (
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

                    {/* Loop Duplicate */}
                    <motion.div
                        className="flex min-w-full shrink-0 items-center gap-2 px-1"
                        animate={{
                            x: ["0%", "-100%"],
                        }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: speed,
                        }}
                    >
                        {duplicatedLogos.map((logo, index) => (
                            <div
                                key={`dup-${index}`}
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
    );
}
