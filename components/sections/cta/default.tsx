"use client";

import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { ActionButton } from "../../ui/action-button";
import Glow from "../../ui/glow";
import { Section } from "../../ui/section";

interface CTAButtonProps {
  href: string;
  label: string;
  variant?: "outline" | "solid" | "cta";
  icon?: ReactNode;
  iconRight?: ReactNode;
  glareEffect?: boolean;
}

interface CTAProps {
  title?: string;
  description?: string;
  buttons?: CTAButtonProps[] | false;
  className?: string;
}

export default function CTA({
  title = "Turning complex problems into simple solutions.",
  description = "Focused on building software that matters. Open to agency work, freelance projects, and full-time remote roles. Let's create something people will actually use.",
  buttons = [
    {
      href: "mailto:lucas.oshan@gmail.com",
      label: "Let's work together",
      variant: "solid",
      glareEffect: true,
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto">

        {/* Mobile layout */}
        <div className="flex flex-col gap-6 md:hidden">
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
            GET IN TOUCH
          </span>
          <h2 className="text-2xl leading-snug font-semibold">
            {title}
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
          {buttons !== false && buttons.length > 0 && (
            <ActionButton
              href={buttons[0].href}
              label={buttons[0].label}
              variant={buttons[0].variant || "solid"}
              target="_self"
              className="w-full justify-center"
              shimmerEffect={buttons[0].glareEffect}
              IconRight={ArrowUpRight}
            />
          )}
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid grid-cols-12 gap-4">
          {/* Título + Descrição - colunas 2-6 */}
          <div className="col-span-5 col-start-2 row-start-1 flex flex-col gap-3">
            <h2 className="text-2xl leading-snug font-semibold sm:text-4xl sm:leading-snug">
              {title}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* GET IN TOUCH - topo, alinhado à esquerda */}
          <div className="col-span-1 col-start-11 row-start-1 self-start text-left">
            <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-wider">
              GET IN TOUCH
            </span>
          </div>

          {/* Botão - fundo, expande pra esquerda a partir da coluna 11 */}
          <div className="col-span-2 col-start-10 row-start-1 self-end text-right">
            {buttons !== false && buttons.length > 0 && (
              <ActionButton
                href={buttons[0].href}
                label={buttons[0].label}
                variant={buttons[0].variant || "solid"}
                target="_self"
                className="inline-flex"
                shimmerEffect={buttons[0].glareEffect}
                IconRight={ArrowUpRight}
              />
            )}
          </div>
        </div>

      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
