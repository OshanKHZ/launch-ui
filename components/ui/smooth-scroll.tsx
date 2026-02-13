"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // More natural ease-out
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        let rafId: number;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        rafId = requestAnimationFrame(raf);

        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest("a");
            if (!anchor) return;

            const href = anchor.getAttribute("href");
            if (!href?.startsWith("#") || href === "#") return;

            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                lenis.scrollTo(href, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                });
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
            document.removeEventListener("click", handleAnchorClick);
            lenisRef.current = null;
        };
    }, []);


    return <>{children}</>;
}
