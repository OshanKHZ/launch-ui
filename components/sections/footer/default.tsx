"use client";

import { cn } from "@/lib/utils";
import { ArrowUpIcon } from "@/components/icons/arrow-up";
import { GithubIcon } from "@/components/icons/social-github";
import { InstagramIcon } from "@/components/icons/social-instagram";
import { LinkedinIcon } from "@/components/icons/social-linkedin";

function SocialLink({
  href,
  children,
  icon: Icon
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }>;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-2 text-base font-dm-mono tracking-tight text-foreground hover:text-primary transition-colors duration-200"
    >
      <Icon className="w-4 h-4" />
      {children}
    </a>
  );
}

interface FooterProps {
  className?: string;
  email?: string;
  socialLinks?: {
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}

export default function FooterSection({
  email = "lucas.oshan@gmail.com",
  socialLinks,
  className,
}: FooterProps) {
  const links = socialLinks || {
    instagram: "https://instagram.com/oshan.ia",
    linkedin: "https://www.linkedin.com/in/lucas-lima-oshan/",
    github: "https://github.com/oshankhz",
  };

  return (
    <footer className={cn("bg-background w-full px-4 md:px-6 py-6", className)}>
      <div className="max-w-container mx-auto">

        {/* Mobile layout */}
        <div className="flex flex-col gap-5 md:hidden">
          {/* Divisor */}
          <div className="border-t-2 border-foreground/30" />

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="text-foreground font-dm-mono text-sm hover:text-primary transition-colors uppercase break-all"
          >
            {email}
          </a>

          {/* Social Links */}
          <div className="flex flex-col gap-2.5">
            <SocialLink href={links.instagram!} icon={InstagramIcon}>INSTAGRAM</SocialLink>
            <SocialLink href={links.linkedin!} icon={LinkedinIcon}>LINKEDIN</SocialLink>
            <SocialLink href={links.github!} icon={GithubIcon}>GITHUB</SocialLink>
          </div>

          {/* Bottom row: Back to top | Developed By */}
          <div className="border-t border-foreground/10 pt-4 flex items-center justify-between gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 text-xs font-dm-mono tracking-tight text-foreground hover:text-primary transition-colors duration-200 cursor-pointer uppercase"
            >
              <ArrowUpIcon className="w-3.5 h-3.5" />
              Back to top
            </button>
            <p className="text-foreground/60 font-dm-mono text-xs uppercase tracking-tight text-right">
              By <span className="text-foreground">Lucas Oshan</span>
            </p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12 gap-6">
          {/* Divisor from col 2 to col 11 */}
          <div className="col-span-10 col-start-2">
            <div className="border-t-2 border-foreground/30" />
          </div>

          {/* First Column */}
          <div className="col-span-3 col-start-2 flex flex-col gap-3">
            <a
              href={`mailto:${email}`}
              className="text-foreground font-dm-mono text-base hover:text-primary transition-colors uppercase"
            >
              {email}
            </a>
            <SocialLink href={links.instagram!} icon={InstagramIcon}>INSTAGRAM</SocialLink>
            <SocialLink href={links.linkedin!} icon={LinkedinIcon}>LINKEDIN</SocialLink>
            <SocialLink href={links.github!} icon={GithubIcon}>GITHUB</SocialLink>
          </div>

          {/* Second Column */}
          <div className="col-span-3 col-start-6 flex flex-col gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-base font-dm-mono tracking-tight text-foreground hover:text-primary transition-colors duration-200 cursor-pointer uppercase"
            >
              <ArrowUpIcon className="w-4 h-4" />
              Back to top
            </button>
          </div>

          {/* Third Column */}
          <div className="col-span-3 col-start-9 flex flex-col gap-3">
            <p className="text-foreground/70 font-dm-mono text-sm uppercase tracking-tight">
              Developed and Designed By <span className="underline underline-offset-4 decoration-foreground/30 text-foreground">ME</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
