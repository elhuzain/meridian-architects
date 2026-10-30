// Colors follow the theme tokens, so the same mark serves light and dark
// (inside .section-dark the tokens invert automatically).
const sizes = {
  sm: {
    root: "gap-4",
    mark: "h-11 w-8",
    divider: "h-8",
    name: "text-[1.625rem]",
    tagline: "mt-1.5 text-[0.5625rem]",
  },
  lg: {
    root: "gap-6",
    mark: "h-[66px] w-12",
    divider: "h-12",
    name: "text-[2.5rem]",
    tagline: "mt-2 text-[0.6875rem]",
  },
};

export default function Logo({ size = "lg" }: { size?: keyof typeof sizes }) {
  const s = sizes[size];

  return (
    <span className={`flex items-center text-ink ${s.root}`}>
      <svg
        aria-hidden
        viewBox="0 0 64 88"
        className={`shrink-0 ${s.mark}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
      >
        <rect x="4" y="16" width="56" height="56" />
        <path d="M32 4V84" />
        <path d="M4 72A28 42 0 0 1 60 72" />
        <rect x="29.5" y="27.5" width="5" height="5" fill="currentColor" stroke="none" />
      </svg>

      <span aria-hidden className={`w-px shrink-0 bg-ink/20 ${s.divider}`} />

      <span className="flex flex-col">
        <span className={`leading-none font-light tracking-[-0.01em] ${s.name}`}>Meridian</span>
        <span
          className={`leading-none font-normal tracking-[0.32em] text-muted uppercase ${s.tagline}`}
        >
          Architects
        </span>
      </span>
    </span>
  );
}
