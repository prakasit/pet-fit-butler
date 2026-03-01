"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

import { isInternalPath, resolveLocale, withLocalePrefix } from "@/lib/i18n";

type LinkProps = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...props }: LinkProps) {
  const locale = resolveLocale(useLocale());

  const localizedHref =
    typeof href === "string" && isInternalPath(href)
      ? withLocalePrefix(href, locale)
      : href;

  return <Link href={localizedHref} {...props} />;
}
