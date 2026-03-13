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
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-20 lg:pb-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <HeroThreeScene mouseRef={mouse} />
        </Suspense>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row">

          {/* Text */}
          <div className="max-w-xl space-y-6">
          <motion.div
            className="inline-block rounded-full border border-border bg-secondary px-4 py-1.5 text-xs text-muted-foreground"
            initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            🚀 Open to opportunities
          </motion.div>
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight"
            initial={{ opacity: 0, y: 52, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
          >
            Hi, I'm <span className="text-gradient">Jones Ivan Sevilla</span>
          </motion.h1>
          <motion.p
            className="text-xl text-primary font-medium font-display"
            initial={{ opacity: 0, y: 28 }}
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
            <motion.a
              href="#projects"
              className="inline-flex items-center rounded-lg bg-gradient-purple px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 glow-purple"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center rounded-lg border border-border bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-muted"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          </div>

          {/* Profile photo */}
          <motion.div
            className="relative mt-4 flex shrink-0 items-center justify-center sm:mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
          >
            {/* Decorative rotating ring */}
            <motion.div
              className="absolute h-[280px] w-[280px] sm:h-[320px] sm:w-[320px] rounded-full border border-primary/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              {/* Dot on the ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary/60 shadow-[0_0_8px_hsl(var(--primary)/0.7)]" />
            </motion.div>

            {/* Outer glow */}
            <div className="absolute h-[240px] w-[240px] sm:h-[280px] sm:w-[280px] rounded-full bg-primary/10 blur-2xl" />

            {/* Photo frame */}
            <div className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_40px_hsl(var(--primary)/0.25)]">
              <img
                src="/profile.png"
                alt="Jones Ivan Sevilla"
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Bottom-right geometric accent */}
            <div className="absolute bottom-4 right-0 flex flex-col gap-1.5 opacity-60">
              <div className="h-[5px] w-[5px] rotate-45 rounded-[1px] border border-primary/70" />
              <div className="h-[5px] w-[5px] rotate-45 rounded-[1px] border border-primary/50" />
              <div className="h-[5px] w-[5px] rotate-45 rounded-[1px] border border-primary/30" />
            </div>
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
