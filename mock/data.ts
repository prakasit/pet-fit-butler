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
  "Nattaporn Srisuk",
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
];

const petNames = [
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
];

const breeds = [
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
];

const conditions = [
  "Joint stiffness",
  "Mild obesity",
  "Hip support program",
  "Post-surgery rehab",
  "Sensitive digestion",
  "Senior mobility care",
];

const allergies = [
  "Chicken protein",
  "Dust mites",
  "Seafood",
  "Pollen",
  "Dairy",
  "None",
];

const butlerNotesPool = [
  "Maintained ideal effort level with stable breathing.",
  "Responded very well to hydro workout session.",
  "Needed a short cool-down after treadmill incline block.",
  "Great motivation and focus throughout agility circuits.",
  "Recommend hydration check before evening walk.",
  "Strong recovery metrics and balanced heart-rate response.",
];

const servicesByCatalog: BookingService[] = [
  {
    id: "svc-starter-fit",
    category: "Single Session",
    name: "Starter Fit",
    description: "Entry-level conditioning and mobility workout.",
    price: 1200,
  },
  {
    id: "svc-hydro-pro",
    category: "Single Session",
    name: "Hydro/Pro Fit",
    description: "Hydro treadmill and resistance program.",
    price: 1800,
  },
  {
    id: "svc-day-trip",
    category: "Single Session",
    name: "Executive Day Trip",
    description: "Full-day premium wellness routine with butler support.",
    price: 2500,
  },
  {
    id: "svc-active-fit",
    category: "Membership",
    name: "Active Fit",
    description: "Monthly plan for routine conditioning and activity tracking.",
    price: 8500,
  },
  {
    id: "svc-executive-care",
    category: "Membership",
    name: "Executive Care",
    description: "Priority scheduling and enhanced wellness coverage.",
    price: 18500,
  },
  {
    id: "svc-ultimate-wellness",
    category: "Membership",
    name: "Ultimate Wellness",
    description: "Comprehensive concierge wellness with full monitoring.",
    price: 28000,
  },
  {
    id: "svc-weight-loss-camp",
    category: "Special Program",
    name: "Weight Loss Camp",
    description: "Targeted body-composition intensive (+2000 package).",
    price: 2000,
  },
  {
    id: "svc-senior-rehab",
    category: "Special Program",
    name: "Senior Rehab",
    description: "Low-impact mobility and recovery plan (+3000 package).",
    price: 3000,
  },
];

const addOnsCatalog: AddOn[] = [
  {
    id: "addon-pet-taxi",
    name: "Pet Taxi",
    price: 380,
    description: "Distance-based butler pickup and drop-off (mock pricing).",
  },
  {
    id: "addon-grooming",
    name: "Grooming",
    price: 750,
    description: "Premium wash, dry, and coat care.",
  },
  {
    id: "addon-overnight",
    name: "Overnight Stay",
    price: 1500,
    description: "Comfort suite with overnight supervision.",
  },
];

const membershipOptions = ["Active Fit", "Executive Care", "Ultimate Wellness"] as const;
const paymentMethods = [
  "Visa Platinum",
  "Mastercard World",
  "Bank Transfer",
  "PromptPay",
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
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
      "completed hydro treadmill interval",
      "finished agility circuit with premium coach",
      "received post-workout stretching session",
      "hit daily movement target",
      "completed nutrition-weight check",
      "joined senior mobility protocol",
    ]);

    return {
      id: `dashboard-activity-${index + 1}`,
      petName: pet.name,
      summary: `${pet.name} ${detail}.`,
      timestamp: faker.date.recent({ days: 7 }).toISOString(),
    };
  },
);

export const dailyActivitySeries = Array.from({ length: 7 }, (_, index) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
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
  email: "nattaporn.srisuk@example.com",
  address: "Sukhumvit 39, Watthana, Bangkok 10110",
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
      name: faker.person.fullName(),
      phone: `+66 8${faker.number.int({ min: 10_000_000, max: 99_999_999 })}`,
      vehicle: faker.helpers.arrayElement(["Luxury Van", "Premium SUV", "Executive MPV"]),
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
  name: `Wellness Cam ${index + 1}`,
  zone: faker.helpers.arrayElement([
    "Hydro Lane",
    "Agility Zone",
    "Recovery Deck",
    "Premium Lounge",
    "Senior Rehab Area",
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
    title: `Wellness Moment ${index + 1}`,
    capturedAt: faker.date.recent({ days: 30 }).toISOString(),
    sizeMb: Number(faker.number.float({ min: 1.4, max: 8.7, fractionDigits: 1 }).toFixed(1)),
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `gallery-video-${index + 1}`,
    kind: "video" as const,
    title: `Training Clip ${index + 1}`,
    capturedAt: faker.date.recent({ days: 30 }).toISOString(),
    sizeMb: Number(faker.number.float({ min: 9.5, max: 45.5, fractionDigits: 1 }).toFixed(1)),
    durationSec: faker.number.int({ min: 24, max: 230 }),
  })),
];

export const services = servicesByCatalog;
export const addOns = addOnsCatalog;

export const butlerStatus = {
  isActive: true,
  shiftName: "Morning Butler Shift",
  butlerName: "Anan Prasert",
  currentTask: "Hydro treadmill supervision",
};
