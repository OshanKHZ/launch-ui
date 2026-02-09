import { cn } from "@/lib/utils";
import { motion, useTransform, MotionValue } from 'motion/react';

interface ScrollRevealTextProps {
    text: string;
    className?: string;
    progress: MotionValue<number>;
    style?: React.CSSProperties;
}

export default function ScrollRevealText({ text, className, progress, style }: ScrollRevealTextProps) {
    const words = text.split(" ");

    return (
        <p className={cn("flex flex-wrap", className)} style={style}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);

                // Overlap a bit to make it smoother?
                // Let's define a window.
                // We want the whole text to be revealed by progress=1.
                // And start at progress=0.

                // Let's use a staggered approach where each word takes a chunk of the progress, but with overlap.
                // Start time for word i = (i / words.length) * 0.8
                // Duration = 0.2

                const step = 0.8 / words.length;
                const cStart = i * step;
                const cEnd = cStart + 0.2;

                const opacity = useTransform(progress, [cStart, cEnd], [0, 1]);
                const y = useTransform(progress, [cStart, cEnd], [20, 0]);
                const filter = useTransform(progress, [cStart, cEnd], [10, 0]);

                return (
                    <motion.span
                        key={i}
                        style={{
                            opacity,
                            y,
                            filter: useTransform(filter, v => `blur(${v}px)`)
                        }}
                        className="inline-block mr-[0.2em] will-change-[transform,filter,opacity]"
                    >
                        {word}
                    </motion.span>
                );
            })}
        </p>
    );
}
