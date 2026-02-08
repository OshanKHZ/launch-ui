import { ReactNode } from "react";

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
      variant: "cta",
    },
  ],
  className,
}: CTAProps) {
  return (
    <Section className={cn("group relative overflow-hidden", className)}>
      <div className="max-w-container relative z-10 mx-auto flex flex-col items-center gap-6 text-center sm:gap-8">
        <h2 className="max-w-[640px] text-3xl leading-tight font-semibold sm:text-5xl sm:leading-tight">
          {title}
        </h2>
        {description && (
          <p className="max-w-[500px] text-base sm:text-lg text-muted-foreground">
            {description}
          </p>
        )}
        {buttons !== false && buttons.length > 0 && (
          <div className="flex justify-center gap-4">
            {buttons.map((button, index) => (
              <ActionButton
                key={index}
                href={button.href}
                label={button.label}
                variant={button.variant || "solid"}
                target="_self"
              />
            ))}
          </div>
        )}
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
