
import { cn } from "@/lib/utils";

export const ArrowCircleTopIcon = ({
    className,
    size = 24,
    ...props
}: {
    className?: string;
    size?: number;
} & React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("", className)}
            {...props}
        >
            <circle
                cx="256"
                cy="256"
                r="240"
                fill="none"
                strokeWidth="32"
                className="icon-circle stroke-current text-foreground"
            />
            <polygon
                points="142.319 241.027 164.947 263.654 240 188.602 240 376 272 376 272 188.602 347.053 263.654 369.681 241.027 256 127.347 142.319 241.027"
                className="icon-arrow fill-current text-foreground"
            />
        </svg>
    );
};
