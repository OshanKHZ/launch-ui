import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

function useAnimationFrame(callback: (time: number) => void, isEnabled = true) {
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number | undefined>(undefined);
    const callbackRef = useRef(callback);

    // Keep callback ref updated
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const animate = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined && isEnabled) {
            const deltaTime = time - previousTimeRef.current;
            callbackRef.current(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [isEnabled]);

    useEffect(() => {
        if (!isEnabled) return;
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isEnabled, animate]);
}

function useMousePositionRef(containerRef: React.RefObject<HTMLElement>) {
    const positionRef = useRef({ x: 0, y: 0 });
    const containerRectRef = useRef<DOMRect | null>(null);

    useEffect(() => {
        const updatePosition = (x: number, y: number) => {
            // Cache container rect and update only on resize
            if (!containerRectRef.current && containerRef?.current) {
                containerRectRef.current = containerRef.current.getBoundingClientRect();
            }

            if (containerRectRef.current) {
                positionRef.current = { x: x - containerRectRef.current.left, y: y - containerRectRef.current.top };
            } else {
                positionRef.current = { x, y };
            }
        };

        const handleMouseMove = (ev: MouseEvent) => updatePosition(ev.clientX, ev.clientY);
        const handleTouchMove = (ev: TouchEvent) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        const handleResize = () => {
            containerRectRef.current = null; // Reset cache on resize
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [containerRef]);

    return positionRef;
}

interface VariableProximityProps {
    label: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    containerRef: React.RefObject<HTMLElement>;
}

const VariableProximity = forwardRef<HTMLSpanElement, VariableProximityProps>((props, ref) => {
    const {
        label,
        fromFontVariationSettings,
        toFontVariationSettings,
        containerRef,
        radius = 50,
        falloff = 'linear',
        className = '',
        onClick,
        style,
        ...restProps
    } = props;

    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedSettingsRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const letterPositionsRef = useRef<Array<{ x: number; y: number } | null>>([]);
    const containerRectRef = useRef<DOMRect | null>(null);
    const lastUpdateRef = useRef(0);

    const parsedSettings = useMemo(() => {
        const parseSettings = (settingsStr: string) =>
            new Map(
                settingsStr
                    .split(',')
                    .map(s => s.trim())
                    .map(s => {
                        const [name, value] = s.split(' ');
                        return [name.replace(/['"]/g, ''), parseFloat(value)];
                    })
            );

        const fromSettings = parseSettings(fromFontVariationSettings);
        const toSettings = parseSettings(toFontVariationSettings);

        return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
            axis,
            fromValue,
            toValue: toSettings.get(axis) ?? fromValue
        }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    const calculateFalloff = (distance: number) => {
        const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
        switch (falloff) {
            case 'exponential':
                return norm ** 2;
            case 'gaussian':
                return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
            case 'linear':
            default:
                return norm;
        }
    };

    // Cache letter positions - only recalculates when needed
    const updateLetterPositions = useCallback(() => {
        if (!containerRef?.current) return false;

        const newContainerRect = containerRef.current.getBoundingClientRect();
        const needsUpdate = !containerRectRef.current ||
            Math.abs(newContainerRect.left - containerRectRef.current.left) > 1 ||
            Math.abs(newContainerRect.top - containerRectRef.current.top) > 1;

        if (!needsUpdate && letterPositionsRef.current.every(pos => pos !== null)) {
            return false;
        }

        containerRectRef.current = newContainerRect;

        letterRefs.current.forEach((letterRef) => {
            if (!letterRef) return;
            const rect = letterRef.getBoundingClientRect();
            const letterCenterX = rect.left + rect.width / 2 - newContainerRect.left;
            const letterCenterY = rect.top + rect.height / 2 - newContainerRect.top;
            letterPositionsRef.current[letterRefs.current.indexOf(letterRef)] = { x: letterCenterX, y: letterCenterY };
        });

        return true;
    }, [containerRef]);

    // Throttle updates to max 60fps
    useAnimationFrame((_deltaTime) => {
        const now = performance.now();
        if (now - lastUpdateRef.current < 16) return; // Throttle to ~60fps
        lastUpdateRef.current = now;

        if (!containerRef?.current) return;

        // Update positions with cache
        updateLetterPositions();

        letterRefs.current.forEach((letterRef, index) => {
            if (!letterRef || !letterPositionsRef.current[index]) return;

            const letterCenter = letterPositionsRef.current[index]!;

            const distance = calculateDistance(
                mousePositionRef.current.x,
                mousePositionRef.current.y,
                letterCenter.x,
                letterCenter.y
            );

            if (distance >= radius) {
                letterRef.style.fontVariationSettings = fromFontVariationSettings;
                return;
            }

            const falloffValue = calculateFalloff(distance);
            const newSettings = parsedSettings
                .map(({ axis, fromValue, toValue }) => {
                    const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
                    return `'${axis}' ${interpolatedValue}`;
                })
                .join(', ');

            interpolatedSettingsRef.current[index] = newSettings;
            letterRef.style.fontVariationSettings = newSettings;
        });
    });

    const words = label.split(' ');
    let letterIndex = 0;

    return (
        <span
            ref={ref}
            onClick={onClick}
            style={{
                display: 'inline',
                fontFamily: 'var(--font-roboto-flex), sans-serif',
                ...style
            }}
            className={className}
            {...restProps}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap">
                    {word.split('').map((letter, index) => {
                        const currentLetterIndex = letterIndex++;
                        return (
                            <motion.span
                                key={index}
                                ref={el => {
                                    letterRefs.current[currentLetterIndex] = el;
                                }}
                                style={{
                                    display: 'inline-block',
                                    fontVariationSettings: interpolatedSettingsRef.current[currentLetterIndex]
                                }}
                                aria-hidden="true"
                            >
                                {letter}
                            </motion.span>
                        );
                    })}
                    {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
            ))}
            <span className="sr-only">{label}</span>
        </span>
    );
});

VariableProximity.displayName = 'VariableProximity';
export default VariableProximity;
