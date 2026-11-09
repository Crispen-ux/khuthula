import { LucideIcon } from "lucide-react";

type ImagePlaceholderProps = {
  label?: string;
  icon?: LucideIcon;
  className?: string;
  aspect?: string;
};

export default function ImagePlaceholder({
  label,
  icon: Icon,
  className = "",
  aspect = "aspect-[4/3]",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative ${aspect} overflow-hidden rounded-lg bg-gradient-to-br from-charcoal-soft via-charcoal to-charcoal-soft ${className}`}
      role="img"
      aria-label={label ?? "Image placeholder"}
    >
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative flex h-full flex-col items-center justify-center gap-3 text-white/80">
        {Icon && <Icon className="h-10 w-10 text-red" aria-hidden="true" />}
        {label && <p className="px-4 text-center text-sm font-medium">{label}</p>}
      </div>
    </div>
  );
}