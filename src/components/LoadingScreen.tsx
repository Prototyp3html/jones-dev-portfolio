import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[380px] w-[380px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      {/* Orbiting corner diamonds */}
      {[
        { size: 10, top: "30%", left: "32%", rotate: [45, 90], delay: 0 },
        { size: 7,  top: "30%", left: "68%", rotate: [45, 0],  delay: 0.18 },
        { size: 8,  top: "70%", left: "34%", rotate: [45, 90], delay: 0.08 },
        { size: 6,  top: "70%", left: "66%", rotate: [45, 0],  delay: 0.25 },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-[2px] border border-primary/40"
          style={{ width: d.size, height: d.size, top: d.top, left: d.left }}
          animate={{ rotate: d.rotate, opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Top floating triangle accent */}
      <motion.div
        className="pointer-events-none absolute rounded-[1px] border border-primary/30"
        style={{ width: 8, height: 8, top: "42%", left: "calc(50% - 90px)" }}
        animate={{ rotate: [0, 90, 180], y: [-3, 3, -3], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute rounded-[1px] border border-primary/25"
        style={{ width: 6, height: 6, top: "42%", left: "calc(50% + 82px)" }}
        animate={{ rotate: [45, 135, 45], y: [3, -3, 3], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />

      {/* Label */}
      <motion.p
        className="relative text-sm uppercase tracking-[0.24em] text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        Loading Portfolio
      </motion.p>

      {/* Progress bar with geometric end-caps */}
      <div className="relative mt-6 flex items-center gap-2">
        {/* Left diamond cap */}
        <motion.div
          className="h-[7px] w-[7px] shrink-0 rounded-[1.5px] border border-primary/60"
          style={{ rotate: 45 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="h-1.5 w-48 overflow-hidden rounded-full bg-secondary">
          {/* Shimmering fill */}
          <motion.div
            className="h-full w-16 rounded-full bg-gradient-purple"
            animate={{ x: ["-130%", "380%"] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Right diamond cap */}
        <motion.div
          className="h-[7px] w-[7px] shrink-0 rounded-[1.5px] border border-primary/60"
          style={{ rotate: 45 }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.h1
        className="relative mt-6 text-lg font-display font-semibold text-gradient"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        Jones Portfolio
      </motion.h1>
    </motion.div>
  );
};

export default LoadingScreen;