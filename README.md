# Jones Ivan Sevilla — Web Developer Portfolio

A modern, animated developer portfolio built with React, Three.js, and Framer Motion.

## ✨ Features

- **3D Hero Animation**: Interactive parallax 3D scene with floating geometric shapes using React Three Fiber
- **Smooth Scroll Animations**: Spring-based viewport animations for all sections using Framer Motion
- **Interactive Hover Effects**: Smooth scale and shadow transitions on cards and UI elements
- **Mouse Parallax**: Camera movement responds to mouse movement for a depth effect
- **Responsive Design**: Fully responsive layout with Tailwind CSS
- **Modern Tech Stack**: Built with Vite, TypeScript, and shadcn-ui components

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd jones-dev-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## 🛠 Tech Stack

- **Frontend Framework**: React 18.3+ with TypeScript
- **3D Graphics**: React Three Fiber, Drei
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: shadcn-ui
- **Build Tool**: Vite
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6

## 📂 Project Structure

```
src/
├── components/
│   ├── HeroSection.tsx          # Main hero with 3D background
│   ├── HeroThreeScene.tsx       # React Three Fiber scene
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ContactSection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── motion.ts               # Framer Motion animation variants
│   └── utils.ts               # Utility functions
├── hooks/
│   └── use-mobile.tsx
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx
```

## 🎨 Customization

### Color Theme

Colors are defined in Tailwind CSS variables. Edit `index.css` or the Tailwind config to change the theme.

### 3D Scene

The hero 3D scene objects and lighting can be customized in `src/components/HeroThreeScene.tsx`:

- Modify `SHAPES` array to change object positions, sizes, and colors
- Adjust `ambientLight`, `directionalLight`, and `pointLight` intensities for different lighting moods
- Change camera position and FOV in the `Canvas` props

### Animations

Animation variants are centralized in `src/lib/motion.ts`. Adjust timing, easing, and spring properties:

```typescript
export const headingReveal: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 72, damping: 18 },
  },
};
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Testing & Linting
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run lint         # Run ESLint
```

## 🌐 Deployment

### Deploy with Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy with Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

### Deploy with GitHub Pages

Update `vite.config.ts` with your repository name:

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

## 📧 Contact & Links

- **Email**: jonesivan@example.com
- **GitHub**: github.com/jonesivan
- **LinkedIn**: linkedin.com/in/jonesivan

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with passion using modern web technologies and best practices in web animation and design.

