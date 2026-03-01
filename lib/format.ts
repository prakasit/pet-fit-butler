const thaiDateFormat = new Intl.DateTimeFormat("th-TH", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const thaiTimeFormat = new Intl.DateTimeFormat("th-TH", {
  hour: "2-digit",
  minute: "2-digit",
});

const thaiCurrencyFormat = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export const formatDate = (date: Date | string) =>
  thaiDateFormat.format(new Date(date));

export const formatTime = (date: Date | string) =>
  thaiTimeFormat.format(new Date(date));

export const formatCurrency = (amount: number) => thaiCurrencyFormat.format(amount);

export const toTitleCase = (text: string) =>
  text
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
