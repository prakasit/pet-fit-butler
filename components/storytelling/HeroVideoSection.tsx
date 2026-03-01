"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { ElegantButton } from "@/components/ui/ElegantButton";

const HERO_POSTER = "https://assets.mixkit.co/videos/45843/45843-thumb-720-3.jpg";
const HERO_VIDEO_LARGE = "https://assets.mixkit.co/videos/45843/45843-720.mp4";
const HERO_VIDEO_SMALL = "https://assets.mixkit.co/videos/45843/45843-360.mp4";

export function HeroVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const useImageFallback = Boolean(prefersReducedMotion || videoLoadFailed);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[30px] border border-line-soft/60 shadow-premium-lg"
    >
      <div className="relative h-[430px] w-full">
        {useImageFallback ? (
          <Image
            src={HERO_POSTER}
            alt="Happy dog running with joyful energy"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 720px"
          />
        ) : (
          <motion.video
            style={{ y: videoY }}
            className="h-full w-full scale-[1.08] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            onError={() => setVideoLoadFailed(true)}
          >
            <source src={HERO_VIDEO_SMALL} media="(max-width: 767px)" type="video/mp4" />
            <source src={HERO_VIDEO_LARGE} type="video/mp4" />
          </motion.video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/20 via-brand-navy/38 to-brand-navy/74" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-4"
        >
          <p className="max-w-[30ch] text-4xl leading-tight text-soft-cream md:text-[2.65rem]">
            A Happier, Healthier Life for Your Best Friend
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/booking">
              <ElegantButton>Book a Session</ElegantButton>
            </Link>
            <Link href="/profile">
              <ElegantButton variant="secondary">View Membership</ElegantButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
