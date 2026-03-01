"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Camera, CircleDot, Eye, Lock, Shield } from "lucide-react";

import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cameraFeeds } from "@/mock";

export default function LiveCamPage() {
  const [selectedCameraId, setSelectedCameraId] = useState(cameraFeeds[0]?.id ?? "");
  const [secureAccess, setSecureAccess] = useState(true);

  const selectedFeed = useMemo(
    () => cameraFeeds.find((feed) => feed.id === selectedCameraId) ?? cameraFeeds[0],
    [selectedCameraId],
  );

  if (!selectedFeed) return null;

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-sm text-soft-cream/80">Secure livestream access</p>
        <h2 className="mt-1 text-3xl leading-tight">{selectedFeed.name}</h2>
        <p className="mt-2 text-sm text-soft-cream/80">{selectedFeed.zone}</p>
      </motion.section>

      <PremiumCard title="Camera Feeds" subtitle="Switch between 5 secure channels">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {cameraFeeds.map((feed) => (
            <button
              key={feed.id}
              type="button"
              onClick={() => setSelectedCameraId(feed.id)}
              className={`min-w-[150px] rounded-2xl border p-3 text-left transition ${
                selectedFeed.id === feed.id
                  ? "border-brand-navy bg-brand-navy text-soft-cream"
                  : "border-line-soft bg-soft-cream text-brand-navy"
              }`}
            >
              <p className="font-semibold">{feed.name}</p>
              <p className="text-xs opacity-80">{feed.zone}</p>
            </button>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard title={selectedFeed.name} subtitle={selectedFeed.zone}>
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-brand-navy">
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white">
              <CircleDot className="h-3.5 w-3.5" />
              LIVE
            </div>
            <div className="absolute top-4 right-4 z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-brand-navy">
              {selectedFeed.viewers} viewers
            </div>

            <div className="flex h-[340px] items-center justify-center bg-[radial-gradient(circle_at_35%_35%,rgba(143,175,155,0.55),transparent_45%),radial-gradient(circle_at_70%_60%,rgba(233,216,195,0.45),transparent_50%)]">
              <div className="rounded-2xl border border-soft-cream/25 bg-brand-navy/70 px-6 py-4 text-center text-soft-cream">
                <Camera className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-2 text-lg">Video Stream Placeholder</p>
                <p className="text-xs text-soft-cream/80">Encrypted wellness monitoring feed</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge
              label={secureAccess ? "Secure Access Enabled" : "Access Not Secure"}
              tone={secureAccess ? "success" : "warning"}
            />
            <StatusBadge
              label={selectedFeed.isSecure ? "Camera Authenticated" : "Auth Check Required"}
              tone={selectedFeed.isSecure ? "success" : "warning"}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <ElegantButton type="button" onClick={() => setSecureAccess((value) => !value)}>
              {secureAccess ? <Lock className="mr-2 h-4 w-4" /> : <Shield className="mr-2 h-4 w-4" />}
              Toggle Security
            </ElegantButton>
            <ElegantButton type="button" variant="secondary">
              <Eye className="mr-2 h-4 w-4" />
              Switch View
            </ElegantButton>
          </div>
        </div>
      </PremiumCard>
    </div>
  );
}
