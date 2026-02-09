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
    <footer className={cn("bg-background w-full px-2 md:px-6 py-12", className)}>
      <div className="max-w-container mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Divisor from col 2 to col 11 */}
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <div className="border-t-2 border-foreground/30" />
          </div>

          {/* First Column - aligned with col 2 start */}
          <div className="col-span-12 md:col-span-3 md:col-start-2 flex flex-col gap-3">
            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="text-foreground font-dm-mono text-base hover:text-primary transition-colors uppercase"
            >
              {email}
            </a>

            {/* Social Links */}
            <SocialLink href={links.instagram!} icon={InstagramIcon}>INSTAGRAM</SocialLink>
            <SocialLink href={links.linkedin!} icon={LinkedinIcon}>LINKEDIN</SocialLink>
            <SocialLink href={links.github!} icon={GithubIcon}>GITHUB</SocialLink>
          </div>

          {/* Second Column */}
          <div className="col-span-12 md:col-span-3 md:col-start-6 flex flex-col gap-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 text-base font-dm-mono tracking-tight text-foreground hover:text-primary transition-colors duration-200 cursor-pointer uppercase"
            >
              <ArrowUpIcon className="w-4 h-4" />
              Back to top
            </button>
          </div>

          {/* Third Column */}
          <div className="col-span-12 md:col-span-3 md:col-start-9 flex flex-col gap-3">
            {/* Empty for now */}
          </div>
        </div>
      </div>
    </footer>
  );
}
