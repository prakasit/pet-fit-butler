import { fakerTH as faker } from "@faker-js/faker";

import type {
  AddOn,
  BookingRecord,
  BookingService,
  CameraFeed,
  Coordinates,
  DailyFitReport,
  DashboardActivity,
  GalleryAsset,
  MembershipStatus,
  OwnerProfile,
  Pet,
  RideRecord,
  RideStatus,
  RideStatusPoint,
  TimeSlot,
} from "@/lib/types";

faker.seed(20260301);

const thaiOwnerNames = [
  "ณัฐพร ศรีสุข",
  "พิมพ์ชนก ชัยวัฒน์",
  "กิตติพงศ์ บุญศรี",
  "ศิริพร รัตนกุล",
  "ธนวัฒน์ เลิศชัย",
  "ณภัสสร มณีรัตน์",
  "ชลธร วงศา",
  "วรัญญา พรหมดี",
  "นพรัฐ สุธรรม",
  "พลอยไพลิน แก้วมี",
  "สรัญญา โชคชัย",
  "พีรณัฐ อินทารักษ์",
  "สุพัตรา กาญจนา",
  "ธนกฤต จินดารัตน์",
  "กัญญารัตน์ อรุณรักษ์",
  "รชต ปรีชา",
  "พิมลดา ทองชัย",
  "อนุรักษ์ สมบัติ",
  "พัชราภา วงศา",
  "กมลวรรณ ยินดี",
];

const petNames = [
  "โมจิ",
  "ตังเม",
  "ข้าวปั้น",
  "ใบชา",
  "ซูชิ",
  "บัวลอย",
  "พุดดิ้ง",
  "ไข่มุก",
  "มะลิ",
  "ขนุน",
  "ชูโรส",
  "อั่งเปา",
  "มีตังค์",
  "ทองเอก",
  "น้องดาว",
  "ข้าวเหนียว",
  "นวล",
  "น้องหมี",
  "พีช",
  "โกโก้",
];

const breeds = [
  "เฟรนช์บูลด็อก",
  "ปอมเมอเรเนียน",
  "โกลเด้นรีทรีฟเวอร์",
  "ชิบะอินุ",
  "คอร์กี้",
  "ลาบราดอร์",
  "พุดเดิ้ลทอย",
  "ซามอยด์",
  "เบงกอล",
  "สก็อตติชโฟลด์",
  "บริติชชอร์ตแฮร์",
  "ไซบีเรียนฮัสกี้",
  "บีเกิล",
  "เมนคูน",
  "ชิวาวา",
];

const conditions = [
  "ข้อตึงจากการใช้งาน",
  "ภาวะน้ำหนักเกินเล็กน้อย",
  "โปรแกรมดูแลสะโพก",
  "ฟื้นฟูหลังผ่าตัด",
  "ระบบย่อยอาหารบอบบาง",
  "ดูแลการเคลื่อนไหววัยสูงวัย",
];

const allergies = [
  "โปรตีนไก่",
  "ไรฝุ่น",
  "อาหารทะเล",
  "เกสรดอกไม้",
  "นมวัว",
  "ไม่มี",
];

const butlerNotesPool = [
  "ลูกรักรักษาระดับการออกแรงได้ดี พร้อมการหายใจที่สม่ำเสมอตลอดเซสชัน",
  "ตอบสนองต่อวารีบำบัดได้ดีมาก และมีความผ่อนคลายหลังจบกิจกรรม",
  "แนะนำช่วงคูลดาวน์สั้น ๆ หลังลู่วิ่งเพื่อฟื้นตัวอย่างนุ่มนวล",
  "มีแรงจูงใจสูงและจดจ่อดีตลอดช่วงฝึกความคล่องตัว",
  "ควรเสริมการดื่มน้ำก่อนกิจกรรมรอบเย็นเพื่อความสมดุลของร่างกาย",
  "สัญญาณการฟื้นตัวดีและอัตราการเต้นหัวใจตอบสนองได้เหมาะสม",
];

