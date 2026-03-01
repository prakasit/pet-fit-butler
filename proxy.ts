import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  getLocaleFromPathname,
  resolveLocale,
  stripLocalePrefix,
  withLocalePrefix,
} from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/icons") ||
    pathname.startsWith("/sw.js") ||
    pathname.startsWith("/manifest.json") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = getLocaleFromPathname(pathname);
  const cookieLocale = resolveLocale(request.cookies.get(LOCALE_COOKIE)?.value);

  if (!pathnameLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = withLocalePrefix(pathname, cookieLocale ?? DEFAULT_LOCALE);
    return NextResponse.redirect(redirectUrl);
  }

  const strippedPath = stripLocalePrefix(pathname);
  const rewritePath = strippedPath === "/" ? "/dashboard" : strippedPath;
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = rewritePath;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", pathnameLocale);

  const response = NextResponse.rewrite(rewriteUrl, {
    request: { headers: requestHeaders },
  });

  response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
