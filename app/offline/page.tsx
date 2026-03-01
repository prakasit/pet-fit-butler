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
          title="ขณะนี้อุปกรณ์ออฟไลน์"
          subtitle="ระบบยังไม่สามารถเชื่อมต่อข้อมูลแบบเรียลไทม์ได้ในขณะนี้"
        >
          <div className="space-y-4 text-sm text-text-muted">
            <p className="flex items-center gap-2">
              <CloudOff className="h-4 w-4 text-sage" />
              ระบบได้บันทึกข้อมูลสำคัญไว้ในเครื่องแล้ว เมื่อเชื่อมต่ออีกครั้งจะซิงก์การติดตาม การรายงาน และกล้องสดอัตโนมัติ
            </p>
            <Link href="/dashboard">
              <ElegantButton type="button">เปิดหน้าหลักจากข้อมูลที่บันทึกไว้</ElegantButton>
            </Link>
          </div>
        </PremiumCard>
      </div>
    </div>
  );
}
