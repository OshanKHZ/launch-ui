import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-4 auto-rows-fr", className)}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}

export function BentoItem({ children, colSpan = 12, rowSpan = 1, className }: BentoItemProps) {
  return (
    <div className={cn(`col-span-${colSpan}`, className)}>
      {children}
    </div>
  );
}

// Wrapper para retângulo grande (2 linhas de altura)
export function BentoLarge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("col-span-3 row-span-2", className)}>
      {children}
    </div>
  );
}

// Wrapper para retângulo pequeno (1 linha de altura)
export function BentoSmall({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("col-span-3", className)}>
      {children}
    </div>
  );
}
