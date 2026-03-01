import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="overflow-hidden rounded-3xl border border-line-soft bg-surface p-2 shadow-premium">
          <Image
            src="/brand_logo.jpg"
            alt="Pet Fit Butler"
            width={96}
            height={96}
            className="rounded-2xl object-cover"
            priority
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.24em] text-text-muted">PET FIT BUTLER</p>
          <p className="mt-1 text-2xl text-brand-navy">Preparing your wellness lounge</p>
        </div>
        <div className="h-1.5 w-44 overflow-hidden rounded-full bg-brand-navy/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-sage" />
        </div>
      </div>
    </div>
  );
}
