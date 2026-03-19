# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # ESLint
```

## Architecture

Single-page marketing website for Inndomitus (AI consulting company). Written in Spanish. No routing — navigation uses anchor links (`#servicios`, `#demo`, `#nosotros`, `#contacto`).

**Stack:** React 19 + Vite, Tailwind CSS v4 (Vite plugin), Framer Motion, Lucide React icons.

**Structure:**
- `src/sections/` — Page sections rendered in order in `App.jsx`: Hero → Services → Demo → About → Contact → Footer
- `src/components/` — Shared UI: `Navbar.jsx`, `Button.jsx`, `ServiceCard.jsx`
- `src/data/` — Static content: `services.js` (6 AI services with icons/gradients), `team.js` (7 founders + company values)
- `src/config/api.js` — Backend base URL (`https://inndomitus-back.vercel.app`) and endpoints

**Styling conventions:**
- Dark theme with cyan/violet/emerald accent colors defined as CSS variables in `index.css`
- Custom utility classes in `index.css`: `.text-gradient`, `.glow-cyan`, `.glow-violet`, `.glow-emerald`, `.glass`, `.glass-card`
- Animated gradient background and grid/noise overlays are applied globally

**Backend integration:**
- Contact form → `POST /api/formulario-contacto`
- Demo/agent config → `POST /api/configuracion-agente`
- No authentication; purely a public frontend

**ESLint note:** Unused vars are allowed if they start with an uppercase letter or underscore (configured in `eslint.config.js`).
