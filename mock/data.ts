import { fakerTH as faker } from "@faker-js/faker";

import type { AppLocale } from "@/lib/i18n";
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

interface LocaleDataDictionary {
  ownerNames: string[];
  petNames: string[];
  breeds: string[];
  conditions: string[];
  allergies: string[];
  butlerNotesPool: string[];
  servicesByCatalog: BookingService[];
  addOnsCatalog: AddOn[];
  paymentMethods: string[];
  monthLabels: string[];
  weekLabels: string[];
  dashboardDetails: string[];
  driverNames: string[];
  vehicles: string[];
  cameraNamePrefix: string;
  cameraZones: string[];
  galleryImagePrefix: string;
  galleryVideoPrefix: string;
  userEmail: string;
  userAddress: string;
  butlerStatus: {
    shiftName: string;
    butlerName: string;
    currentTask: string;
  };
}

export interface MockDataBundle {
  pets: Pet[];
  bookingRecords: BookingRecord[];
  upcomingBookings: BookingRecord[];
  dashboardActivities: DashboardActivity[];
  dailyActivitySeries: Array<{
    day: string;
    calories: number;
    distanceKm: number;
  }>;
  membershipStatus: MembershipStatus;
  currentUserProfile: OwnerProfile;
  healthDashboardSeries: {
    weightByMonth: Array<{ month: string; avgWeightKg: number }>;
    activityByDay: Array<{ day: string; activityScore: number; calories: number }>;
    caloriesByMonth: Array<{ month: string; calories: number }>;
  };
  rides: RideRecord[];
  cameraFeeds: CameraFeed[];
  dailyReports: DailyFitReport[];
  galleryAssets: GalleryAsset[];
  services: BookingService[];
  addOns: AddOn[];
  butlerStatus: {
    isActive: boolean;
    shiftName: string;
    butlerName: string;
    currentTask: string;
  };
}

