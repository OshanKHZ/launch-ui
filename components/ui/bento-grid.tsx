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