const servicesByCatalog: BookingService[] = [
  {
    id: "svc-starter-fit",
    category: "Single Session",
    name: "โปรแกรมพื้นฐาน",
    description: "ดูแลความฟิตและการเคลื่อนไหวพื้นฐานอย่างสมดุล",
    price: 1200,
  },
  {
    id: "svc-hydro-pro",
    category: "Single Session",
    name: "โปรแกรมวารีบำบัด",
    description: "วารีบำบัดร่วมกับลู่วิ่งใต้น้ำเพื่อเสริมความแข็งแรงอย่างอ่อนโยน",
    price: 1800,
  },
  {
    id: "svc-day-trip",
    category: "Single Session",
    name: "แพ็กเกจดูแลตลอดวัน",
    description: "ดูแลครบตลอดวันพร้อมทีมผู้ช่วยดูแลอย่างใกล้ชิด",
    price: 2500,
  },
  {
    id: "svc-active-fit",
    category: "Membership",
    name: "Active Fit (พื้นฐาน)",
    description: "แพ็กเกจรายเดือนสำหรับดูแลความฟิตประจำและติดตามกิจกรรมต่อเนื่อง",
    price: 8500,
  },
  {
    id: "svc-executive-care",
    category: "Membership",
    name: "Executive Care (ยอดนิยม)",
    description: "สิทธิ์นัดหมายลำดับพิเศษพร้อมการดูแลสุขภาพที่ครอบคลุมมากขึ้น",
    price: 18500,
  },
  {
    id: "svc-ultimate-wellness",
    category: "Membership",
    name: "Ultimate Wellness (พรีเมียมสูงสุด)",
    description: "ดูแลสุขภาพครบวงจรพร้อมผู้ช่วยส่วนตัวและระบบติดตามเต็มรูปแบบ",
    price: 28000,
  },
  {
    id: "svc-weight-loss-camp",
    category: "Special Program",
    name: "โปรแกรมควบคุมน้ำหนักเข้มข้น",
    description: "โปรแกรมพิเศษเน้นปรับสมดุลรูปร่าง (+2,000 บาท)",
    price: 2000,
  },
  {
    id: "svc-senior-rehab",
    category: "Special Program",
    name: "โปรแกรมฟื้นฟูวัยสูงวัย",
    description: "แผนฟื้นฟูการเคลื่อนไหวแบบแรงกระแทกต่ำ (+3,000 บาท)",
    price: 3000,
  },
];

const addOnsCatalog: AddOn[] = [
  {
    id: "addon-pet-taxi",
    name: "บริการรับ-ส่งลูกรัก",
    price: 380,
    description: "บริการรับ-ส่งโดยทีมผู้ดูแล คิดตามระยะทาง (ราคาแบบจำลอง)",
  },
  {
    id: "addon-grooming",
    name: "บริการกรูมมิ่ง",
    price: 750,
    description: "อาบน้ำ เป่าแห้ง และดูแลขนอย่างพิถีพิถัน",
  },
  {
    id: "addon-overnight",
    name: "บริการพักค้างคืน",
    price: 1500,
    description: "ห้องพักสบายพร้อมการดูแลตลอดคืน",
  },
];

const membershipOptions = ["Active Fit", "Executive Care", "Ultimate Wellness"] as const;
const paymentMethods = [
  "บัตรเครดิตวีซ่า แพลทินัม",
  "บัตรเครดิตมาสเตอร์การ์ด เวิลด์",
  "โอนผ่านธนาคาร",
  "พร้อมเพย์",
] as const;

const rideStatusFlow: RideStatus[] = [
  "BUTLER_ON_THE_WAY",
  "PET_PICKED_UP",
  "ARRIVED_AT_STUDIO",
  "WORKOUT_IN_PROGRESS",
  "HEADING_HOME",
  "ARRIVED_HOME",
];

const rand = (min: number, max: number) =>
  faker.number.float({ min, max, fractionDigits: 2 });