const localizedDictionary: Record<AppLocale, LocaleDataDictionary> = {
  th: {
    ownerNames: [
      "ธนพล ใจดี",
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
    ],
    petNames: [
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
    ],
    breeds: [
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
    ],
    conditions: [
      "ข้อตึงจากการใช้งาน",
      "ภาวะน้ำหนักเกินเล็กน้อย",
      "โปรแกรมดูแลสะโพก",
      "ฟื้นฟูหลังผ่าตัด",
      "ระบบย่อยอาหารบอบบาง",
      "ดูแลการเคลื่อนไหววัยสูงวัย",
    ],
    allergies: ["โปรตีนไก่", "ไรฝุ่น", "อาหารทะเล", "เกสรดอกไม้", "นมวัว", "ไม่มี"],
    butlerNotesPool: [
      "ลูกรักรักษาระดับการออกแรงได้ดี พร้อมการหายใจที่สม่ำเสมอตลอดเซสชัน",
      "ตอบสนองต่อวารีบำบัดได้ดีมาก และมีความผ่อนคลายหลังจบกิจกรรม",
      "แนะนำช่วงคูลดาวน์สั้น ๆ หลังลู่วิ่งเพื่อฟื้นตัวอย่างนุ่มนวล",
      "มีแรงจูงใจสูงและจดจ่อดีตลอดช่วงฝึกความคล่องตัว",
      "ควรเสริมการดื่มน้ำก่อนกิจกรรมรอบเย็นเพื่อความสมดุลของร่างกาย",
      "สัญญาณการฟื้นตัวดีและอัตราการเต้นหัวใจตอบสนองได้เหมาะสม",
    ],
    servicesByCatalog: [
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
        name: "แอ็กทีฟ ฟิต (พื้นฐาน)",
        description: "แพ็กเกจรายเดือนสำหรับดูแลความฟิตประจำและติดตามกิจกรรมต่อเนื่อง",
        price: 8500,
      },
      {
        id: "svc-executive-care",
        category: "Membership",
        name: "เอ็กเซกคิวทีฟ แคร์ (ยอดนิยม)",
        description: "สิทธิ์นัดหมายลำดับพิเศษพร้อมการดูแลสุขภาพที่ครอบคลุมมากขึ้น",
        price: 18500,
      },
      {
        id: "svc-ultimate-wellness",
        category: "Membership",
        name: "อัลติเมต เวลเนส (พรีเมียมสูงสุด)",
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
    ],
    addOnsCatalog: [
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
    ],
    paymentMethods: ["บัตรเครดิตระดับพรีเมียม", "โอนผ่านธนาคาร", "พร้อมเพย์", "ชำระผ่านแอปธนาคาร"],
    monthLabels: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
    weekLabels: ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."],
    dashboardDetails: [
      "จบวารีบำบัดบนลู่วิ่งใต้น้ำตามแผน",
      "ผ่านการฝึกความคล่องตัวร่วมกับโค้ชประจำ",
      "ได้รับการยืดคลายกล้ามเนื้อหลังออกกำลังกาย",
      "ทำเป้าหมายการเคลื่อนไหวประจำวันสำเร็จ",
      "ผ่านการประเมินโภชนาการและน้ำหนักเรียบร้อย",
      "เข้าร่วมโปรแกรมดูแลการเคลื่อนไหววัยสูงวัย",
    ],
    driverNames: [
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
    ],
    vehicles: ["รถตู้ดูแลพิเศษ", "รถเอสยูวีพรีเมียม", "รถเอ็มพีวีพิเศษ"],
    cameraNamePrefix: "กล้องดูแลสุขภาพ",
    cameraZones: ["โซนวารีบำบัด", "โซนฝึกความคล่องตัว", "โซนพักฟื้น", "เลานจ์ดูแลพิเศษ", "โซนฟื้นฟูวัยสูงวัย"],
    galleryImagePrefix: "ช่วงเวลาแห่งความสุข",
    galleryVideoPrefix: "คลิปกิจกรรม",
    userEmail: "ช่องทางอีเมลสำหรับรับการแจ้งเตือน",
    userAddress: "ซอยสุขุมวิท 39 เขตวัฒนา กรุงเทพมหานคร 10110",
    butlerStatus: {
      shiftName: "รอบเช้าทีมผู้ดูแล",
      butlerName: "อนันต์ ประเสริฐ",
      currentTask: "กำกับการวารีบำบัดบนลู่วิ่งใต้น้ำ",
    },
  },
  en: {
    ownerNames: [
      "Thanapon Jaidee",
      "Pimchanok Chaiyawat",
      "Kittipong Boonsri",
      "Siriporn Rattanakul",
      "Thanawat Lertchai",
      "Napatsorn Maneerat",
      "Chonlathorn Vongsa",
      "Waranya Phromdee",
      "Nopparat Sutham",
      "Ploypailin Keawmee",
      "Sarinya Chokchai",
      "Peeranat Intarak",
      "Supattra Kanjana",
      "Tanakrit Jindarat",
      "Kanyarat Arunrak",
      "Rachata Preecha",
      "Pimlada Thongchai",
      "Anurak Sombat",
      "Patcharapa Wongsa",
      "Kamonwan Yindee",
    ],
    petNames: [
      "Milo",
      "Coco",
      "BamBam",
      "Toffee",
      "Bao",
      "Luna",
      "Maple",
      "Mochi",
      "Nala",
      "Choco",
      "Biscuit",
      "Pudding",
      "Sundae",
      "Buddy",
      "Latte",
      "Snow",
      "Tiger",
      "Bean",
      "Muffin",
      "Sushi",
    ],
    breeds: [
      "French Bulldog",
      "Pomeranian",
      "Golden Retriever",
      "Shiba Inu",
      "Corgi",
      "Labrador",
      "Miniature Poodle",
      "Samoyed",
      "Bengal Cat",
      "Scottish Fold",
      "British Shorthair",
      "Siberian Husky",
      "Beagle",
      "Maine Coon",
      "Chihuahua",
    ],
    conditions: [
      "Joint stiffness",
      "Mild obesity",
      "Hip support care",
      "Post-surgery rehab",
      "Sensitive digestion",
      "Senior mobility care",
    ],
    allergies: ["Chicken protein", "Dust mites", "Seafood", "Pollen", "Dairy", "None"],
    butlerNotesPool: [
      "Maintained excellent effort level with stable breathing throughout the session.",
      "Responded very well to hydro therapy and recovered calmly afterwards.",
      "A short cooldown after incline treadmill work helped maintain balance.",
      "Great motivation and focus were observed across agility blocks.",
      "Recommend hydration support before evening movement routines.",
      "Recovery indicators were strong with a well-balanced heart-rate response.",
    ],
    servicesByCatalog: [
      {
        id: "svc-starter-fit",
        category: "Single Session",
        name: "Starter Fit",
        description: "Foundational mobility and conditioning for everyday vitality.",
        price: 1200,
      },
      {
        id: "svc-hydro-pro",
        category: "Single Session",
        name: "Hydro/Pro Fit",
        description: "Hydro treadmill and low-impact resistance training for strength.",
        price: 1800,
      },
      {
        id: "svc-day-trip",
        category: "Single Session",
        name: "Executive Day Trip",
        description: "Full-day wellness itinerary with dedicated butler support.",
        price: 2500,
      },
      {
        id: "svc-active-fit",
        category: "Membership",
        name: "Active Fit (Basic)",
        description: "Monthly plan for regular conditioning and activity tracking.",
        price: 8500,
      },
      {
        id: "svc-executive-care",
        category: "Membership",
        name: "Executive Care (Most Popular)",
        description: "Priority scheduling with enhanced wellness coverage.",
        price: 18500,
      },
      {
        id: "svc-ultimate-wellness",
        category: "Membership",
        name: "Ultimate Wellness (Highest Premium)",
        description: "Comprehensive concierge wellness with complete monitoring.",
        price: 28000,
      },
      {
        id: "svc-weight-loss-camp",
        category: "Special Program",
        name: "Weight Balance Intensive",
        description: "Targeted body-composition support (+2,000 THB package).",
        price: 2000,
      },
      {
        id: "svc-senior-rehab",
        category: "Special Program",
        name: "Senior Recovery Program",
        description: "Low-impact mobility and recovery support (+3,000 THB package).",
        price: 3000,
      },
    ],
    addOnsCatalog: [
      {
        id: "addon-pet-taxi",
        name: "Pet Butler Transfer",
        price: 380,
        description: "Door-to-door pickup and drop-off based on travel distance.",
      },
      {
        id: "addon-grooming",
        name: "Signature Grooming",
        price: 750,
        description: "Premium wash, dry and coat care session.",
      },
      {
        id: "addon-overnight",
        name: "Overnight Comfort Stay",
        price: 1500,
        description: "Comfort suite with attentive overnight supervision.",
      },
    ],
    paymentMethods: ["Visa Platinum", "Mastercard World", "Bank Transfer", "Mobile Banking"],
    monthLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dashboardDetails: [
      "completed hydro treadmill intervals successfully",
      "finished agility drills with focused performance",
      "received a full post-workout stretch routine",
      "met the daily movement target with confidence",
      "completed nutrition and weight review",
      "joined a senior-friendly mobility protocol",
    ],
    driverNames: [
      "Anan Prasert",
      "Natthaphon Wongchai",
      "Kanthee Sukcharoen",
      "Panya Jaidee",
      "Supachai Boonmee",
      "Rawit Phuwadol",
      "Itthipol Chuenjai",
      "Wachirawit Romyen",
      "Phurit Somboon",
      "Thanwa Charoenphon",
    ],
    vehicles: ["Luxury Butler Van", "Premium SUV", "Executive MPV"],
    cameraNamePrefix: "Wellness Camera",
    cameraZones: ["Hydro Therapy Lane", "Agility Studio", "Recovery Deck", "Premium Lounge", "Senior Rehab Zone"],
    galleryImagePrefix: "Wellness Moment",
    galleryVideoPrefix: "Training Clip",
    userEmail: "private notifications address",
    userAddress: "Sukhumvit 39, Watthana, Bangkok 10110",
    butlerStatus: {
      shiftName: "Morning Butler Shift",
      butlerName: "Anan Prasert",
      currentTask: "Overseeing hydro treadmill routine",
    },
  },
};

