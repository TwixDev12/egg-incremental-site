# 🥚 Egg Incremental Simulator — Official Marketing Website

Modern, responsive, high-performance showcase landing page designed for **[NEW] 🥚 Egg Incremental Simulator** on Roblox.

---

## 🚀 Quick Start

### 1. Installation
```bash
cd "c:\Users\th\Desktop\site roblox"
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build & Local Preview
```bash
npm run build
npm run preview
```
Open [http://localhost:4173](http://localhost:4173) in your browser.

---

## ⚙️ Configuration (`src/config/siteConfig.ts`)

All game URLs, Place IDs, event deadlines, and texts can be edited in one central file: [`src/config/siteConfig.ts`](./src/config/siteConfig.ts).

### Game & Roblox Links
- **Roblox Place URL**: `https://www.roblox.com/games/109556760281977/Egg-Incremental-Simulator`
- **Place ID**: `109556760281977`
- **Official Group**: `https://www.roblox.com/groups/1004997125/QLF-INC` (`QLF INC`)

### 10-Day Countdown
- **Start Date**: `startDate: "2026-10-01T00:00:00Z"`
- **End Date**: `endDate: "2026-10-11T23:59:59Z"` (10-day synchronized event)
- Automatically switches to event concluded message when expired. Never resets on page refresh.

### Analytics (Optional & Privacy-First)
- By default, analytics tracking is **disabled** (`enabled: false`).
- To activate Plausible or Google Analytics, simply toggle `enabled: true` in `siteConfig.ts`.

---

## 🌐 Deployment Options

The project builds zero-dependency static assets into the `dist/` directory:

- **Cloudflare Pages / Vercel / Netlify**: Connect repository or run `npm run build` with output directory `dist`.
- **GitHub Pages**: Deploy the contents of the `dist/` folder.
- **Traditional Web Hosting (Apache / Nginx)**: Upload the files inside `dist/` to your web root.
