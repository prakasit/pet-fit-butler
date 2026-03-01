import { LockKeyhole, ShieldCheck } from "lucide-react";

import { BrandLogo } from "@/components/BrandLogo";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";

export default function AuthPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-soft-cream px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center">
          <BrandLogo compact={false} href="/dashboard" />
        </div>

        <PremiumCard
          title="Secure Butler Access"
          subtitle="Sign in to your premium pet wellness account"
        >
          <form className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm text-text-muted">Email</span>
              <input
                type="email"
                defaultValue="nattaporn.srisuk@example.com"
                className="h-11 w-full rounded-xl border border-line-soft bg-soft-cream px-3 text-sm text-brand-navy focus:border-sage focus:outline-none"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm text-text-muted">Password</span>
              <input
                type="password"
                defaultValue="********"
                className="h-11 w-full rounded-xl border border-line-soft bg-soft-cream px-3 text-sm text-brand-navy focus:border-sage focus:outline-none"
              />
            </label>
            <ElegantButton fullWidth type="button">
              <LockKeyhole className="mr-2 h-4 w-4" />
              Continue Securely
            </ElegantButton>
          </form>

          <div className="mt-4 rounded-xl bg-sage/20 p-3 text-xs text-brand-navy">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Enterprise-grade encrypted access (mock state)
            </p>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
