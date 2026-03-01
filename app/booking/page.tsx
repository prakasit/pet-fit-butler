"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Cat, CheckCircle2, ChevronRight, Clock3, Dog, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/format";
import { bookingTypeKey, timeSlotKey } from "@/lib/translation-keys";
import { useMockData } from "@/mock/useMockData";
import { useBookingStore } from "@/store/useBookingStore";

const categoryTint: Record<string, string> = {
  "Single Session":
    "border-beige bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(217,160,102,0.2))]",
  Membership:
    "border-sage bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(110,158,143,0.2))]",
  "Special Program":
    "border-line-soft bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(244,230,214,0.9))]",
};

const availableDates = Array.from({ length: 10 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index + 1);
  return date.toISOString();
});

export default function BookingPage() {
  const locale = useLocale();
  const tBooking = useTranslations("booking");
  const tBookingType = useTranslations("bookingType");
  const tTimeSlot = useTranslations("timeSlot");
  const tLabels = useTranslations("labels");
  const tCta = useTranslations("cta");
  const tCommon = useTranslations("common");
  const { addOns, services } = useMockData();

  const steps = [
    tBooking("steps.selectProgram"),
    tBooking("steps.selectDate"),
    tBooking("steps.selectTime"),
    tBooking("steps.selectAddons"),
    tBooking("steps.summaryAndPayment"),
  ];

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

  const activeService = service ? services.find((item) => item.id === service.id) ?? service : null;
  const activeAddOns = selectedAddOns.map((selected) => addOns.find((item) => item.id === selected.id) ?? selected);

  const groupedServices = useMemo(
    () =>
      services.reduce<Record<string, typeof services>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category]?.push(item);
        return acc;
      }, {}),
    [services],
  );

  const canProceed = useMemo(() => {
    if (step === 1) return Boolean(activeService);
    if (step === 2) return Boolean(date);
    if (step === 3) return Boolean(timeSlot);
    if (step === 4) return true;
    return true;
  }, [step, activeService, date, timeSlot]);

  const subtotal = activeService?.price ?? 0;
  const addOnTotal = activeAddOns.reduce((sum, addon) => sum + addon.price, 0);
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

  const stepIndicator = (
    <nav aria-label={tBooking("stepsAriaLabel")} className="w-full">
      <div className="flex items-center justify-between gap-0 overflow-x-auto pb-2">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;
          const isUpcoming = step < stepNumber;
          return (
            <div key={label} className="flex min-w-0 flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <div
                  className={`h-0.5 flex-1 min-w-0 ${
                    index > 0 ? (isCompleted ? "bg-sage" : "bg-line-soft") : "bg-transparent"
                  }`}
                />
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isActive
                      ? "bg-sage text-white ring-4 ring-sage/30"
                      : isCompleted
                        ? "bg-sage/90 text-white"
                        : "bg-soft-cream text-text-muted"
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : stepNumber}
                </div>
                <div
                  className={`h-0.5 flex-1 min-w-0 ${
                    index < steps.length - 1
                      ? step > stepNumber + 1
                        ? "bg-sage"
                        : "bg-line-soft"
                      : "bg-transparent"
                  }`}
                />
              </div>
              <p
                className={`mt-2 w-full text-center text-[10px] font-medium sm:text-xs ${
                  isActive ? "text-brand-navy" : isCompleted ? "text-sage" : "text-text-muted"
                }`}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </nav>
  );

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-line-soft/70 bg-surface/95 px-4 py-6 shadow-premium-sm sm:px-6">
        <p className="mb-4 text-center text-sm text-text-muted">
          {tBooking("stepLabel", { current: step, name: steps[step - 1] })}
        </p>
        {stepIndicator}
      </div>

      <div className="space-y-10">
        <PremiumCard title={tBooking("title")} subtitle={tBooking("bookingFormSubtitle")}>
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
                        {tBookingType(bookingTypeKey[category as keyof typeof bookingTypeKey])}
                      </p>
                      <div className="space-y-4">
                        {items.map((item, itemIndex) => {
                          const PetIcon = itemIndex % 2 === 0 ? Dog : Cat;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setService(item)}
                              className={`flex w-full items-stretch gap-5 rounded-2xl border p-8 text-left transition duration-300 ${
                                activeService?.id === item.id
                                  ? "border-sage bg-sage text-surface shadow-premium"
                                  : `${categoryTint[category] ?? "border-line-soft bg-soft-cream"} text-brand-navy shadow-premium-sm hover:-translate-y-1 hover:scale-[1.01] hover:shadow-premium`
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <h3 className="text-[1.65rem] leading-tight">{item.name}</h3>
                                <p
                                  className={`mt-2 text-sm ${
                                    activeService?.id === item.id ? "text-surface/85" : "text-text-muted"
                                  }`}
                                >
                                  {item.description}
                                </p>
                                <div
                                  className={`mt-5 h-px w-full ${
                                    activeService?.id === item.id ? "bg-surface/24" : "bg-line-soft"
                                  }`}
                                />
                                <p className="mt-5 text-3xl leading-none font-semibold">
                                  {formatCurrency(item.price, locale)}
                                </p>
                              </div>
                              <div
                                className={`flex shrink-0 items-center justify-center rounded-2xl p-4 ${
                                  activeService?.id === item.id
                                    ? "bg-surface/20"
                                    : "bg-brand-navy/8"
                                }`}
                              >
                                <PetIcon
                                  className={`h-14 w-14 sm:h-16 sm:w-16 ${
                                    activeService?.id === item.id ? "text-surface/90" : "text-sage"
                                  }`}
                                  strokeWidth={1.5}
                                />
                              </div>
                            </button>
                          );
                        })}
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
                          ? "border-sage bg-sage text-surface"
                          : "border-line-soft bg-soft-cream text-brand-navy"
                      }`}
                    >
                      <span className="inline-flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4" />
                        {formatDate(availableDate, locale)}
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
                          ? "border-sage bg-sage text-surface"
                          : "border-line-soft bg-soft-cream text-brand-navy"
                      }`}
                    >
                      <p className="flex items-center gap-2 text-base font-semibold">
                        <Clock3 className="h-4 w-4" />
                        {tTimeSlot(timeSlotKey[slot])}
                      </p>
                      <p className="mt-1 text-sm opacity-80">
                        {slot === "Morning" ? tTimeSlot("morningRange") : tTimeSlot("afternoonRange")}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-sm text-text-muted">{tBooking("addOnDescription")}</p>
                  <div className="space-y-2">
                    {addOns.map((addon) => {
                      const selected = activeAddOns.some((item) => item.id === addon.id);
                      return (
                        <button
                          type="button"
                          key={addon.id}
                          onClick={() => toggleAddOn(addon)}
                          className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-sage bg-sage text-surface"
                              : "border-line-soft bg-soft-cream text-brand-navy"
                          }`}
                        >
                          <div>
                            <p className="font-semibold">{addon.name}</p>
                            <p className={`mt-1 text-sm ${selected ? "text-surface/90" : "text-text-muted"}`}>
                              {addon.description}
                            </p>
                            <p className="mt-2 text-sm font-medium">{formatCurrency(addon.price, locale)}</p>
                          </div>
                          {selected && <Sparkles className="h-5 w-5 shrink-0 text-surface/90" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-3 rounded-2xl bg-soft-cream p-5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("service")}</span>
                    <span className="font-semibold text-brand-navy">{activeService?.name ?? "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("date")}</span>
                    <span className="font-semibold text-brand-navy">{date ? formatDate(date, locale) : "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("time")}</span>
                    <span className="font-semibold text-brand-navy">
                      {timeSlot ? tTimeSlot(timeSlotKey[timeSlot]) : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("addons")}</span>
                    <span className="max-w-[60%] text-right font-semibold text-brand-navy">
                      {activeAddOns.length > 0
                        ? activeAddOns.map((addon) => addon.name).join(", ")
                        : tCommon("none")}
                    </span>
                  </div>
                  <hr className="border-line-soft" />
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("subtotal")}</span>
                    <span className="font-semibold text-brand-navy">{formatCurrency(subtotal, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("addons")}</span>
                    <span className="font-semibold text-brand-navy">{formatCurrency(addOnTotal, locale)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">{tLabels("tax")}</span>
                    <span className="font-semibold text-brand-navy">{formatCurrency(tax, locale)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="font-semibold text-brand-navy">{tLabels("total")}</span>
                    <span className="font-bold text-brand-navy">{formatCurrency(grandTotal, locale)}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex items-center gap-2">
            <ElegantButton
              type="button"
              variant="ghost"
              onClick={previousStep}
              disabled={step === 1}
              className="min-w-[7.5rem] shrink-0 whitespace-nowrap"
            >
              {tCta("back")}
            </ElegantButton>
            {step < 5 ? (
              <ElegantButton type="button" onClick={proceed} disabled={!canProceed} fullWidth>
                {tCta("continue")}
              </ElegantButton>
            ) : (
              <ElegantButton type="button" onClick={confirmBooking} fullWidth>
                {tCta("confirmAndPay")}
              </ElegantButton>
            )}
          </div>
          {isConfirmed && (
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-sage/25 px-3 py-2 text-xs font-semibold text-brand-navy">
              <CheckCircle2 className="h-4 w-4" />
              {tBooking("confirmed")}
            </div>
          )}
        </PremiumCard>
      </div>

      {isAddOnModalOpen && (
        <div className="fixed inset-0 z-50 bg-brand-navy/20 p-4 lg:hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 bottom-0 left-0 rounded-t-[28px] border border-line-soft bg-surface p-6 shadow-premium-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl text-brand-navy">{tBooking("chooseAddons")}</h3>
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
                const selected = activeAddOns.some((item) => item.id === addon.id);
                return (
                  <button
                    type="button"
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      selected
                        ? "border-sage bg-sage text-surface"
                        : "border-line-soft bg-soft-cream text-brand-navy"
                    }`}
                  >
                    <p className="font-semibold">{addon.name}</p>
                    <p className="mt-1 text-xs opacity-80">{addon.description}</p>
                    <p className="mt-2 text-sm">{formatCurrency(addon.price, locale)}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-5">
              <ElegantButton type="button" fullWidth onClick={() => setIsAddOnModalOpen(false)}>
                {tBooking("saveAddons")}
              </ElegantButton>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