const membershipOptions = ["Active Fit", "Executive Care", "Ultimate Wellness"] as const;

const rideStatusFlow: RideStatus[] = [
  "BUTLER_ON_THE_WAY",
  "PET_PICKED_UP",
  "ARRIVED_AT_STUDIO",
  "WORKOUT_IN_PROGRESS",
  "HEADING_HOME",
  "ARRIVED_HOME",
];

const ownerCoordinates = {
  lat: 13.7563,
  lng: 100.5018,
};

const rand = (min: number, max: number) =>
  faker.number.float({ min, max, fractionDigits: 2 });

const randomCoordinate = (base: Coordinates): Coordinates => ({
  lat: Number((base.lat + rand(-0.08, 0.08)).toFixed(5)),
  lng: Number((base.lng + rand(-0.09, 0.09)).toFixed(5)),
});

function buildMockData(locale: AppLocale): MockDataBundle {
  faker.seed(20260301);
  const dictionary = localizedDictionary[locale];

  const pets: Pet[] = Array.from({ length: 15 }, (_, index) => {
    const ownerName = dictionary.ownerNames[index % dictionary.ownerNames.length] ?? dictionary.ownerNames[0]!;
    const baseWeight = faker.number.float({ min: 4.2, max: 33.4, fractionDigits: 1 });
    const petId = `pet-${index + 1}`;

    const weightHistory = dictionary.monthLabels.map((month, monthIndex) => {
      const progression =
        (monthIndex - 5) *
        faker.number.float({ min: 0.05, max: 0.2, fractionDigits: 2 });
      return {
        month,
        weightKg: Number((baseWeight + progression).toFixed(1)),
      };
    });

    const activityHistory = Array.from({ length: 20 }, (_, activityIndex) => ({
      id: `${petId}-activity-${activityIndex + 1}`,
      date: faker.date.recent({ days: 35 }).toISOString(),
      category: faker.helpers.arrayElement(["Walk", "Swim", "Treadmill", "Agility", "Rehab"] as const),
      durationMin: faker.number.int({ min: 20, max: 85 }),
      distanceKm: Number(
        faker.number.float({ min: 0.8, max: 6.5, fractionDigits: 2 }).toFixed(2),
      ),
      calories: faker.number.int({ min: 120, max: 650 }),
    }));

    return {
      id: petId,
      name: dictionary.petNames[index % dictionary.petNames.length] ?? dictionary.petNames[0]!,
      breed: dictionary.breeds[index % dictionary.breeds.length] ?? dictionary.breeds[0]!,
      age: faker.number.int({ min: 1, max: 13 }),
      ownerName,
      gender: faker.helpers.arrayElement(["Male", "Female"] as const),
      currentWeightKg: weightHistory[weightHistory.length - 1]?.weightKg ?? baseWeight,
      medicalConditions: faker.helpers.arrayElements(dictionary.conditions, {
        min: 1,
        max: 2,
      }),
      allergies: faker.helpers.arrayElements(dictionary.allergies, {
        min: 1,
        max: 2,
      }),
      weightHistory,
      activityHistory,
    };
  });

  const createBookingRecord = (index: number): BookingRecord => {
    const service = faker.helpers.arrayElement(dictionary.servicesByCatalog);
    const pet = faker.helpers.arrayElement(pets);
    const pickedAddons = faker.helpers.arrayElements(dictionary.addOnsCatalog, {
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

  const bookingRecords: BookingRecord[] = Array.from({ length: 20 }, (_, index) =>
    createBookingRecord(index),
  );

  const upcomingBookings = bookingRecords
    .filter((record) => record.status === "Scheduled")
    .sort((a, b) => +new Date(a.date) - +new Date(b.date))
    .slice(0, 10);

  const dashboardActivities: DashboardActivity[] = Array.from(
    { length: 20 },
    (_, index) => {
      const pet = faker.helpers.arrayElement(pets);
      const detail = faker.helpers.arrayElement(dictionary.dashboardDetails);

      return {
        id: `dashboard-activity-${index + 1}`,
        petName: pet.name,
        summary: `${pet.name} ${detail}`,
        timestamp: faker.date.recent({ days: 7 }).toISOString(),
      };
    },
  );

  const dailyActivitySeries = Array.from({ length: 7 }, (_, index) => ({
    day: dictionary.weekLabels[index] ?? dictionary.weekLabels[0]!,
    calories: faker.number.int({ min: 190, max: 690 }),
    distanceKm: Number(faker.number.float({ min: 1.8, max: 6.8, fractionDigits: 2 }).toFixed(2)),
  }));

  const membershipStatus: MembershipStatus = {
    tier: faker.helpers.arrayElement(membershipOptions),
    startedAt: faker.date.past({ years: 1 }).toISOString(),
    expiresAt: faker.date.future({ years: 1 }).toISOString(),
    visitsRemaining: faker.number.int({ min: 8, max: 30 }),
    conciergeContact: "+66 81 889 1122",
  };

  const currentUserProfile: OwnerProfile = {
    id: "owner-1",
    name: dictionary.ownerNames[0]!,
    phone: "+66 89 246 3587",
    email: dictionary.userEmail,
    address: dictionary.userAddress,
    coordinates: ownerCoordinates,
    membershipType: membershipStatus.tier,
    paymentMethod: faker.helpers.arrayElement(dictionary.paymentMethods),
    bookingHistory: bookingRecords,
    photoUrl: "https://i.pravatar.cc/300?img=33",
  };

  const healthDashboardSeries = {
    weightByMonth: dictionary.monthLabels.map((month) => ({
      month,
      avgWeightKg: Number(
        faker.number.float({ min: 8.4, max: 21.6, fractionDigits: 2 }).toFixed(1),
      ),
    })),
    activityByDay: Array.from({ length: 30 }, (_, index) => ({
      day: `${index + 1}`,
      activityScore: faker.number.int({ min: 55, max: 100 }),
      calories: faker.number.int({ min: 200, max: 720 }),
    })),
    caloriesByMonth: dictionary.monthLabels.map((month) => ({
      month,
      calories: faker.number.int({ min: 5200, max: 13800 }),
    })),
  };

  const rides: RideRecord[] = Array.from({ length: 10 }, (_, index) => {
    const activeStage = faker.number.int({ min: 0, max: rideStatusFlow.length - 1 });
    const pickup = randomCoordinate({ lat: 13.7563, lng: 100.5018 });
    const studio = randomCoordinate({ lat: 13.7396, lng: 100.5626 });
    const pet = pets[index % pets.length]!;

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
        name:
          dictionary.driverNames[index % dictionary.driverNames.length] ??
          dictionary.driverNames[0]!,
        phone: `+66 8${faker.number.int({ min: 10_000_000, max: 99_999_999 })}`,
        vehicle:
          faker.helpers.arrayElement(dictionary.vehicles) ??
          dictionary.vehicles[0]!,
        rating: Number(faker.number.float({ min: 4.6, max: 5, fractionDigits: 1 }).toFixed(1)),
        photoUrl: `https://i.pravatar.cc/150?img=${index + 12}`,
      },
      etaMinutes: faker.number.int({ min: 4, max: 32 }),
      currentStatus: rideStatusFlow[activeStage] ?? "BUTLER_ON_THE_WAY",
      timeline,
      route: [
        pickup,
        randomCoordinate({
          lat: (pickup.lat + studio.lat) / 2,
          lng: (pickup.lng + studio.lng) / 2,
        }),
        studio,
      ],
    };
  });

  const cameraFeeds: CameraFeed[] = Array.from({ length: 5 }, (_, index) => ({
    id: `cam-${index + 1}`,
    name: `${dictionary.cameraNamePrefix} ${index + 1}`,
    zone:
      faker.helpers.arrayElement(dictionary.cameraZones) ??
      dictionary.cameraZones[0]!,
    isSecure: faker.datatype.boolean(0.85),
    viewers: faker.number.int({ min: 3, max: 42 }),
  }));

  const dailyReports: DailyFitReport[] = Array.from({ length: 20 }, (_, index) => {
    const pet = pets[index % pets.length]!;
    return {
      id: `fit-report-${index + 1}`,
      petId: pet.id,
      petName: pet.name,
      reportDate: faker.date.recent({ days: 22 }).toISOString(),
      caloriesBurned: faker.number.int({ min: 180, max: 760 }),
      distanceKm: Number(
        faker.number.float({ min: 1.4, max: 8.9, fractionDigits: 2 }).toFixed(2),
      ),
      swimTimeMin: faker.number.int({ min: 10, max: 45 }),
      workoutDurationMin: faker.number.int({ min: 35, max: 105 }),
      butlerNotes: faker.helpers.arrayElement(dictionary.butlerNotesPool),
      healthAlert: faker.helpers.arrayElement(["Normal", "Normal", "Watch", "Attention"]),
    };
  });

  const galleryAssets: GalleryAsset[] = [
    ...Array.from({ length: 20 }, (_, index) => ({
      id: `gallery-image-${index + 1}`,
      kind: "image" as const,
      title: `${dictionary.galleryImagePrefix} ${index + 1}`,
      capturedAt: faker.date.recent({ days: 30 }).toISOString(),
      sizeMb: Number(
        faker.number.float({ min: 1.4, max: 8.7, fractionDigits: 1 }).toFixed(1),
      ),
    })),
    ...Array.from({ length: 10 }, (_, index) => ({
      id: `gallery-video-${index + 1}`,
      kind: "video" as const,
      title: `${dictionary.galleryVideoPrefix} ${index + 1}`,
      capturedAt: faker.date.recent({ days: 30 }).toISOString(),
      sizeMb: Number(
        faker.number.float({ min: 9.5, max: 45.5, fractionDigits: 1 }).toFixed(1),
      ),
      durationSec: faker.number.int({ min: 24, max: 230 }),
    })),
  ];

  const butlerStatus = {
    isActive: true,
    shiftName: dictionary.butlerStatus.shiftName,
    butlerName: dictionary.butlerStatus.butlerName,
    currentTask: dictionary.butlerStatus.currentTask,
  };

  return {
    pets,
    bookingRecords,
    upcomingBookings,
    dashboardActivities,
    dailyActivitySeries,
    membershipStatus,
    currentUserProfile,
    healthDashboardSeries,
    rides,
    cameraFeeds,
    dailyReports,
    galleryAssets,
    services: dictionary.servicesByCatalog,
    addOns: dictionary.addOnsCatalog,
    butlerStatus,
  };
}

const localizedMockData: Record<AppLocale, MockDataBundle> = {
  th: buildMockData("th"),
  en: buildMockData("en"),
};

export const getMockData = (locale: AppLocale) => localizedMockData[locale];

const defaultData = localizedMockData.th;

export const pets = defaultData.pets;
export const bookingRecords = defaultData.bookingRecords;
export const upcomingBookings = defaultData.upcomingBookings;
export const dashboardActivities = defaultData.dashboardActivities;
export const dailyActivitySeries = defaultData.dailyActivitySeries;
export const membershipStatus = defaultData.membershipStatus;
export const currentUserProfile = defaultData.currentUserProfile;
export const healthDashboardSeries = defaultData.healthDashboardSeries;
export const rides = defaultData.rides;
export const cameraFeeds = defaultData.cameraFeeds;
export const dailyReports = defaultData.dailyReports;
export const galleryAssets = defaultData.galleryAssets;
export const services = defaultData.services;
export const addOns = defaultData.addOns;
export const butlerStatus = defaultData.butlerStatus;
