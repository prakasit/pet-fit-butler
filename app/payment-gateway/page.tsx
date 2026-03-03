"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  Landmark,
  QrCode,
  Receipt,
  Upload,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ElegantButton } from "@/components/ui/ElegantButton";
import { PremiumCard } from "@/components/ui/PremiumCard";
import { formatCurrency } from "@/lib/format";
import { withLocalePrefix } from "@/lib/i18n";
import { useMockData } from "@/mock/useMockData";
import { useBookingStore } from "@/store/useBookingStore";
import { cn } from "@/lib/utils";

type PaymentMethod = "credit_card" | "qr" | "bank_transfer" | "installment";

function PaymentSpinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="44 132"
        fill="none"
        style={{
          transformOrigin: "32px 32px",
          animation: "loading-spin 1.8s ease-in-out infinite",
        }}
      />
    </svg>
  );
}

const MOCK_BANK_ACCOUNT = "123-4-56789-0";
const MOCK_INSTALLMENT_RATES: Record<number, number> = {
  3: 1.02,
  6: 1.04,
  10: 1.06,
};

export default function PaymentGatewayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = useLocale() as "th" | "en";
  const t = useTranslations("payment");
  const tLabels = useTranslations("labels");
  const { addOns: addOnsList } = useMockData();

  const bookingId = searchParams.get("bookingId") ?? "";
  const {
    service,
    date,
    timeSlot,
    addOns: selectedAddOns,
  } = useBookingStore();

  const activeAddOns = useMemo(
    () =>
      selectedAddOns.map(
        (selected) => addOnsList.find((a) => a.id === selected.id) ?? selected
      ),
    [selectedAddOns, addOnsList]
  );

  const subtotal = service?.price ?? 0;
  const addOnTotal = activeAddOns.reduce((sum, a) => sum + a.price, 0);
  const tax = Math.round((subtotal + addOnTotal) * 0.07);
  const grandTotal = subtotal + addOnTotal + tax;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 10>(3);
  const [recurringEnabled, setRecurringEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isMonthlyMembership = service?.category === "Membership";
  const installmentTotal = Math.round(
    (grandTotal * (MOCK_INSTALLMENT_RATES[installmentMonths] ?? 1)) / installmentMonths
  );
  const hasBookingData = Boolean(service);

  useEffect(() => {
    if (!bookingId) {
      router.replace(withLocalePrefix("/booking", locale));
    }
  }, [bookingId, locale, router]);

  if (!bookingId) {
    return null;
  }

  if (!hasBookingData) {
    return (
      <div className="mx-auto max-w-md">
        <PremiumCard title={t("title")} subtitle={t("subtitle")}>
          <p className="rounded-2xl bg-soft-cream p-5 text-center text-sm text-text-muted">
            {t("sessionExpired")}
          </p>
          <ElegantButton
            fullWidth
            onClick={() => router.push(withLocalePrefix("/booking", locale))}
            className="mt-4"
          >
            {t("backToBooking")}
          </ElegantButton>
        </PremiumCard>
      </div>
    );
  }

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      router.push(withLocalePrefix(`/thank-you?bookingId=${bookingId}`, locale));
    }, 2000);
  };

  const methodCards: { id: PaymentMethod; icon: React.ReactNode; label: string }[] = [
    { id: "credit_card", icon: <CreditCard className="h-5 w-5" />, label: t("creditCard") },
    { id: "qr", icon: <QrCode className="h-5 w-5" />, label: t("qrPayment") },
    { id: "bank_transfer", icon: <Landmark className="h-5 w-5" />, label: t("bankTransfer") },
    { id: "installment", icon: <Receipt className="h-5 w-5" />, label: t("installment") },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PremiumCard title={t("title")} subtitle={t("subtitle")}>
        <div className="space-y-6">
          {/* Payment method selection */}
          <div className="grid gap-3 sm:grid-cols-2">
            {methodCards.map(({ id, icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPaymentMethod(id)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border p-4 text-left transition duration-200",
                  paymentMethod === id
                    ? "border-sage bg-sage/15 text-brand-navy shadow-premium-sm ring-2 ring-sage/40"
                    : "border-line-soft bg-soft-cream text-brand-navy hover:border-sage/50 hover:bg-soft-cream/90"
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                    paymentMethod === id ? "bg-sage text-surface" : "bg-brand-navy/10 text-sage"
                  )}
                >
                  {icon}
                </span>
                <span className="font-semibold">{label}</span>
              </button>
            ))}
          </div>

          {/* Credit Card fields */}
          {paymentMethod === "credit_card" && (
            <div className="space-y-4 rounded-2xl border border-line-soft bg-soft-cream/60 p-5">
              <input
                type="text"
                placeholder={t("cardNumber")}
                className="w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-brand-navy placeholder:text-text-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t("expiryDate")}
                  className="w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-brand-navy placeholder:text-text-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
                <input
                  type="text"
                  placeholder={t("cvv")}
                  className="w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-brand-navy placeholder:text-text-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
                />
              </div>
              <input
                type="text"
                placeholder={t("nameOnCard")}
                className="w-full rounded-xl border border-line-soft bg-surface px-4 py-3 text-brand-navy placeholder:text-text-muted focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
              />
            </div>
          )}

          {/* QR Payment */}
          {paymentMethod === "qr" && (
            <div className="space-y-4 rounded-2xl border border-line-soft bg-soft-cream/60 p-5">
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl border-2 border-dashed border-sage/40 bg-surface">
                <QrCode className="h-24 w-24 text-sage/50" />
              </div>
              <ElegantButton variant="secondary" fullWidth>
                {t("confirmAfterPayment")}
              </ElegantButton>
            </div>
          )}

          {/* Bank Transfer */}
          {paymentMethod === "bank_transfer" && (
            <div className="space-y-4 rounded-2xl border border-line-soft bg-soft-cream/60 p-5">
              <p className="text-sm text-text-muted">{t("bankAccountNumber")}</p>
              <p className="rounded-xl bg-surface px-4 py-3 font-mono text-lg font-semibold text-brand-navy">
                {MOCK_BANK_ACCOUNT}
              </p>
              <div>
                <p className="mb-2 text-sm text-text-muted">{t("slipUpload")}</p>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-line-soft border-dashed bg-surface py-4 text-text-muted transition hover:border-sage/50 hover:bg-soft-cream/50"
                >
                  <Upload className="h-5 w-5" />
                  <span className="text-sm font-medium">{t("slipUpload")}</span>
                </button>
              </div>
              <ElegantButton variant="secondary" fullWidth>
                {t("confirm")}
              </ElegantButton>
            </div>
          )}

          {/* Installment */}
          {paymentMethod === "installment" && (
            <div className="space-y-4 rounded-2xl border border-line-soft bg-soft-cream/60 p-5">
              <p className="text-sm font-medium text-brand-navy">{t("installmentPeriod")}</p>
              <div className="flex gap-2">
                {([3, 6, 10] as const).map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setInstallmentMonths(months)}
                    className={cn(
                      "flex-1 rounded-xl border py-3 text-sm font-semibold transition",
                      installmentMonths === months
                        ? "border-sage bg-sage text-surface"
                        : "border-line-soft bg-surface text-brand-navy hover:border-sage/50"
                    )}
                  >
                    {t("months", { count: months })}
                  </button>
                ))}
              </div>
              <p className="text-sm text-text-muted">
                {t("monthlyAmount")}:{" "}
                <span className="font-semibold text-brand-navy">
                  {formatCurrency(installmentTotal, locale)}
                </span>
              </p>
            </div>
          )}

          {/* Recurring payment (Monthly Membership only) */}
          {isMonthlyMembership && (
            <div className="rounded-2xl border border-line-soft bg-soft-cream/50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-brand-navy">
                  {t("recurringToggle")}
                </p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={recurringEnabled}
                  onClick={() => setRecurringEnabled((v) => !v)}
                  className={cn(
                    "h-7 w-12 shrink-0 rounded-full transition",
                    recurringEnabled ? "bg-sage" : "bg-brand-navy/20"
                  )}
                >
                  <span
                    className={cn(
                      "block h-5 w-5 translate-y-1 rounded-full bg-surface shadow-premium-sm transition",
                      recurringEnabled ? "translate-x-7" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
              {recurringEnabled && (
                <p className="mt-3 text-xs text-text-muted">
                  {t("recurringDescription")}
                </p>
              )}
            </div>
          )}

          {/* Order summary */}
          <div className="rounded-2xl bg-soft-cream p-5">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">{tLabels("subtotal")}</span>
              <span className="font-semibold text-brand-navy">
                {formatCurrency(subtotal, locale)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">{tLabels("addons")}</span>
              <span className="font-semibold text-brand-navy">
                {formatCurrency(addOnTotal, locale)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">{tLabels("tax")}</span>
              <span className="font-semibold text-brand-navy">
                {formatCurrency(tax, locale)}
              </span>
            </div>
            <hr className="my-3 border-line-soft" />
            <div className="flex justify-between">
              <span className="font-semibold text-brand-navy">{tLabels("total")}</span>
              <span className="text-lg font-bold text-brand-navy">
                {formatCurrency(grandTotal, locale)}
              </span>
            </div>
          </div>

          {/* Pay Now */}
          <ElegantButton
            type="button"
            fullWidth
            onClick={handlePayNow}
            disabled={isProcessing}
            className="h-14 text-base"
          >
            {isProcessing ? (
              <span className="inline-flex items-center gap-3">
                <PaymentSpinner className="h-6 w-6 text-current" />
                {t("processing")}
              </span>
            ) : (
              t("payNow")
            )}
          </ElegantButton>
        </div>
      </PremiumCard>
    </div>
  );
}
