# Pet Fit Butler

Luxury pet wellness platform built with Next.js App Router, TypeScript, Tailwind CSS, PWA support, Zustand state, and Recharts analytics.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- next-pwa
- Zustand
- Lucide React
- Recharts
- Faker.js mock data generation

## Features

- Premium responsive UI (mobile-first, tablet, desktop)
- Mobile sticky bottom navigation + desktop sidebar
- Dashboard with membership status, booking overview, butler status, and activity charts
- User Profile + 20-record booking history
- Pet Profile with 15 pets, 12-month weight history, and activity logs
- Health Dashboard with weight/activity/calorie charts
- 5-step Booking flow with service selection, add-ons, and payment summary
- Pet Taxi tracking with timeline statuses and route placeholder
- Live Cam page with 5 feeds and secure access mock
- Daily Fit Report cards (20 reports)
- Gallery with 20 image mocks and 10 video thumbnails
- Offline fallback route and installable PWA configuration

## Project Structure

```text
/app
  /dashboard
  /profile
  /pets
  /health
  /booking
  /tracking
  /live-cam
  /reports
  /gallery
/components
/lib
/mock
/store
/styles
/public
```

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Checks

```bash
npm run lint
npm run build
```

> `npm run build` uses webpack mode for compatibility with `next-pwa`.
