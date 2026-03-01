import Link from "next/link";
import { CloudOff } from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function OfflinePage() {
  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4 py-8">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-center">
          <BrandLogo />
        </div>
        <PremiumCard
          title="You are offline"
          subtitle="Your wellness dashboard is not connected at the moment."
        >
          <div className="space-y-4 text-sm text-text-muted">
            <p className="flex items-center gap-2">
              <CloudOff className="h-4 w-4 text-sage" />
              We stored key data locally. Reconnect to sync live rides, reports, and camera feeds.
            </p>
            <Link href="/dashboard">
              <ElegantButton type="button">Open Cached Dashboard</ElegantButton>
            </Link>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
