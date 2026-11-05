# Advocate Kaushal Kishor — Factual Professional Information Website (Development Preview)

A clean, responsive, bilingual (English / తెలుగు) single-page informational website for **Advocate Kaushal Kishor, M.Sc., LL.B.**, located in Gajuwaka, Visakhapatnam, Andhra Pradesh, India.

> **Important Development Preview Notice**: This project is a development preview and is **not** represented as approved for public publication. Statutory enrolment fields and areas of practice are explicitly marked as development placeholders until formally verified.

---

## 1. Professional Compliance (Bar Council of India Rule 36)

This website is designed conservatively with reference to **Rule 36 of the Bar Council of India Rules** as a strictly factual directory record, not an advertising or client-solicitation platform.

It purposefully excludes:
- Promotional slogans, marketing headlines, or comparative rankings.
- Testimonials, client reviews, or case outcome statements.
- Consultation booking widgets, lead-generation forms, or promotional WhatsApp buttons.
- Unverified specialisation or experience claims.
- Stock photographs of courtrooms/judges or fabricated portraits.

---

## 2. Factual Identity & Development Placeholders

### Confirmed Identity, Enrolment, Court Practice & Contact Details
- **Name**: Advocate Kaushal Kishor
- **Qualifications**: M.Sc., LL.B.
- **Location**: Gajuwaka, Visakhapatnam, Andhra Pradesh, India
- **Enrolment Number**: `1255/2020`
- **Enrolment Date**: `30-12-2020`
- **State/Place of Original Enrolment**: `Amravati`
- **Current State Bar Council**: `Andhra Pradesh`
- **Practice Location**: `Visakhapatnam District Court`
- **Court Representation**: `Courts across India, excluding the Supreme Court of India`
- **Areas of Practice**: `Family Law`, `Criminal Law`
- **Office Address**: 26-2-20/1, Chaitanya Nagar, behind Mee Seva, R.K. Hospital Lane, Chinnagantyada, Gajuwaka, Visakhapatnam – 530026, Andhra Pradesh.
- **Telephone**: `9885037796`
- **Email**: `kaushalkisho@gmail.com`

### Additional References Supplied — Separated Pending Clarification
Clearly distinguished from confirmed practice-location and court-representation details and not presented as verified memberships:
- `Visakhapatnam Bar Council` (referred to in connection with Visakhapatnam District Court practice; exact official bar body/association terminology pending confirmation)
- `Gajuwaka Bar Council` (exact official institutional name and nature of association pending clarification)
- `High Court of Andhra Pradesh` (nature of association pending clarification; not presented as a membership)

---

## 3. Technical Stack & Static Hosting

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite (outputs a pure static bundle to `dist/`, suitable for static hosting such as Cloudflare Pages)
- **Styling**: Tailwind CSS v4
- **Bilingual Support**: Static TypeScript translation dictionary (`src/data/translations.ts`) supporting English (`en`, default) and Telugu (`te`, `తెలుగు`) with `localStorage` persistence and no runtime machine translation or external API keys.

---

## 4. Local Development & Build Instructions

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```
The development server runs at `http://localhost:3000`.

### Type-Check / Lint
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```
