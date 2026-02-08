import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  className?: string;
}

export function Grid({ children, className }: GridProps) {
  return (
    <div className={cn("grid grid-cols-12 gap-4", className)}>
      {children}
    </div>
  );
}

interface GridColProps {
  children: ReactNode;
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
}

export function GridCol({ children, span = 12, className }: GridColProps) {
  return (
    <div className={cn(`col-span-${span}`, className)}>
      {children}
    </div>
  );
}
