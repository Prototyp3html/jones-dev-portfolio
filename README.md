# Jones Ivan Sevilla Portfolio

Personal portfolio site built with React, TypeScript, Vite, Framer Motion, and React Three Fiber.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + TypeScript | UI framework and type safety |
| Vite | Build tool and development server |
| Tailwind CSS | Utility-based styling with custom dark theme |
| Framer Motion | Scroll animations, spring physics, page transitions |
| React Three Fiber / Drei | 3D animated hero background scene |
| React Router | Client-side routing (home + 404) |

## Project Structure

```text
jones-dev-portfolio/
├── public/
│   └── profile.png              # Your profile photo (place it here)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx           # Fixed top navigation bar with mobile hamburger menu
│   │   ├── HeroSection.tsx      # Landing section: intro text + scramble subtitle + profile photo
│   │   ├── HeroThreeScene.tsx   # React Three Fiber 3D scene rendered inside the hero
│   │   ├── AboutSection.tsx     # About me cards (education, skills summary, passion)
│   │   ├── SkillsSection.tsx    # Skills grid organized by category
│   │   ├── ProjectsSection.tsx  # Project cards with GitHub links and tech tags
│   │   ├── ContactSection.tsx   # Contact form + social links
│   │   ├── Footer.tsx           # Site footer with copyright
│   │   ├── LoadingScreen.tsx    # Animated splash screen shown on first load
│   │   └── CustomCursor.tsx     # Geometric custom cursor (desktop only)
│   ├── lib/
│   │   └── motion.ts            # Centralized Framer Motion animation variants
│   ├── pages/
│   │   ├── Index.tsx            # Root page — mounts all sections in order
│   │   └── NotFound.tsx         # Custom animated 404 page
│   ├── App.tsx                  # App shell with BrowserRouter and route definitions
│   ├── index.css                # Global styles, CSS variables, Tailwind base
│   └── main.tsx                 # App entry point
├── index.html                   # HTML template
├── tailwind.config.ts           # Tailwind theme: colors, fonts, border radius
├── vite.config.ts               # Vite config: dev server, path aliases
├── tsconfig.app.json            # TypeScript compiler settings
└── package.json                 # Dependencies and npm scripts
```

## How the App Is Structured

The portfolio is a single-page application. All sections render inside `Index.tsx` in this order:

1. **LoadingScreen** — shown for 1.2 seconds on first load, then fades out
2. **CustomCursor** — replaces the native cursor on desktop/mouse devices
3. **Navbar** — fixed at the top; links scroll to each section by ID
4. **HeroSection** — first visible section with 3D background, scramble/decode role text, and profile photo
5. **AboutSection** — cards describing education, development focus, and motivation
6. **SkillsSection** — skill tags grouped by category
7. **ProjectsSection** — project cards; each has a GitHub link and tech stack tags
8. **ContactSection** — a contact form (via FormSubmit) and social profile links
9. **Footer** — copyright line

### Animations

All scroll-reveal animations are defined as reusable Framer Motion variants in `src/lib/motion.ts`. Components import from there (e.g., `sectionReveal`, `headingReveal`, `staggerItem`) so animation timing is consistent and easy to adjust in one place.

### Styling

Colors and spacing are configured through CSS custom properties in `src/index.css` and mapped to Tailwind tokens in `tailwind.config.ts`. The primary purple color is `hsl(270, 70%, 60%)`. Custom utility classes (`text-gradient`, `glow-purple`, `bg-gradient-purple`) are defined in `index.css`.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (opens on http://localhost:5173)
npm run dev
```

## Available Scripts

```bash
npm run dev       # Development server with hot reload
npm run build     # Production build (outputs to /dist)
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Updating Content

| What to change | Where to edit |
|---|---|
| Name, title, intro text | `src/components/HeroSection.tsx` |
| Profile photo | Replace `public/profile.png` |
| About me text and cards | `src/components/AboutSection.tsx` |
| Skills list | `src/components/SkillsSection.tsx` |
| Projects (title, links, tags) | `src/components/ProjectsSection.tsx` |
| Contact email and social links | `src/components/ContactSection.tsx` |
| Site colors or fonts | `tailwind.config.ts` and `src/index.css` |

## Deployment

Deployed on Vercel with these settings:

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Contact

- GitHub: https://github.com/Prototyp3html
- LinkedIn: https://www.linkedin.com/in/jones-ivan-sevilla-a022333a6/
- Email: sevilla.jsivn@gmail.com

