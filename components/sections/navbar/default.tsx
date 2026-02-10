"use client";

import { type VariantProps } from "class-variance-authority";
import { Menu } from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import { GripIcon, ArrowCircleTopIcon } from "../../icons";
import { Button, buttonVariants } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Navbar as NavbarComponent,
  NavbarLeft,
  NavbarRight,
} from "../../ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { NavigationMenu } from "./navigation-menu";

const easing: any = [0.87, 0, 0.13, 1];
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
  index: number | string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className="flex items-center gap-1.5 bg-badge/50 backdrop-blur-md border border-badge/50 px-3 py-1.5 h-8 relative overflow-hidden rounded-[2px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="relative z-10 text-muted-foreground transition-colors"
        style={{
          color: isHovered ? "rgba(255, 255, 255, 0.6)" : undefined,
          opacity: typeof index === "string" ? 1 : (isHovered ? 0.6 : 0.7)
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

function ThemeSelector() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const displayTheme = theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-1.5 bg-badge/50 backdrop-blur-md border border-badge/50 px-3 py-1.5 h-8 relative overflow-hidden rounded-[2px] cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Current theme: ${displayTheme}. Click to change theme.`}
        >
          <span
            className="relative z-10"
            style={{
              color: isHovered ? "rgb(255 255 255)" : "hsl(var(--badge-foreground))"
            }}
          >
            THEME:
          </span>
          <span
            className="relative z-10 transition-colors"
            style={{
              color: isHovered ? "rgb(255 255 255)" : "hsl(var(--badge-foreground))",
              opacity: isHovered ? 0.6 : 0.7
            }}
          >
            {" "}
            <DecryptedText
              text={displayTheme.toUpperCase()}
              speed={35}
              isActive={isHovered}
            />
          </span>
          <motion.div
            className="absolute inset-y-0 left-0 bg-badge-hover"
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.35, ease: [0.87, 0, 0.13, 1] }}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RouletteLink({ href, text, className }: { href: string; text: string; className?: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const spins = 1;

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: "relative", overflow: "hidden", height: "1em" }}
    >
      <div className="flex items-center justify-center gap-[1px] h-full">
        <motion.span
          initial={{ y: "-150%" }}
          animate={{ y: isHovered ? "0%" : "-150%" }}
          transition={{
            duration: 0.6,
            ease: [0.87, 0, 0.13, 1],
          }}
          className="text-primary font-mono font-bold h-[1em] flex items-center"
        >
          [
        </motion.span>
        <div className="h-[1em] overflow-hidden relative">
          <motion.div
            style={{ display: "flex", flexDirection: "column" }}
            initial={{ y: 0 }}
            animate={{ y: isHovered ? `-${spins}em` : "0em" }}
            transition={{
              duration: 0.6,
              ease: [0.87, 0, 0.13, 1],
            }}
          >
            {Array.from({ length: spins + 1 }).map((_, i) => (
              <span
                key={i}
                className={i === 1 ? "text-primary font-bold" : ""}
                style={{
                  height: "1em",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {text}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.span
          initial={{ y: "-150%" }}
          animate={{ y: isHovered ? "0%" : "-150%" }}
          transition={{
            duration: 0.6,
            ease: [0.87, 0, 0.13, 1],
          }}
          className="text-primary font-mono font-bold h-[1em] flex items-center"
        >
          ]
        </motion.span>
      </div>
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
    { text: "Components", href: siteConfig.url },
    { text: "Documentation", href: siteConfig.url },
  ],
  actions = [
    { text: "Projects", href: "#projects", isButton: false },
    { text: "/", href: "#", isButton: false },
    { text: "About Me", href: "#about", isButton: false },
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
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header
        className={cn("fixed top-0 w-full z-50 -mb-4 pb-2 transition-all duration-300", className)}
        initial={{ opacity: 1, y: 0 }}
        animate={{
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -20 : 0,
          pointerEvents: isScrolled ? "none" : "auto"
        }}
      >
        <div className="relative mx-auto max-w-container px-2 md:px-6">
          <NavbarComponent className="py-2">
            <NavbarLeft>
              {showNavigation && (
                <div className="flex items-center gap-1 font-mono text-base tracking-tight leading-none font-semibold">

                  <AnimatedLink href="#components" index={"📍"}>
                    RJ, BRAZIL
                  </AnimatedLink>
                  <ThemeSelector />
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
              <motion.button
                className="shrink-0 hidden md:flex group size-10 items-center justify-center rounded-md hover:bg-transparent cursor-pointer"
                variants={{ hover: { scale: 1.05 } }}
                whileHover="hover"
                animate={isMenuOpen ? "hover" : "initial"}
                data-state={isMenuOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
                onClick={() => setIsMenuOpen(true)}
              >
                <ArrowCircleTopIcon
                  className="rotate-[-135deg] transition-transform duration-300 group-hover:rotate-[-180deg] group-data-[state=open]:rotate-[-180deg] text-[#aa532e]"
                  size={24}
                />
              </motion.button>
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
      </motion.header>

      {/* Floating Menu Button */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 z-50"
          >
            <Button
              variant="secondary"
              size="icon"
              className="group rounded-md shadow-lg bg-[#aa532e] hover:bg-[#aa532e]/90 backdrop-blur-md border border-white/10 w-12 h-12 cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" aria-hidden="true">
                <path d="M5 8H13.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 ease-[cubic-bezier(0.87,0,0.13,1)] group-hover:translate-x-[2px]" />
                <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.25 16L19 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-400 ease-[cubic-bezier(0.87,0,0.13,1)] delay-100 group-hover:-translate-x-[2px]" />
              </svg>
              <span className="sr-only">Open menu</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
