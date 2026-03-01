"use client";

import { useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock3, Sparkles, X } from "lucide-react";

import { BookingCard } from "@/components/ui/BookingCard";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";
import { addOns, bookingRecords, services } from "@/mock";
import { useBookingStore } from "@/store/useBookingStore";

const steps = [
  "Select Service",
  "Select Date",
  "Select Time Slot",
  "Select Add-ons",
  "Payment Summary",
];

const availableDates = Array.from({ length: 10 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index + 1);
  return date.toISOString();
});

export default function BookingPage() {
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    step,
    service,
    date,
    timeSlot,
    addOns: selectedAddOns,
    nextStep,
    previousStep,
    setService,
    setDate,
    setTimeSlot,
    toggleAddOn,
    reset,
  } = useBookingStore();

  const groupedServices = useMemo(
    () =>
      services.reduce<Record<string, typeof services>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category]?.push(item);
        return acc;
      }, {}),
    [],
  );

  const canProceed = useMemo(() => {
    if (step === 1) return Boolean(service);
    if (step === 2) return Boolean(date);
    if (step === 3) return Boolean(timeSlot);
    if (step === 4) return true;
    return true;
  }, [step, service, date, timeSlot]);

  const subtotal = service?.price ?? 0;
  const addOnTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0);
  const tax = Math.round((subtotal + addOnTotal) * 0.07);
  const grandTotal = subtotal + addOnTotal + tax;

  const proceed = () => {
    if (!canProceed) return;
    if (step === 5) return;
    nextStep();
  };

  const confirmBooking = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      reset();
      setIsConfirmed(false);
    }, 1700);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <p className="text-xs tracking-[0.2em] text-text-muted">BOOKING CONCIERGE</p>
        <h1 className="text-3xl text-brand-navy md:text-4xl">Booking System</h1>
      </header>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <PremiumCard title="Session Flow" subtitle={`Step ${step} of 5`}>
            <div className="mb-4 grid gap-2 sm:grid-cols-5">
              {steps.map((label, index) => (
                <div
                  key={label}
                  className={`rounded-xl p-2 text-center text-xs font-medium ${
                    step === index + 1
                      ? "bg-brand-navy text-soft-cream"
                      : step > index + 1
                        ? "bg-sage/25 text-brand-navy"
                        : "bg-soft-cream text-text-muted"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                {Object.entries(groupedServices).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <p className="text-sm font-semibold text-brand-navy">{category}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setService(item)}
                          className={`rounded-xl border p-4 text-left transition ${
                            service?.id === item.id
                              ? "border-brand-navy bg-brand-navy text-soft-cream"
                              : "border-line-soft bg-soft-cream text-brand-navy hover:-translate-y-0.5"
                          }`}
                        >
                          <p className="font-semibold">{item.name}</p>
                          <p className="mt-1 text-xs opacity-80">{item.description}</p>
                          <p className="mt-2 text-sm font-bold">{formatCurrency(item.price)}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {availableDates.map((availableDate) => (
                  <button
                    key={availableDate}
                    type="button"
                    onClick={() => setDate(availableDate)}
                    className={`rounded-xl border p-3 text-left transition ${
                      date === availableDate
                        ? "border-brand-navy bg-brand-navy text-soft-cream"
                        : "border-line-soft bg-soft-cream hover:-translate-y-0.5"
                    }`}
                  >
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      {formatDate(availableDate)}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {(["Morning", "Afternoon"] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`rounded-xl border p-4 text-left transition ${
                      timeSlot === slot
                        ? "border-brand-navy bg-brand-navy text-soft-cream"
                        : "border-line-soft bg-soft-cream hover:-translate-y-0.5"
                    }`}
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold">
                      <Clock3 className="h-4 w-4" />
                      {slot}
                    </p>
                    <p className="mt-1 text-xs opacity-80">
                      {slot === "Morning" ? "08:00 - 12:00" : "13:00 - 18:00"}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-xl bg-soft-cream p-4">
                  <p className="text-sm text-text-muted">
                    Add-on services are optional and can be changed before confirmation.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedAddOns.length > 0 ? (
                      selectedAddOns.map((addon) => (
                        <StatusBadge key={addon.id} label={`${addon.name} (${formatCurrency(addon.price)})`} />
                      ))
                    ) : (
                      <StatusBadge label="No add-ons selected" tone="neutral" />
                    )}
                  </div>
                </div>
                <ElegantButton type="button" variant="secondary" onClick={() => setIsAddOnModalOpen(true)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Open Add-on Selector
                </ElegantButton>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3 rounded-2xl bg-soft-cream p-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Service</span>
                  <span className="font-semibold text-brand-navy">{service?.name ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Date</span>
                  <span className="font-semibold text-brand-navy">{date ? formatDate(date) : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Time Slot</span>
                  <span className="font-semibold text-brand-navy">{timeSlot ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Add-ons</span>
                  <span className="font-semibold text-brand-navy">
                    {selectedAddOns.length > 0 ? selectedAddOns.map((addon) => addon.name).join(", ") : "None"}
                  </span>
                </div>
                <hr className="border-line-soft" />
                <div className="flex justify-between">
                  <span className="text-text-muted">Subtotal</span>
                  <span className="font-semibold text-brand-navy">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Add-ons</span>
                  <span className="font-semibold text-brand-navy">{formatCurrency(addOnTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">VAT 7%</span>
                  <span className="font-semibold text-brand-navy">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-brand-navy">Total</span>
                  <span className="font-bold text-brand-navy">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <ElegantButton type="button" variant="ghost" onClick={previousStep} disabled={step === 1}>
                Back
              </ElegantButton>
              {step < 5 ? (
                <ElegantButton type="button" onClick={proceed} disabled={!canProceed}>
                  Continue
                </ElegantButton>
              ) : (
                <ElegantButton type="button" onClick={confirmBooking}>
                  Confirm & Pay
                </ElegantButton>
              )}
              {isConfirmed && (
                <span className="inline-flex items-center gap-1 rounded-full bg-sage/25 px-3 py-2 text-xs font-semibold text-brand-navy">
                  <CheckCircle2 className="h-4 w-4" />
                  Booking Confirmed
                </span>
              )}
            </div>
          </PremiumCard>
        </div>

        <PremiumCard title="Upcoming Bookings" subtitle="20 generated records">
          <div className="space-y-3">
            {bookingRecords.slice(0, 5).map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
          <p className="mt-3 text-xs text-text-muted">Showing 5 of 20 records.</p>
        </PremiumCard>
      </div>

      {isAddOnModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/45 p-4">
          <div className="animate-slide-up absolute right-0 bottom-0 left-0 rounded-t-3xl border border-line-soft bg-surface p-5 shadow-premium-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl text-brand-navy">Select Add-ons</h3>
              <button
                type="button"
                onClick={() => setIsAddOnModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-soft-cream text-text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {addOns.map((addon) => {
                const selected = selectedAddOns.some((item) => item.id === addon.id);
                return (
                  <button
                    type="button"
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`rounded-xl border p-3 text-left transition ${
                      selected
                        ? "border-brand-navy bg-brand-navy text-soft-cream"
                        : "border-line-soft bg-soft-cream text-brand-navy"
                    }`}
                  >
                    <p className="font-semibold">{addon.name}</p>
                    <p className="mt-1 text-xs opacity-80">{addon.description}</p>
                    <p className="mt-2 text-sm">{formatCurrency(addon.price)}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <ElegantButton type="button" onClick={() => setIsAddOnModalOpen(false)}>
                Save Add-ons
              </ElegantButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
