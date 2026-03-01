import type {
  ActivityEntry,
  BookingRecord,
  BookingType,
  DailyFitReport,
  MembershipType,
  RideStatus,
  TimeSlot,
} from "@/lib/types";

export const bookingTypeKey: Record<BookingType, string> = {
  "Single Session": "singleSession",
  Membership: "membership",
  "Special Program": "specialProgram",
};

export const membershipTypeKey: Record<MembershipType, string> = {
  "Active Fit": "activeFit",
  "Executive Care": "executiveCare",
  "Ultimate Wellness": "ultimateWellness",
};

export const timeSlotKey: Record<TimeSlot, string> = {
  Morning: "morning",
  Afternoon: "afternoon",
};

export const bookingStatusKey: Record<BookingRecord["status"], string> = {
  Scheduled: "scheduled",
  "In Progress": "inProgress",
  Completed: "completed",
  Cancelled: "cancelled",
};

export const rideStatusKey: Record<RideStatus, string> = {
  BUTLER_ON_THE_WAY: "BUTLER_ON_THE_WAY",
  PET_PICKED_UP: "PET_PICKED_UP",
  ARRIVED_AT_STUDIO: "ARRIVED_AT_STUDIO",
  WORKOUT_IN_PROGRESS: "WORKOUT_IN_PROGRESS",
  HEADING_HOME: "HEADING_HOME",
  ARRIVED_HOME: "ARRIVED_HOME",
};

export const healthAlertKey: Record<DailyFitReport["healthAlert"], string> = {
  Normal: "normal",
  Watch: "watch",
  Attention: "attention",
};

export const activityCategoryKey: Record<ActivityEntry["category"], string> = {
  Walk: "walk",
  Swim: "swim",
  Treadmill: "treadmill",
  Agility: "agility",
  Rehab: "rehab",
};

export const genderKey: Record<"Male" | "Female", string> = {
  Male: "male",
  Female: "female",
};
