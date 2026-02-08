"use client";

import * as React from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface FilmCarouselProps {
    children: React.ReactNode;
    className?: string;
    speed?: number; // Duration in seconds for a full loop
    direction?: "left" | "right";
    pauseOnHover?: boolean;
}

export function FilmCarousel({
    children,
    className,
    speed = 40,
    direction = "left",
    pauseOnHover = true,
}: FilmCarouselProps) {
    return (
        <div
            className={cn(
                "group relative flex overflow-hidden w-full select-none bg-background py-8",
                className
            )}
        >
            <motion.div
                className={cn(
                    "flex min-w-full shrink-0 gap-0",
                    direction === "right" && "flex-row-reverse"
                )}
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {children}
                {children}
            </motion.div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
        </div>
    );
}

export function FilmFrame({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative flex h-[140px] w-[220px] shrink-0 items-center justify-center border-y-[6px] border-r-[4px] border-foreground/80 bg-muted px-4 py-6 first:border-l-[4px]",
                className
            )}
        >
            {/* Holes Top */}
            <div className="absolute top-[-4px] left-0 flex w-full justify-between px-2 opacity-50">
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
            </div>

            {children}

            {/* Holes Bottom */}
            <div className="absolute bottom-[-4px] left-0 flex w-full justify-between px-2 opacity-50">
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
                <div className="h-[2px] w-[2px] rounded-full bg-background" />
            </div>
        </div>
    );
}