const randomCoordinate = (base: Coordinates): Coordinates => ({
  lat: Number((base.lat + rand(-0.08, 0.08)).toFixed(5)),
  lng: Number((base.lng + rand(-0.09, 0.09)).toFixed(5)),
});

const monthLabels = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

export const pets: Pet[] = Array.from({ length: 15 }, (_, index) => {
  const ownerName = thaiOwnerNames[index % thaiOwnerNames.length];
  const baseWeight = faker.number.float({ min: 4.2, max: 33.4, fractionDigits: 1 });
  const petId = `pet-${index + 1}`;

  const weightHistory = monthLabels.map((month, monthIndex) => {
    const progression = (monthIndex - 5) * faker.number.float({ min: 0.05, max: 0.2, fractionDigits: 2 });
    return {
      month,
      weightKg: Number((baseWeight + progression).toFixed(1)),
    };
  });

  const activityHistory = Array.from({ length: 20 }, (_, activityIndex) => ({
    id: `${petId}-activity-${activityIndex + 1}`,
    date: faker.date.recent({ days: 35 }).toISOString(),
    category: faker.helpers.arrayElement(["Walk", "Swim", "Treadmill", "Agility", "Rehab"]),
    durationMin: faker.number.int({ min: 20, max: 85 }),
    distanceKm: Number(faker.number.float({ min: 0.8, max: 6.5, fractionDigits: 2 }).toFixed(2)),
    calories: faker.number.int({ min: 120, max: 650 }),
  }));

  return {
    id: petId,
    name: petNames[index % petNames.length],
    breed: breeds[index % breeds.length],
    age: faker.number.int({ min: 1, max: 13 }),
    ownerName,
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    currentWeightKg: weightHistory[weightHistory.length - 1]?.weightKg ?? baseWeight,
    medicalConditions: faker.helpers.arrayElements(conditions, {
      min: 1,
      max: 2,
    }),
    allergies: faker.helpers.arrayElements(allergies, {
      min: 1,
      max: 2,
    }),
    weightHistory,
    activityHistory,
  };
});

const ownerCoordinates = {
  lat: 13.7563,
  lng: 100.5018,
};

const thaiDriverNames = [
  "อนันต์ ประเสริฐ",
  "ณัฐพล วงศ์ชัย",
  "กานต์ธีร์ สุขเจริญ",
  "ปัญญา ใจดี",
  "ศุภชัย บุญมี",
  "รวิศ ภูวดล",
  "อิทธิพล ชื่นใจ",
  "วชิรวิทย์ ร่มเย็น",
  "ภูริทัต สมบูรณ์",
  "ธันวา เจริญผล",
];

const createBookingRecord = (index: number): BookingRecord => {
  const service = faker.helpers.arrayElement(servicesByCatalog);
  const pet = faker.helpers.arrayElement(pets);
  const pickedAddons = faker.helpers.arrayElements(addOnsCatalog, {
    min: 0,
    max: 2,
  });
  const isFuture = index < 10;
  const date = isFuture
    ? faker.date.soon({ days: 30 }).toISOString()
    : faker.date.recent({ days: 45 }).toISOString();
  const taxiDistanceKm = faker.number.int({ min: 3, max: 18 });
  const taxiFee = pickedAddons.some((addon) => addon.id === "addon-pet-taxi")
    ? taxiDistanceKm * 20
    : 0;

  return {
    id: `booking-${index + 1}`,
    petId: pet.id,
    petName: pet.name,
    ownerName: pet.ownerName,
    serviceName: service.name,
    serviceCategory: service.category,
    date,
    timeSlot: faker.helpers.arrayElement<TimeSlot>(["Morning", "Afternoon"]),
    addOns: pickedAddons.map((addon) => addon.name),
    totalPrice:
      service.price + pickedAddons.reduce((sum, addon) => sum + addon.price, 0) + taxiFee,
    status: isFuture
      ? "Scheduled"
      : faker.helpers.arrayElement(["Completed", "Completed", "Cancelled", "In Progress"]),
  };
};

