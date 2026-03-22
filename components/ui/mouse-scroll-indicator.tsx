"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { EASE_OUT_EXPO } from "@/lib/animations";

/**
 * Mouse scroll indicator with a looping dot animation at 30fps.
 *
 * Timeline (30 fps → 1 frame ≈ 33.33 ms, total loop = 90 frames = 3 000 ms):
 *
 *  Frames  0‑5   (  0‑167ms)  : Dot fades in  (opacity 0 → 1)
 *  Frames  5‑15  (167‑500ms)  : Dot rises ≈3px then drops to lower rest position
 *  Frames 15‑60  (500‑2000ms) : Dot overshoots 4px below, subtle bounce, settles
 *  Frames 60‑70  (2000‑2333ms): Dot fades out
 *  Frames 70‑90  (2333‑3000ms): Idle / pause before loop restarts
 */
export default function MouseScrollIndicator() {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();
    const containerOpacity = useTransform(scrollY, [0, 200], [1, 0]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <motion.div
            className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
            style={{ opacity: containerOpacity }}
        >
            {/* Mouse body + animated dot */}
            <div className="relative w-10 h-16">
                <svg
                    viewBox="5 2 14 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    {/* Mouse outline */}
                    <path
                        d="M12.5 22C10.754 21.9973 9.08035 21.3019 7.84664 20.0663C6.61294 18.8307 5.92001 17.156 5.92001 15.41V8.90999C5.92001 8.04589 6.09021 7.19025 6.42089 6.39193C6.75156 5.59361 7.23624 4.86823 7.84725 4.25722C8.45826 3.64621 9.18363 3.16154 9.98196 2.83086C10.7803 2.50018 11.6359 2.32999 12.5 2.32999C13.3641 2.32999 14.2197 2.50018 15.0181 2.83086C15.8164 3.16154 16.5418 3.64621 17.1528 4.25722C17.7638 4.86823 18.2485 5.59361 18.5791 6.39193C18.9098 7.19025 19.08 8.04589 19.08 8.90999V15.41C19.08 17.156 18.3871 18.8307 17.1534 20.0663C15.9197 21.3019 14.2461 21.9973 12.5 22ZM12.5 3.82999C11.1535 3.83263 9.86294 4.36869 8.91083 5.3208C7.95872 6.27292 7.42266 7.5635 7.42001 8.90999V15.41C7.42001 16.0771 7.55141 16.7377 7.80671 17.354C8.062 17.9704 8.43619 18.5304 8.90791 19.0021C9.37963 19.4738 9.93965 19.848 10.556 20.1033C11.1723 20.3586 11.8329 20.49 12.5 20.49C13.1671 20.49 13.8277 20.3586 14.444 20.1033C15.0604 19.848 15.6204 19.4738 16.0921 19.0021C16.5638 18.5304 16.938 17.9704 17.1933 17.354C17.4486 16.7377 17.58 16.0771 17.58 15.41V8.90999C17.5774 7.5635 17.0413 6.27292 16.0892 5.3208C15.1371 4.36869 13.8465 3.83263 12.5 3.82999Z"
                        fill="currentColor"
                        className="text-foreground/40"
                    />
                    {/* Scroll dot — perfectly centered at x=12.5 */}
                    <rect
                        x="11.75"
                        y="7.5"
                        width="1.5"
                        height="3.5"
                        rx="0.75"
                        fill="currentColor"
                        className="text-foreground/80 mouse-dot"
                    />
                </svg>
            </div>
        </motion.div>
    );
}
