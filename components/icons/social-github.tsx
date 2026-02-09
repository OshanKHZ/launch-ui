"use client";

import { cn } from "@/lib/utils";

interface GithubIconProps {
  className?: string;
  size?: number;
}

export function GithubIcon({ className, size = 16 }: GithubIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className={cn("", className)}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path
        d="M9 18c-4.51 2-5-2-7-2"
        className="group-hover:animate-github-wag"
        style={{
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      />
      <style>{`
        .group:hover .group-hover\\:animate-github-wag {
          animation: githubWag 1s ease-in-out;
        }
        @keyframes githubWag {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-15deg); }
          40% { transform: rotate(15deg); }
          60% { transform: rotate(-15deg); }
          80% { transform: rotate(15deg); }
        }
      `}</style>
    </svg>
  );
}
