import { cn } from "@/lib/utils";
import { motion, useTransform, MotionValue } from 'motion/react';

interface WordProps {
    word: string;
    progress: MotionValue<number>;
    cStart: number;
    cEnd: number;
}

function Word({ word, progress, cStart, cEnd }: WordProps) {
    const opacity = useTransform(progress, [cStart, cEnd], [0, 1]);
    const y = useTransform(progress, [cStart, cEnd], [20, 0]);
    const blur = useTransform(progress, [cStart, cEnd], [10, 0]);
    const filter = useTransform(blur, (v) => `blur(${v}px)`);

    return (
        <motion.span
            style={{ opacity, y, filter }}
            className="inline-block mr-[0.2em] will-change-[transform,filter,opacity]"
        >
            {word}
        </motion.span>
    );
}

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    progress: MotionValue<number>;
    style?: React.CSSProperties;
}

export default function ScrollRevealText({ text, className, progress, style }: ScrollRevealTextProps) {
    const words = text.split(" ");
    const step = 0.8 / words.length;

    return (
        <p className={cn("flex flex-wrap", className)} style={style}>
            {words.map((word, i) => {
                const cStart = i * step;
                const cEnd = cStart + 0.2;

                return (
                    <Word
                        key={i}
                        word={word}
                        progress={progress}
                        cStart={cStart}
                        cEnd={cEnd}
                    />
                );
            })}
        </p>
    );
}
