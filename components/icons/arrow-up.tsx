"use client";

import { cn } from "@/lib/utils";

interface ArrowUpIconProps {
  className?: string;
  size?: number;
}

export function ArrowUpIcon({ className, size = 16 }: ArrowUpIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("group-hover:-translate-y-0.5 transition-transform duration-300", className)}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
