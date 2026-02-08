"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    target = "_blank"
}: ActionButtonProps) {
    return (
        <Link
            href={href}
            target={target}
            className={cn(
                "group/btn flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase font-bold tracking-wider border border-foreground transition-all duration-300",

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
        >
            {Icon && <Icon size={12} />}
            <span>{label}</span>
            {IconRight && <IconRight size={12} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />}
        </Link>
    );
}
