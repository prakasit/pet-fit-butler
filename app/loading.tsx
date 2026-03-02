"use client";

import { useTranslations } from "next-intl";

/** SVG loading animation — circular ring, calm rotation. No logo image. */
function LoadingSpinnerSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="44 132"
        fill="none"
        style={{
          transformOrigin: "32px 32px",
          animation: "loading-spin 1.8s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

export default function Loading() {
  const tBrand = useTranslations("brand");
  const tLoading = useTranslations("loading");

  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4">
      {/* Desktop: SVG loading animation (no logo) */}
      <div className="hidden flex-col items-center justify-center gap-4 text-center md:flex">
        <div className="text-sage">
          <LoadingSpinnerSvg className="h-24 w-24" />
        </div>
        <div>
          <p className="text-xs tracking-[0.18em] text-text-muted">{tBrand("name")}</p>
          <p className="mt-1 text-2xl text-brand-navy">{tLoading("title")}</p>
        </div>
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-brand-navy/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-sage" />
        </div>
      </div>

      {/* Mobile: SVG loading animation (no logo) + progress bar */}
      <div className="flex min-h-[60vh] w-full max-w-[90vw] flex-col items-center justify-center gap-6 px-6 text-center md:hidden">
        <div className="text-sage">
          <LoadingSpinnerSvg className="h-[90px] w-[90px]" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.18em] text-text-muted">{tBrand("name")}</p>
          <p className="text-lg font-medium text-brand-navy">{tLoading("title")}</p>
          <p className="text-sm text-text-muted/90">{tLoading("subtitle")}</p>
        </div>
        <div className="w-full max-w-[240px]">
          <div className="h-1 overflow-hidden rounded-full bg-sage/20">
            <div className="loading-progress-shimmer h-full w-[40%] rounded-full bg-sage/90" />
          </div>
        </div>
      </div>
    </div>
  );
}
