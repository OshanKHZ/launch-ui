'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface ScrollTypingTextProps {
    text: string;
    className?: string;
    progress?: MotionValue<number>;
    showCursor?: boolean;
    cursorCharacter?: string;
    style?: React.CSSProperties;
}

export default function ScrollTypingText({
    text,
    className,
    progress: externalProgress,
    showCursor = false,
    cursorCharacter = '|',
    style
}: ScrollTypingTextProps) {
    const targetRef = useRef<HTMLParagraphElement>(null);

    // Use external progress if provided, otherwise create local scroll progress
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const progress = externalProgress || scrollYProgress;

    // Calculate how many characters to show based on scroll progress
    const textLength = text.length;
    const charCount = useTransform(progress, [0, 1], [0, textLength]);

    // Round to nearest integer for character count
    const displayedTextMotion = useTransform(charCount, (latest) => {
        const count = Math.round(latest);
        return text.slice(0, count);
    });

    return (
        <p ref={targetRef} className={className} style={style}>
            <motion.span className="inline whitespace-pre-wrap">
                {displayedTextMotion}
            </motion.span>
            {showCursor && (
                <motion.span
                    className="ml-1 inline-block"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                >
                    {cursorCharacter}
                </motion.span>
            )}
        </p>
    );
}
