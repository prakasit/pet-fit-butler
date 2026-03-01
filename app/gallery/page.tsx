"use client";

import { motion } from "framer-motion";
import { Download, Image as ImageIcon, PlayCircle } from "lucide-react";

import { PremiumCard } from "@/components/ui/PremiumCard";
import { formatDate } from "@/lib/format";
import { galleryAssets } from "@/mock";

export default function GalleryPage() {
  const imageAssets = galleryAssets.filter((asset) => asset.kind === "image");
  const videoAssets = galleryAssets.filter((asset) => asset.kind === "video");

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-[28px] bg-brand-navy px-6 py-7 text-soft-cream shadow-premium"
      >
        <p className="text-sm text-soft-cream/80">Captured moments</p>
        <h2 className="mt-1 text-3xl leading-tight">Memories & Clips</h2>
        <p className="mt-2 text-sm text-soft-cream/80">{imageAssets.length} images · {videoAssets.length} videos</p>
      </motion.section>

      <PremiumCard title="Photo Gallery" subtitle={`${imageAssets.length} mock images`}>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imageAssets.map((asset, index) => (
            <article
              key={asset.id}
              className="min-w-[240px] overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-premium-sm"
            >
              <div className="grid h-40 place-items-center bg-[linear-gradient(135deg,rgba(15,27,45,0.86),rgba(143,175,155,0.85),rgba(233,216,195,0.85))] text-soft-cream">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-7 w-7" />
                  <p className="mt-2 text-sm">Image {index + 1}</p>
                </div>
              </div>
              <div className="space-y-2 p-3 text-sm">
                <p className="font-semibold text-brand-navy">{asset.title}</p>
                <p className="text-xs text-text-muted">
                  {formatDate(asset.capturedAt)} • {asset.sizeMb} MB
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-soft-cream transition hover:-translate-y-0.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>

      <PremiumCard title="Video Thumbnails" subtitle={`${videoAssets.length} training clips`}>
        <div className="space-y-3">
          {videoAssets.map((asset, index) => (
            <article
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-premium-sm"
            >
              <div className="relative grid h-44 place-items-center bg-[linear-gradient(135deg,rgba(15,27,45,0.9),rgba(201,167,100,0.72),rgba(143,175,155,0.72))] text-soft-cream">
                <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold">
                  VIDEO
                </span>
                <div className="text-center">
                  <PlayCircle className="mx-auto h-10 w-10" />
                  <p className="mt-2 text-sm">Clip {index + 1}</p>
                </div>
              </div>
              <div className="space-y-2 p-3 text-sm">
                <p className="font-semibold text-brand-navy">{asset.title}</p>
                <p className="text-xs text-text-muted">
                  {formatDate(asset.capturedAt)} • {asset.sizeMb} MB • {asset.durationSec}s
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-soft-cream transition hover:-translate-y-0.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </PremiumCard>
    </div>
  );
}
