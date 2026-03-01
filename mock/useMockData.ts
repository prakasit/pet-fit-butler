"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";

import { resolveLocale } from "@/lib/i18n";

import { getMockData } from "./data";

export function useMockData() {
  const locale = resolveLocale(useLocale());

  return useMemo(() => getMockData(locale), [locale]);
}
