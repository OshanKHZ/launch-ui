"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface ActionButtonProps {
    href: string;
    label: string;
    Icon?: LucideIcon;
    IconRight?: LucideIcon;
    variant?: "outline" | "solid" | "cta";
    className?: string;
    target?: string;
}

export function ActionButton({
    href,
    label,
    Icon,
    IconRight,
    variant = "outline",
    className,
    target = "_blank",
    shimmerEffect = false
}: ActionButtonProps & { shimmerEffect?: boolean }) {
    const overlayRef = useRef<HTMLDivElement>(null);

    const animateIn = () => {
        const el = overlayRef.current;
        if (!el) return;

        el.style.transition = 'none';
        el.style.backgroundPosition = '-100% -100%';
        requestAnimationFrame(() => {
            el.style.transition = '650ms ease';
            el.style.backgroundPosition = '100% 100%';
        });
    };

    const animateOut = () => {
        const el = overlayRef.current;
        if (!el) return;

        el.style.transition = '650ms ease';
        el.style.backgroundPosition = '-100% -100%';
    };

    return (
        <Link
            href={href}
            target={target}
            className={cn(
                "group/btn relative overflow-hidden flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border border-foreground transition-all duration-300",

                // Base Hover Effects (Move + Hard Shadow in Black)
                "hover:-translate-y-1 hover:-translate-x-1",
                "hover:shadow-[3px_3px_0_0_#000000]",

                // Variant: Outline (Live) - Becomes White on hover
                variant === "outline" && "bg-transparent text-foreground hover:bg-white hover:text-black hover:border-white",

                // Variant: Solid (Code) - Becomes Primary (Orange) on hover
                variant === "solid" && "bg-foreground text-background hover:bg-primary hover:text-primary-foreground hover:border-primary",

                // Variant: CTA - Starts Primary (Orange), becomes White on hover
                variant === "cta" && "bg-primary text-primary-foreground hover:bg-white hover:text-black hover:border-white",

                className
            )}
            onMouseEnter={shimmerEffect ? animateIn : undefined}
            onMouseLeave={shimmerEffect ? animateOut : undefined}
        >
            {shimmerEffect && (
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'linear-gradient(-45deg, hsla(0,0%,100%,0) 40%, hsla(0,0%,100%,0.5) 50%, hsla(0,0%,100%,0) 60%)',
                        backgroundSize: '250% 250%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: '-100% -100%',
                    }}
                />
            )}

            {Icon && <Icon size={12} className="relative z-10" />}
            <span className="relative z-10">{label}</span>
            {IconRight && <IconRight size={12} className="relative z-10 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />}
        </Link>
    );
}
