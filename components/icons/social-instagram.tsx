"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export interface InstagramIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface InstagramIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const RECT_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const PATH_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const LINE_VARIANTS: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      duration: 0.6,
      ease: "linear",
      opacity: { duration: 0.1 },
    },
  },
};

const InstagramIcon = forwardRef<InstagramIconHandle, InstagramIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 16, ...props }, ref) => {
    const rectControls = useAnimation();
    const pathControls = useAnimation();
    const lineControls = useAnimation();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isControlledRef = useRef(false);
    const [isHovered, setIsHovered] = useState(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => {
          rectControls.start("animate");
          pathControls.start("animate");
          lineControls.start("animate");
        },
        stopAnimation: () => {
          rectControls.start("normal");
          pathControls.start("normal");
          lineControls.start("normal");
        },
      };
    });

    useEffect(() => {
      const element = wrapperRef.current;
      if (!element) return;

      const checkParentHover = () => {
        const parent = element.closest('a, button');
        if (parent) {
          const isParentHovered = parent.matches(':hover');
          if (isParentHovered && !isHovered) {
            setIsHovered(true);
            rectControls.start("animate");
            pathControls.start("animate");
            lineControls.start("animate");
          } else if (!isParentHovered && isHovered) {
            setIsHovered(false);
            rectControls.start("normal");
            pathControls.start("normal");
            lineControls.start("normal");
          }
        }
      };

      const interval = setInterval(checkParentHover, 100);

      return () => clearInterval(interval);
    }, [rectControls, pathControls, lineControls, isHovered]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          rectControls.start("animate");
          pathControls.start("animate");
          lineControls.start("animate");
        }
      },
      [lineControls, onMouseEnter, pathControls, rectControls]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          rectControls.start("normal");
          pathControls.start("normal");
          lineControls.start("normal");
        }
      },
      [rectControls, pathControls, lineControls, onMouseLeave]
    );

    return (
      <div
        ref={wrapperRef}
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.rect
            animate={rectControls}
            height="20"
            initial="normal"
            rx="5"
            ry="5"
            variants={RECT_VARIANTS}
            width="20"
            x="2"
            y="2"
          />
          <motion.path
            animate={pathControls}
            d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
            initial="normal"
            variants={PATH_VARIANTS}
          />
          <motion.line
            animate={lineControls}
            initial="normal"
            variants={LINE_VARIANTS}
            x1="17.5"
            x2="17.51"
            y1="6.5"
            y2="6.5"
          />
        </svg>
      </div>
    );
  }
);

InstagramIcon.displayName = "InstagramIcon";

export { InstagramIcon };
