export type MembershipType = "Active Fit" | "Executive Care" | "Ultimate Wellness";
export type BookingType = "Single Session" | "Membership" | "Special Program";
export type TimeSlot = "Morning" | "Afternoon";
export type RideStatus =
  | "BUTLER_ON_THE_WAY"
  | "PET_PICKED_UP"
  | "ARRIVED_AT_STUDIO"
  | "WORKOUT_IN_PROGRESS"
  | "HEADING_HOME"
  | "ARRIVED_HOME";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface WeightEntry {
  month: string;
  weightKg: number;
}

export interface ActivityEntry {
  id: string;
  date: string;
  category: "Walk" | "Swim" | "Treadmill" | "Agility" | "Rehab";
  durationMin: number;
  distanceKm: number;
  calories: number;
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  ownerName: string;
  gender: "Male" | "Female";
  currentWeightKg: number;
  medicalConditions: string[];
  allergies: string[];
  weightHistory: WeightEntry[];
  activityHistory: ActivityEntry[];
}

export interface MembershipStatus {
  tier: MembershipType;
  startedAt: string;
  expiresAt: string;
  visitsRemaining: number;
  conciergeContact: string;
}

export interface BookingService {
  id: string;
  category: BookingType;
  name: string;
  description: string;
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingRecord {
  id: string;
  petId: string;
  petName: string;
  ownerName: string;
  serviceName: string;
  serviceCategory: BookingType;
  date: string;
  timeSlot: TimeSlot;
  addOns: string[];
  totalPrice: number;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
}

export interface OwnerProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  coordinates: Coordinates;
  membershipType: MembershipType;
  paymentMethod: string;
  bookingHistory: BookingRecord[];
  /** Optional profile picture URL (e.g. pravatar, upload). */
  photoUrl?: string;
}

export interface ButlerDriver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  photoUrl: string;
}

export interface RideStatusPoint {
  status: RideStatus;
  completed: boolean;
  active: boolean;
  timestamp: string;
}

export interface RideRecord {
  id: string;
  petName: string;
  ownerName: string;
  driver: ButlerDriver;
  etaMinutes: number;
  currentStatus: RideStatus;
  timeline: RideStatusPoint[];
  route: Coordinates[];
}

export interface CameraFeed {
  id: string;
  name: string;
  zone: string;
  isSecure: boolean;
  viewers: number;
}

export interface DailyFitReport {
  id: string;
  petId: string;
  petName: string;
  reportDate: string;
  caloriesBurned: number;
  distanceKm: number;
  swimTimeMin: number;
  workoutDurationMin: number;
  butlerNotes: string;
  healthAlert: "Normal" | "Watch" | "Attention";
}

export interface GalleryAsset {
  id: string;
  kind: "image" | "video";
  title: string;
  capturedAt: string;
  sizeMb: number;
  durationSec?: number;
}

export interface DashboardActivity {
  id: string;
  petName: string;
  summary: string;
  timestamp: string;
}
