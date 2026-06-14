import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    className?: string;
    rightContent?: React.ReactNode;
}

export function SectionHeader({ title, className, rightContent }: SectionHeaderProps) {
    return (
        <div className={cn("flex flex-col gap-2 mb-8", className)}>
            <div className="flex flex-row items-center gap-4">
                <span className="text-base font-medium tracking-[0.02em] text-current uppercase whitespace-nowrap">
                    / {title}
                </span>
                <div className="flex-1 border-b-2 border-dotted border-current min-w-4" />
                {rightContent && (
                    <div className="flex items-center">
                        {rightContent}
                    </div>
                )}
            </div>
            <div className="w-full h-[2px] bg-current" />
        </div>
    );
}
