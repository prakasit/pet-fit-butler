"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface StoryImageBlockProps {
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

export function StoryImageBlock({ title, caption, imageUrl, alt }: StoryImageBlockProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[28px] border border-line-soft/60 bg-surface shadow-premium"
    >
      <div className="relative h-72 w-full">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/26 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-6 text-soft-cream">
        <p className="text-2xl leading-tight">{title}</p>
        <p className="mt-1 text-sm text-soft-cream/85">{caption}</p>
      </div>
    </motion.article>
  );
}
