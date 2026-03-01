import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
  href?: string;
}

export function BrandLogo({ compact = false, className, href = "/dashboard" }: BrandLogoProps) {
  const content = (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="overflow-hidden rounded-xl border border-line-soft bg-surface p-1 shadow-premium-sm">
        <Image
          src="/brand_logo.jpg"
          alt="โลโก้แบรนด์เพ็ท ฟิต บัตเลอร์"
          width={compact ? 36 : 44}
          height={compact ? 36 : 44}
          className="rounded-lg object-cover"
          priority
        />
      </div>
      {!compact && (
        <div>
          <p className="text-xs tracking-[0.18em] text-text-muted">เพ็ท ฟิต บัตเลอร์</p>
          <p className="text-lg leading-tight text-brand-navy">ดูแลสุขภาพลูกรักอย่างพรีเมียม</p>
        </div>
      )}
    </div>
  );

  return <Link href={href}>{content}</Link>;
}
