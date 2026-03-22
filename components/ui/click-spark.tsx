"use client";

import { useRef, useEffect, useCallback, useState, ReactNode, MouseEvent } from "react";
import { useTheme } from "next-themes";

interface Spark {
    x: number;
    y: number;
    angle: number;
    startTime: number;
    color: string;
}

interface ClickSparkProps {
    sparkColor?: string;
    sparkColorLight?: string;
    sparkColorDark?: string;
    sparkSize?: number;
    sparkRadius?: number;
    sparkCount?: number;
    duration?: number;
    easing?: "linear" | "ease-in" | "ease-in-out" | "ease-out";
    extraScale?: number;
    shouldPropagate?: boolean;
    className?: string;
    children: ReactNode;
}

const ClickSpark = ({
    sparkColor,
    sparkColorLight = "#000000",
    sparkColorDark = "#aa532e",
    sparkSize = 17,
    sparkRadius = 35,
    sparkCount = 10,
    duration = 400,
    easing = "ease-out",
    extraScale = 0.8,
    shouldPropagate = false,
    className,
    children,
}: ClickSparkProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sparksRef = useRef<Spark[]>([]);
    const startTimeRef = useRef<number | null>(null);
    const animationIdRef = useRef<number>(0);
    const isDrawingRef = useRef(false);

    const { theme, resolvedTheme } = useTheme();

    // We keep track of the calculated theme color, but we also calculate per-click
    // if no explicit sparkColor is provided.
    const [themeSparkColor, setThemeSparkColor] = useState(sparkColorLight);

    useEffect(() => {
        // If explicit sparkColor is provided, we don't care about the theme for default.
        const currentTheme = theme === "system" ? resolvedTheme : theme;
        if (currentTheme === "dark") {
            setThemeSparkColor(sparkColorDark);
        } else {
            setThemeSparkColor(sparkColorLight);
        }
    }, [theme, resolvedTheme, sparkColorDark, sparkColorLight]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        let resizeTimeout: NodeJS.Timeout;

        const resizeCanvas = () => {
            const { width, height } = parent.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 100);
        };

        const ro = new ResizeObserver(handleResize);
        ro.observe(parent);

        resizeCanvas();

        return () => {
            ro.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);

    const easeFunc = useCallback(
        (t: number) => {
            switch (easing) {
                case "linear":
                    return t;
                case "ease-in":
                    return t * t;
                case "ease-in-out":
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        },
        [easing]
    );

    // Draw loop — only runs while sparks are active
    const drawRef = useRef<(timestamp: number) => void>(() => { });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        drawRef.current = (timestamp: number) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            sparksRef.current = sparksRef.current.filter((spark) => {
                const elapsed = timestamp - spark.startTime;
                if (elapsed >= duration) return false;

                const progress = elapsed / duration;
                const eased = easeFunc(progress);
                const distance = eased * sparkRadius * extraScale;
                const lineLength = sparkSize * (1 - eased);

                const x1 = spark.x + distance * Math.cos(spark.angle);
                const y1 = spark.y + distance * Math.sin(spark.angle);
                const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

                ctx.strokeStyle = spark.color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.stroke();

                return true;
            });

            if (sparksRef.current.length > 0) {
                // More sparks to draw — continue loop
                animationIdRef.current = requestAnimationFrame(drawRef.current);
            } else {
                // All sparks done — stop loop until next click
                isDrawingRef.current = false;
                startTimeRef.current = null;
            }
        };

        return () => {
            cancelAnimationFrame(animationIdRef.current);
        };
    }, [sparkSize, sparkRadius, duration, easeFunc, extraScale]);

    // Helper to determine if a color is light or dark
    const isDarkColor = (color: string) => {
        // Basic implementation for parsing rgb/rgba
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return false;
        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);
        // luminance formula
        const lum = (0.299 * r + 0.587 * g + 0.114 * b);
        return lum < 128;
    };

    const getBackgroundColor = (element: Element | null): string | null => {
        if (!element) return null;

        const style = window.getComputedStyle(element);
        const bg = style.backgroundColor;

        // Check if transparent
        if (bg === "rgba(0, 0, 0, 0)" || bg === "transparent" || style.opacity === "0" || style.visibility === "hidden") {
            return getBackgroundColor(element.parentElement);
        }

        return bg;
    };

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        if (!shouldPropagate) {
            e.stopPropagation();
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Determine color for this burst
        let burstColor = sparkColor || themeSparkColor;

        // If no explicit color override is set, try to be smart about the background
        if (!sparkColor) {
            // We get the element at point. Note: canvas has pointer-events: none, so this falls through
            const element = document.elementFromPoint(e.clientX, e.clientY);
            const bg = getBackgroundColor(element);

            if (bg) {
                const isDark = isDarkColor(bg);
                // If background is dark, use sparkColorDark (e.g. orange)
                // If background is light, use sparkColorLight (e.g. black)
                burstColor = isDark ? sparkColorDark : sparkColorLight;
            }
        }

        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now,
            color: burstColor
        }));

        sparksRef.current.push(...newSparks);

        // Start the draw loop only if not already running
        if (!isDrawingRef.current) {
            isDrawingRef.current = true;
            animationIdRef.current = requestAnimationFrame(drawRef.current);
        }
    };

    return (
        <div className={`relative w-full h-full ${className || ""}`} onClick={handleClick}>
            <canvas
                ref={canvasRef}
                className="block absolute top-0 left-0 w-full h-full pointer-events-none select-none z-[9999]"
            />
            {children}
        </div>
    );
};

export default ClickSpark;
