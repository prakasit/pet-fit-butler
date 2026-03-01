import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import { AppShell } from "@/components/layout/AppShell";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "เพ็ท ฟิต บัตเลอร์ | ดูแลสุขภาพลูกรักแบบพรีเมียม",
  description:
    "บริการดูแลสุขภาพสัตว์เลี้ยงระดับพรีเมียม พร้อมผู้ช่วยส่วนตัว การติดตามแบบเรียลไทม์ และรายงานสุขภาพครบถ้วน",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.svg", type: "image/svg+xml" },
      { url: "/icons/icon-512.svg", type: "image/svg+xml" },
    ],
    apple: "/icons/icon-192.svg",
  },
  appleWebApp: {
    capable: true,
    title: "เพ็ท ฟิต บัตเลอร์",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B2A41",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
