import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Floating diamond accent shape
const Diamond = ({
  size,
  style,
  delay,
}: {
  size: number;
  style: React.CSSProperties;
  delay: number;
}) => (
  <motion.div
    className="pointer-events-none absolute rounded-[2px] border border-primary/30"
    style={{ width: size, height: size, rotate: 45, ...style }}
    animate={{ y: [0, -12, 0], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 — route not found:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      {/* Floating geometric accents */}
      <Diamond size={10} style={{ top: "18%", left: "12%" }} delay={0} />
      <Diamond size={7}  style={{ top: "30%", left: "20%" }} delay={0.6} />
      <Diamond size={12} style={{ top: "60%", left: "8%"  }} delay={1.2} />
      <Diamond size={8}  style={{ top: "72%", right: "14%"}} delay={0.4} />
      <Diamond size={11} style={{ top: "20%", right: "10%"}} delay={0.9} />
      <Diamond size={7}  style={{ top: "50%", right: "22%"}} delay={1.5} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">

        {/* "404" with blinking cursor */}
        <motion.div
          className="font-display font-bold leading-none"
          style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
          initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="text-gradient">4</span>
          <span className="text-gradient">0</span>
          <span className="text-gradient">4</span>
          <motion.span
            className="ml-2 inline-block w-[4px] rounded-full bg-primary align-middle"
            style={{ height: "0.8em" }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" }}
          />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="h-[6px] w-[6px] rotate-45 rounded-[1px] border border-primary/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          className="text-2xl font-display font-semibold sm:text-3xl"
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          Page Not Found
        </motion.h2>

        {/* Description */}
        <motion.p
          className="max-w-md text-muted-foreground leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
        >
          The page you're looking for doesn't exist or may have been moved.
          Head back to the portfolio to get on track.
        </motion.p>

        {/* Back home button */}
        <motion.button
          onClick={() => navigate("/")}
          className="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-purple px-6 py-3 font-medium text-primary-foreground glow-purple transition-opacity hover:opacity-90"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.7, ease: EASE }}
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </motion.button>

      </div>
    </div>
  );
};

export default NotFound;