export const bookingRecords: BookingRecord[] = Array.from({ length: 20 }, (_, index) =>
  createBookingRecord(index),
);

export const upcomingBookings = bookingRecords
  .filter((record) => record.status === "Scheduled")
  .sort((a, b) => +new Date(a.date) - +new Date(b.date))
  .slice(0, 10);

export const dashboardActivities: DashboardActivity[] = Array.from(
  { length: 20 },
  (_, index) => {
    const pet = faker.helpers.arrayElement(pets);
    const detail = faker.helpers.arrayElement([
      "จบวารีบำบัดบนลู่วิ่งใต้น้ำตามแผน",
      "ผ่านการฝึกความคล่องตัวร่วมกับโค้ชประจำ",
      "ได้รับการยืดคลายกล้ามเนื้อหลังออกกำลังกาย",
      "ทำเป้าหมายการเคลื่อนไหวประจำวันสำเร็จ",
      "ผ่านการประเมินโภชนาการและน้ำหนักเรียบร้อย",
      "เข้าร่วมโปรแกรมดูแลการเคลื่อนไหววัยสูงวัย",
    ]);

    return {
      id: `dashboard-activity-${index + 1}`,
      petName: pet.name,
      summary: `${pet.name} ${detail}`,
      timestamp: faker.date.recent({ days: 7 }).toISOString(),
    };
  },
);

export const dailyActivitySeries = Array.from({ length: 7 }, (_, index) => ({
  day: ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."][index],
  calories: faker.number.int({ min: 190, max: 690 }),
  distanceKm: Number(faker.number.float({ min: 1.8, max: 6.8, fractionDigits: 2 }).toFixed(2)),
}));

export const membershipStatus: MembershipStatus = {
  tier: faker.helpers.arrayElement(membershipOptions),
  startedAt: faker.date.past({ years: 1 }).toISOString(),
  expiresAt: faker.date.future({ years: 1 }).toISOString(),
  visitsRemaining: faker.number.int({ min: 8, max: 30 }),
  conciergeContact: "+66 81 889 1122",
};

export const currentUserProfile: OwnerProfile = {
  id: "owner-1",
  name: thaiOwnerNames[0],
  phone: "+66 89 246 3587",
  email: "อีเมลส่วนตัวสำหรับการแจ้งเตือน",
  address: "ซอยสุขุมวิท 39 เขตวัฒนา กรุงเทพมหานคร 10110",
  coordinates: ownerCoordinates,
  membershipType: membershipStatus.tier,
  paymentMethod: faker.helpers.arrayElement(paymentMethods),
  bookingHistory: bookingRecords,
};

export const healthDashboardSeries = {
  weightByMonth: monthLabels.map((month) => ({
    month,
    avgWeightKg: Number(faker.number.float({ min: 8.4, max: 21.6, fractionDigits: 2 }).toFixed(1)),
  })),
  activityByDay: Array.from({ length: 30 }, (_, index) => ({
    day: `${index + 1}`,
    activityScore: faker.number.int({ min: 55, max: 100 }),
    calories: faker.number.int({ min: 200, max: 720 }),
  })),
  caloriesByMonth: monthLabels.map((month) => ({
    month,
    calories: faker.number.int({ min: 5200, max: 13800 }),
  })),
};

