"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { useEffect, useState } from "react";

import { Button } from "./button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-9"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="fill-current"
      >
        {/* Top-left quadrant (dark in light mode, light in dark mode) */}
        <path
          d="M 0 0 L 10 0 L 10 10 L 0 10 Z"
          className={theme === "dark" ? "fill-foreground" : "fill-muted-foreground"}
        />
        {/* Bottom-right quadrant (light in light mode, dark in dark mode) */}
        <path
          d="M 10 10 L 20 10 L 20 20 L 10 20 Z"
          className={theme === "dark" ? "fill-muted-foreground" : "fill-foreground"}
        />
        {/* Top-right quadrant (light) */}
        <path
          d="M 10 0 L 20 0 L 20 10 L 10 10 Z"
          className="fill-background"
        />
        {/* Bottom-left quadrant (dark) */}
        <path
          d="M 0 10 L 10 10 L 10 20 L 0 20 Z"
          className="fill-background"
        />
        {/* Inner circle */}
        <circle
          cx="10"
          cy="10"
          r="4"
          className={theme === "dark" ? "fill-foreground" : "fill-muted-foreground"}
        />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
