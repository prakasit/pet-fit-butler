import type {
  ActivityEntry,
  BookingRecord,
  BookingType,
  DailyFitReport,
  MembershipType,
  RideStatus,
  TimeSlot,
} from "@/lib/types";

export const navLabelThai: Record<
  "home" | "booking" | "activity" | "live" | "profile",
  string
> = {
  home: "หน้าหลัก",
  booking: "จองบริการ",
  activity: "กิจกรรม",
  live: "ถ่ายทอดสด",
  profile: "โปรไฟล์",
};

export const pageTitleThai: Record<string, string> = {
  "/dashboard": "หน้าหลัก",
  "/booking": "จองบริการ",
  "/health": "กิจกรรม",
  "/tracking": "ถ่ายทอดสด",
  "/profile": "โปรไฟล์",
  "/reports": "รายงานสุขภาพ",
  "/pets": "ข้อมูลลูกรัก",
  "/live-cam": "ถ่ายทอดสด",
  "/gallery": "แกลเลอรี",
};

export const bookingTypeThai: Record<BookingType, string> = {
  "Single Session": "คอร์สรายครั้ง",
  Membership: "แพ็กเกจสมาชิกรายเดือน",
  "Special Program": "โปรแกรมพิเศษ",
};

export const membershipTypeThai: Record<MembershipType, string> = {
  "Active Fit": "Active Fit (พื้นฐาน)",
  "Executive Care": "Executive Care (ยอดนิยม)",
  "Ultimate Wellness": "Ultimate Wellness (พรีเมียมสูงสุด)",
};

export const timeSlotThai: Record<TimeSlot, string> = {
  Morning: "ช่วงเช้า",
  Afternoon: "ช่วงบ่าย",
};

export const bookingStatusThai: Record<BookingRecord["status"], string> = {
  Scheduled: "นัดหมายแล้ว",
  "In Progress": "กำลังให้บริการ",
  Completed: "เสร็จสิ้น",
  Cancelled: "ยกเลิก",
};

export const rideStatusThai: Record<RideStatus, string> = {
  BUTLER_ON_THE_WAY: "ผู้ดูแลกำลังเดินทางไปรับ",
  PET_PICKED_UP: "รับลูกรักขึ้นรถเรียบร้อยแล้ว",
  ARRIVED_AT_STUDIO: "ถึงสตูดิโอแล้ว",
  WORKOUT_IN_PROGRESS: "กำลังทำกิจกรรม",
  HEADING_HOME: "กำลังเดินทางกลับบ้าน",
  ARRIVED_HOME: "ส่งลูกรักถึงบ้านเรียบร้อยแล้ว",
};

export const healthAlertThai: Record<DailyFitReport["healthAlert"], string> = {
  Normal: "ปกติ",
  Watch: "เฝ้าระวัง",
  Attention: "ต้องดูแลใกล้ชิด",
};

export const activityCategoryThai: Record<ActivityEntry["category"], string> = {
  Walk: "เดินออกกำลังกาย",
  Swim: "ว่ายน้ำบำบัด",
  Treadmill: "ลู่วิ่ง",
  Agility: "ฝึกความคล่องตัว",
  Rehab: "ฟื้นฟูร่างกาย",
};

export const genderThai: Record<"Male" | "Female", string> = {
  Male: "เพศผู้",
  Female: "เพศเมีย",
};
