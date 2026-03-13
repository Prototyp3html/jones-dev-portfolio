import { lazy, Suspense, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HeroThreeScene = lazy(() => import("./HeroThreeScene"));

const HeroSection = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouse.current.x = 0;
    mouse.current.y = 0;
  }, []);
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <HeroThreeScene mouseRef={mouse} />
        </Suspense>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl space-y-6">
          <motion.div
            className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            🚀 Open to opportunities
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Hi, I'm <span className="text-gradient">Jones Ivan Sevilla</span>
          </motion.h1>
          <motion.p
            className="text-xl text-primary font-medium font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          >
            Aspiring Web Developer
          </motion.p>
          <motion.p
            className="text-muted-foreground leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            I enjoy building modern web systems and developing full-stack
            applications using cutting-edge technologies. Passionate about
            clean code and intuitive user experiences.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.54, ease: EASE }}
          >
            <a
              href="#projects"
              className="inline-flex items-center rounded-lg bg-gradient-purple px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg border border-border bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-muted"
            >
              Contact Me
            </a>
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-background/10" />

      {/* Subtle background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
