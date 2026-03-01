"use client";

import { create } from "zustand";

import type { AddOn, BookingService, TimeSlot } from "@/lib/types";

interface BookingSelectionState {
  step: number;
  service: BookingService | null;
  date: string | null;
  timeSlot: TimeSlot | null;
  addOns: AddOn[];
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  setService: (service: BookingService) => void;
  setDate: (date: string) => void;
  setTimeSlot: (timeSlot: TimeSlot) => void;
  toggleAddOn: (addOn: AddOn) => void;
  reset: () => void;
}

export const useBookingStore = create<BookingSelectionState>((set) => ({
  step: 1,
  service: null,
  date: null,
  timeSlot: null,
  addOns: [],
  setStep: (step) => set(() => ({ step: Math.min(5, Math.max(1, step)) })),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  previousStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  setService: (service) => set(() => ({ service })),
  setDate: (date) => set(() => ({ date })),
  setTimeSlot: (timeSlot) => set(() => ({ timeSlot })),
  toggleAddOn: (addOn) =>
    set((state) => {
      const exists = state.addOns.some((item) => item.id === addOn.id);
      return {
        addOns: exists
          ? state.addOns.filter((item) => item.id !== addOn.id)
          : [...state.addOns, addOn],
      };
    }),
  reset: () =>
    set(() => ({
      step: 1,
      service: null,
      date: null,
      timeSlot: null,
      addOns: [],
    })),
}));