export const rides: RideRecord[] = Array.from({ length: 10 }, (_, index) => {
  const activeStage = faker.number.int({ min: 0, max: rideStatusFlow.length - 1 });
  const pickup = randomCoordinate({ lat: 13.7563, lng: 100.5018 });
  const studio = randomCoordinate({ lat: 13.7396, lng: 100.5626 });
  const pet = pets[index % pets.length];

  const timeline: RideStatusPoint[] = rideStatusFlow.map((status, stage) => ({
    status,
    completed: stage < activeStage,
    active: stage === activeStage,
    timestamp: faker.date.recent({ days: 1 }).toISOString(),
  }));

  return {
    id: `ride-${index + 1}`,
    petName: pet.name,
    ownerName: pet.ownerName,
    driver: {
      id: `driver-${index + 1}`,
      name: thaiDriverNames[index % thaiDriverNames.length] ?? "ผู้ดูแลประจำรถ",
      phone: `+66 8${faker.number.int({ min: 10_000_000, max: 99_999_999 })}`,
      vehicle: faker.helpers.arrayElement(["รถตู้ดูแลพิเศษ", "รถเอสยูวีพรีเมียม", "รถเอ็มพีวีพิเศษ"]),
      rating: Number(faker.number.float({ min: 4.6, max: 5, fractionDigits: 1 }).toFixed(1)),
      photoUrl: `https://i.pravatar.cc/150?img=${index + 12}`,
    },
    etaMinutes: faker.number.int({ min: 4, max: 32 }),
    currentStatus: rideStatusFlow[activeStage] ?? "BUTLER_ON_THE_WAY",
    timeline,
    route: [
      pickup,
      randomCoordinate({ lat: (pickup.lat + studio.lat) / 2, lng: (pickup.lng + studio.lng) / 2 }),
      studio,
    ],
  };
});

export const cameraFeeds: CameraFeed[] = Array.from({ length: 5 }, (_, index) => ({
  id: `cam-${index + 1}`,
  name: `กล้องดูแลสุขภาพ ${index + 1}`,
  zone: faker.helpers.arrayElement([
    "โซนวารีบำบัด",
    "โซนฝึกความคล่องตัว",
    "โซนพักฟื้น",
    "เลานจ์ดูแลพิเศษ",
    "โซนฟื้นฟูวัยสูงวัย",
  ]),
  isSecure: faker.datatype.boolean(0.85),
  viewers: faker.number.int({ min: 3, max: 42 }),
}));

export const dailyReports: DailyFitReport[] = Array.from({ length: 20 }, (_, index) => {
  const pet = pets[index % pets.length];
  return {
    id: `fit-report-${index + 1}`,
    petId: pet.id,
    petName: pet.name,
    reportDate: faker.date.recent({ days: 22 }).toISOString(),
    caloriesBurned: faker.number.int({ min: 180, max: 760 }),
    distanceKm: Number(faker.number.float({ min: 1.4, max: 8.9, fractionDigits: 2 }).toFixed(2)),
    swimTimeMin: faker.number.int({ min: 10, max: 45 }),
    workoutDurationMin: faker.number.int({ min: 35, max: 105 }),
    butlerNotes: faker.helpers.arrayElement(butlerNotesPool),
    healthAlert: faker.helpers.arrayElement(["Normal", "Normal", "Watch", "Attention"]),
  };
});

export const galleryAssets: GalleryAsset[] = [
  ...Array.from({ length: 20 }, (_, index) => ({
    id: `gallery-image-${index + 1}`,
    kind: "image" as const,
    title: `ช่วงเวลาแห่งความสุข ${index + 1}`,
    capturedAt: faker.date.recent({ days: 30 }).toISOString(),
    sizeMb: Number(faker.number.float({ min: 1.4, max: 8.7, fractionDigits: 1 }).toFixed(1)),
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `gallery-video-${index + 1}`,
    kind: "video" as const,
    title: `คลิปกิจกรรม ${index + 1}`,
    capturedAt: faker.date.recent({ days: 30 }).toISOString(),
    sizeMb: Number(faker.number.float({ min: 9.5, max: 45.5, fractionDigits: 1 }).toFixed(1)),
    durationSec: faker.number.int({ min: 24, max: 230 }),
  })),
];

export const services = servicesByCatalog;
export const addOns = addOnsCatalog;

export const butlerStatus = {
  isActive: true,
  shiftName: "รอบเช้าทีมผู้ดูแล",
  butlerName: "อนันต์ ประเสริฐ",
  currentTask: "กำกับการวารีบำบัดบนลู่วิ่งใต้น้ำ",
};
