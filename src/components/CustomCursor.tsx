import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, label, [role='button']";

type ClickBurst = { id: number; x: number; y: number };

const canUseMouseCursor = () => {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(any-pointer: fine)").matches &&
    window.matchMedia("(any-hover: hover)").matches
  );
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [clicks, setClicks] = useState<ClickBurst[]>([]);
  const clickIdRef = useRef(0);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  // Dot — fast, snaps almost exactly to cursor
  const dotX = useSpring(pointerX, { stiffness: 600, damping: 38, mass: 0.18 });
  const dotY = useSpring(pointerY, { stiffness: 600, damping: 38, mass: 0.18 });

  // Shapes — slightly slower so they trail behind the dot
  const trailX = useSpring(pointerX, { stiffness: 200, damping: 22, mass: 0.45 });
  const trailY = useSpring(pointerY, { stiffness: 200, damping: 22, mass: 0.45 });

  // 6 shapes surrounding the dot — spread around it, slightly offset per shape
  const s1x = useTransform(trailX, (v) => v - 16);
  const s1y = useTransform(trailY, (v) => v + 12);
  const s2x = useTransform(trailX, (v) => v);
  const s2y = useTransform(trailY, (v) => v + 19);
  const s3x = useTransform(trailX, (v) => v + 16);
  const s3y = useTransform(trailY, (v) => v + 12);
  const s4x = useTransform(trailX, (v) => v - 18);
  const s4y = useTransform(trailY, (v) => v - 6);
  const s5x = useTransform(trailX, (v) => v + 18);
  const s5y = useTransform(trailY, (v) => v - 6);
  const s6x = useTransform(trailX, (v) => v);
  const s6y = useTransform(trailY, (v) => v - 14);

  useEffect(() => {
    const updateEnabled = () => {
      const nextEnabled = canUseMouseCursor();
      setEnabled(nextEnabled);

      if (!nextEnabled) {
        setVisible(false);
        setIsPressed(false);
        setClicks([]);
      }
    };

    const finePointerQuery = window.matchMedia("(any-pointer: fine)");
    const hoverQuery = window.matchMedia("(any-hover: hover)");

    updateEnabled();
    finePointerQuery.addEventListener("change", updateEnabled);
    hoverQuery.addEventListener("change", updateEnabled);

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabled);
      hoverQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor-enabled");

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        setVisible(false);
        return;
      }

      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setIsInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const handleLeaveWindow = () => setVisible(false);
    const handleEnterWindow = () => setVisible(true);
    const handleDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      setIsPressed(true);
      const id = ++clickIdRef.current;
      setClicks((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setClicks((prev) => prev.filter((c) => c.id !== id));
      }, 700);
    };
    const handleUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setIsPressed(false);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisible(false);
        setIsPressed(false);
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("mouseout", handleLeaveWindow);
    window.addEventListener("mouseover", handleEnterWindow);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("mouseout", handleLeaveWindow);
      window.removeEventListener("mouseover", handleEnterWindow);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  const shapeAnim = {
    opacity: visible ? 0.65 : 0,
    scale: isInteractive ? 1.35 : 1,
  };
  const shapeTrans = { type: "spring" as const, stiffness: 280, damping: 22 };

  return (
    <>
      {/* Main dot — exact cursor tip */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[122] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isPressed ? 0.7 : 1,
          boxShadow: "0 0 10px hsl(var(--primary) / 0.85)",
        }}
        transition={{ type: "spring", stiffness: 520, damping: 30 }}
      />

      {/* Shape 1 — diamond, bottom-left */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-primary/70"
        style={{ x: s1x, y: s1y, rotate: 45 }}
        animate={shapeAnim}
        transition={shapeTrans}
      />

      {/* Shape 2 — circle, bottom-center */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/55"
        style={{ x: s2x, y: s2y }}
        animate={{ opacity: visible ? 0.5 : 0, scale: isInteractive ? 1.35 : 1 }}
        transition={shapeTrans}
      />

      {/* Shape 3 — diamond, bottom-right */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-primary/70"
        style={{ x: s3x, y: s3y, rotate: 45 }}
        animate={shapeAnim}
        transition={shapeTrans}
      />

      {/* Shape 4 — small square, left */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-primary/50"
        style={{ x: s4x, y: s4y }}
        animate={{ opacity: visible ? 0.45 : 0, scale: isInteractive ? 1.3 : 1 }}
        transition={shapeTrans}
      />

      {/* Shape 5 — small square, right */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-primary/50"
        style={{ x: s5x, y: s5y }}
        animate={{ opacity: visible ? 0.45 : 0, scale: isInteractive ? 1.3 : 1 }}
        transition={shapeTrans}
      />

      {/* Shape 6 — tiny diamond, top-center */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[121] h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-[1px] border border-primary/40"
        style={{ x: s6x, y: s6y, rotate: 45 }}
        animate={{ opacity: visible ? 0.38 : 0, scale: isInteractive ? 1.3 : 1 }}
        transition={shapeTrans}
      />

      {/* Click burst — each element is its own fixed layer; no Tailwind translate conflict */}
      {clicks.map(({ id, x, y }) => (
        <Fragment key={id}>
          {/* Expanding ring — x/y: "-50%" centers it via Framer Motion */}
          <motion.div
            className="pointer-events-none fixed z-[123] rounded-full border-2 border-primary"
            style={{ left: x, top: y }}
            initial={{ width: 6,  height: 6,  x: "-50%", y: "-50%", opacity: 1 }}
            animate={{ width: 48, height: 48, x: "-50%", y: "-50%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* 4 diamonds scattering outward — offset left/top by -3 to center the 6px element */}
          {([
            { dx: -22, dy: -22, r: 45 },
            { dx:  22, dy: -22, r: -45 },
            { dx: -22, dy:  22, r: -45 },
            { dx:  22, dy:  22, r: 45 },
          ] as { dx: number; dy: number; r: number }[]).map(({ dx, dy, r }, i) => (
            <motion.div
              key={i}
              className="pointer-events-none fixed z-[123] h-[7px] w-[7px] rounded-[1.5px] border-2 border-primary"
              style={{ left: x - 3.5, top: y - 3.5 }}
              initial={{ x: 0,  y: 0,  rotate: r,       opacity: 1,   scale: 1   }}
              animate={{ x: dx, y: dy, rotate: r + 90,  opacity: 0,   scale: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default CustomCursor;