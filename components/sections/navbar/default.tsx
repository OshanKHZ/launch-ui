"use client";

import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion } from "motion/react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { GripIcon } from "../../icons";
import { ModeToggle } from "../../ui/mode-toggle";
import { Button, buttonVariants } from "../../ui/button";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";

const easing = [0.87, 0, 0.13, 1];
const duration = 0.35;

interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  isActive: boolean;
}

function DecryptedText({ text, speed = 50, className = "", isActive }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      setRevealedIndices(new Set());
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";
    intervalRef.current = setInterval(() => {
      setRevealedIndices(prev => {
        if (prev.size < text.length) {
          const nextIndex = prev.size;
          const newSet = new Set(prev);
          newSet.add(nextIndex);

          setDisplayText(
            text
              .split("")
              .map((char, i) => {
                if (char === " ") return " ";
                if (newSet.has(i)) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("")
          );

          if (newSet.size === text.length && intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return newSet;
        }
        return prev;
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, text, speed]);

  return (
    <span className={className}>
      {displayText.split("").map((char, i) => (
        <span key={i}>{char === " " ? "\u00A0" : char}</span>
      ))}
    </span>
  );
}

function AnimatedLink({
  href,
  children,
  index
}: {
  href: string;
  children: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex items-center gap-1.5 bg-badge px-3 py-2 h-9 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="relative z-10 text-muted-foreground transition-colors"
        style={{
          color: isHovered ? "rgba(255, 255, 255, 0.6)" : undefined,
          opacity: isHovered ? 0.6 : 0.7
        }}
      >
        [{index}]
      </span>
      <motion.span
        className="relative z-10"
        animate={{ color: isHovered ? "rgb(255 255 255)" : "hsl(var(--badge-foreground))" }}
        transition={{ duration, ease: easing }}
      >
        {" "}
        <DecryptedText
          text={children}
          speed={duration * 100}
          isActive={isHovered}
        />
      </motion.span>
      <motion.div
        className="absolute inset-y-0 left-0 bg-badge-hover"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration, ease: easing }}
      />
    </a>
  );
}

function RouletteLink({ href, text, className }: { href: string; text: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const spins = 5;

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative", overflow: "hidden", display: "inline-block", height: "1em" }}
    >
      <motion.div
        style={{ display: "flex", flexDirection: "column" }}
        initial={{ y: 0 }}
        animate={{ y: isHovered ? `-${spins}em` : "0em" }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {Array.from({ length: spins + 1 }).map((_, i) => (
          <span key={i} style={{ height: "1em", display: "flex", alignItems: "center" }}>
            {text}
          </span>
        ))}
      </motion.div>
    </a>
  );
}

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  className?: string;
}

export default function Navbar({
  name = "Launch UI",
  homeUrl = siteConfig.url,
  mobileLinks = [
    { text: "Getting Started", href: siteConfig.url },
    { text: "Components", href: siteConfig.url },
    { text: "Documentation", href: siteConfig.url },
  ],
  actions = [
    { text: "Projects", href: "#projects", isButton: false },
    { text: "/", href: "#", isButton: false },
    { text: "About", href: "#about", isButton: false },
    // {
    //   text: "Get Started",
    //   href: siteConfig.url,
    //   isButton: true,
    //   variant: "default",
    // },
  ],
  showNavigation = true,
  className,
}: NavbarProps) {
  return (
    <header className={cn("sticky top-0 z-50 border-b-[2px] border-foreground/30 bg-background", className)}>
      <div className="max-w-container mx-auto px-6 py-0.5">
        <NavbarComponent>
          <NavbarLeft>
            {/* <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </a> */}
            {showNavigation && (
              <div className="flex items-center gap-1 font-mono text-base tracking-tight leading-none font-semibold">
                <a
                  href={homeUrl}
                  className="flex items-center justify-center gap-1.5 bg-badge px-3 py-2 h-9 hover:bg-badge-hover transition-colors group"
                >
                  <GripIcon size={18} className="text-foreground group-hover:text-white transition-colors" />
                </a>
                <AnimatedLink href="#getting-started" index={0}>
                  GETTING STARTED
                </AnimatedLink>
                <AnimatedLink href="#components" index={1}>
                  COMPONENTS
                </AnimatedLink>
                <AnimatedLink href="#documentation" index={2}>
                  DOCUMENTATION
                </AnimatedLink>
              </div>
            )}
          </NavbarLeft>
          <NavbarRight>
            {actions.map((action, index) =>
              action.isButton ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  asChild
                >
                  <a href={action.href}>
                    {action.icon}
                    {action.text}
                    {action.iconRight}
                  </a>
                </Button>
              ) : action.text === "/" ? (
                <a
                  key={index}
                  href={action.href}
                  className="hidden md:block tracking-tight uppercase text-xl rotate-[20deg] font-mono font-normal"
                >
                  {action.text}
                </a>
              ) : (
                <RouletteLink
                  key={index}
                  href={action.href}
                  text={action.text}
                  className="hidden md:block tracking-tight uppercase text-lg"
                />
              ),
            )}
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </NavbarComponent>
      </div>
    </header>
  );
}
