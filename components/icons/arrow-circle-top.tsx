"use client";

import { cn } from "@/lib/utils";
import { motion, SVGMotionProps } from "motion/react";

export const ArrowCircleTopIcon = ({
    className,
    size = 24,
    ...props
}: {
    className?: string;
    size?: number;
} & SVGMotionProps<SVGSVGElement>) => {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("", className)}
            {...props}
        >
            {/* Outline Circle - Animates fill from transparent to orange */}
            <motion.circle
                cx="256"
                cy="256"
                r="240"
                fill="rgba(170, 83, 46, 0)"
                strokeWidth="32"
                stroke="currentColor"
                className="icon-circle"
                variants={{
                    hover: { fill: "#aa532e" }
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Arrow - Animates to white */}
            <motion.polygon
                points="142.319 241.027 164.947 263.654 240 188.602 240 376 272 376 272 188.602 347.053 263.654 369.681 241.027 256 127.347 142.319 241.027"
                fill="currentColor"
                variants={{
                    hover: { fill: "#FFFFFF" }
                }}
                transition={{ duration: 0.3 }}
                className="icon-arrow relative z-10"
            />
        </motion.svg>
    );
};
