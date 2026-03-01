"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2, ChevronRight, Clock3, Sparkles, X } from "lucide-react";

import { BookingCard } from "@/components/ui/BookingCard";
import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";
import { addOns, bookingRecords, services } from "@/mock";
import { useBookingStore } from "@/store/useBookingStore";

const steps = [
  "Service",
  "Date",
  "Time",
  "Add-ons",
  "Summary",
];

const categoryTint: Record<string, string> = {
  "Single Session":
    "border-[#f4dece] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,215,196,0.42))]",
  Membership:
    "border-[#d3ece4] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(95,191,159,0.22))]",
  "Special Program":
    "border-[#d9ebf8] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(227,242,255,0.5))]",
};

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
    <div className="space-y-10">
      <PremiumCard
        title="Booking"
        subtitle={`Step ${step} of 5 · ${steps[step - 1]}`}
      >
        <div className="mb-8 flex gap-2 overflow-x-auto">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-[0.06em] ${
                step === index + 1
                  ? "bg-brand-navy text-soft-cream"
                  : step > index + 1
                    ? "bg-sage/30 text-brand-navy"
                    : "bg-soft-cream text-text-muted"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.26 }}
            className="min-h-[360px] space-y-4 md:min-h-[420px]"
          >
            {step === 1 && (
              <div className="space-y-6">
                {Object.entries(groupedServices).map(([category, items]) => (
                  <section key={category} className="space-y-3">
                    <p className="text-xs font-semibold tracking-[0.08em] text-text-muted">
                      {category.toUpperCase()}
                    </p>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setService(item)}
                          className={`w-full rounded-2xl border p-8 text-left transition duration-300 ${
                            service?.id === item.id
                              ? "border-brand-navy bg-brand-navy text-soft-cream shadow-xl shadow-brand-navy/25"
                              : `${categoryTint[category] ?? "border-line-soft bg-soft-cream"} text-brand-navy shadow-xl shadow-brand-navy/8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl hover:shadow-brand-navy/12`
                          }`}
                        >
                          <h3 className="text-[1.65rem] leading-tight">{item.name}</h3>
                          <p
                            className={`mt-2 text-sm ${
                              service?.id === item.id ? "text-soft-cream/85" : "text-text-muted"
                            }`}
                          >
                            {item.description}
                          </p>
                          <div
                            className={`mt-5 h-px w-full ${
                              service?.id === item.id ? "bg-soft-cream/24" : "bg-brand-navy/12"
                            }`}
                          />
                          <p className="mt-5 text-3xl leading-none font-semibold">
                            {formatCurrency(item.price)}
                          </p>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-3">
                {availableDates.map((availableDate) => (
                  <button
                    key={availableDate}
                    type="button"
                    onClick={() => setDate(availableDate)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                      date === availableDate
                        ? "border-brand-navy bg-brand-navy text-soft-cream"
                        : "border-line-soft bg-soft-cream text-brand-navy"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Calendar className="h-4 w-4" />
                      {formatDate(availableDate)}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-3">
                {(["Morning", "Afternoon"] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      timeSlot === slot
                        ? "border-brand-navy bg-brand-navy text-soft-cream"
                        : "border-line-soft bg-soft-cream text-brand-navy"
                    }`}
                  >
                    <p className="flex items-center gap-2 text-base font-semibold">
                      <Clock3 className="h-4 w-4" />
                      {slot}
                    </p>
                    <p className="mt-1 text-sm opacity-80">
                      {slot === "Morning" ? "08:00 - 12:00" : "13:00 - 18:00"}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="rounded-2xl bg-soft-cream p-5">
                  <p className="text-sm text-text-muted">
                    Add-ons are optional and can be adjusted before final confirmation.
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
                <ElegantButton type="button" variant="secondary" fullWidth onClick={() => setIsAddOnModalOpen(true)}>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Choose Add-ons
                </ElegantButton>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-3 rounded-2xl bg-soft-cream p-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-muted">Service</span>
                  <span className="font-semibold text-brand-navy">{service?.name ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Date</span>
                  <span className="font-semibold text-brand-navy">{date ? formatDate(date) : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Time</span>
                  <span className="font-semibold text-brand-navy">{timeSlot ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Add-ons</span>
                  <span className="max-w-[60%] text-right font-semibold text-brand-navy">
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
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center gap-2">
          <ElegantButton type="button" variant="ghost" onClick={previousStep} disabled={step === 1}>
            Back
          </ElegantButton>
          {step < 5 ? (
            <ElegantButton type="button" onClick={proceed} disabled={!canProceed} fullWidth>
              Continue
            </ElegantButton>
          ) : (
            <ElegantButton type="button" onClick={confirmBooking} fullWidth>
              Confirm & Pay
            </ElegantButton>
          )}
        </div>
        {isConfirmed && (
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-sage/25 px-3 py-2 text-xs font-semibold text-brand-navy">
            <CheckCircle2 className="h-4 w-4" />
            Booking Confirmed
          </div>
        )}
      </PremiumCard>

      <PremiumCard title="Upcoming Sessions" subtitle="Elegant booking overview">
        <div className="space-y-3">
          {bookingRecords.slice(0, 3).map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </PremiumCard>

      {isAddOnModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/45 p-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 bottom-0 left-0 rounded-t-[28px] border border-line-soft bg-surface p-6 shadow-premium-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl text-brand-navy">Select Add-ons</h3>
              <button
                type="button"
                onClick={() => setIsAddOnModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full bg-soft-cream text-text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {addOns.map((addon) => {
                const selected = selectedAddOns.some((item) => item.id === addon.id);
                return (
                  <button
                    type="button"
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
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

            <div className="mt-5">
              <ElegantButton type="button" fullWidth onClick={() => setIsAddOnModalOpen(false)}>
                Save Add-ons
              </ElegantButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
