import {
  ArrowRightIcon,
  CircleAlert,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "success"
  | "warning";

interface AlertProps {
  variant?: AlertVariant;
  message: string;
  link?: {
    href: string;
    text: string;
  };
}

const variantStyles = {
  primary: {
    container: "border-blue-500/50 bg-blue-100 text-blue-600",
    icon: InfoIcon,
  },
  secondary: {
    container: "border-gray-500/50 bg-gray-100 text-gray-600",
    icon: InfoIcon,
  },
  destructive: {
    container: "border-red-500/50 bg-red-100 text-red-600",
    icon: CircleAlert,
  },
  success: {
    container: "border-emerald-500/50 bg-emerald-100 text-emerald-600",
    icon: CircleCheckIcon,
  },
  warning: {
    container: "border-amber-500/50 bg-amber-100 text-amber-600",
    icon: TriangleAlert,
  },
};

export default function Alert({
  variant = "primary",
  message,
  link,
}: AlertProps) {
  const { container, icon: Icon } = variantStyles[variant];

  return (
    <div className={cn("rounded-md border px-4 py-3", container)}>
      <div className="flex gap-3 items-center">
        <Icon
          className="mt-0.5 shrink-0 opacity-60"
          size={16}
          aria-hidden="true"
        />
        <div className="flex grow items-center justify-between gap-3">
          <p className="text-sm">{message}</p>
          {link && (
            <a
              href={link.href}
              className="group text-xs sm:text-sm font-medium whitespace-nowrap flex items-center "
            >
              <span className="hidden sm:flex "> {link.text}</span>
              <ArrowRightIcon
                className="ms-1 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
