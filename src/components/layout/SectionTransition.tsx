"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
}

// Cinematic timing: 470ms fold + 490ms unfold = 960ms total (within 850–1100ms range)
const FOLD_OUT_DURATION_MS = 470;
const FOLD_IN_DURATION_MS = 490;

const variants: Variants = {
  idle: {
    scaleX: 1,
    scaleY: 1,
    rotateY: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.1 },
  },
  folding: {
    scaleX: 0.925,
    scaleY: 0.985,
    rotateY: -6,
    // Clearly visible intense motion blur that accelerates toward the center hinge
    filter: "blur(12px)",
    // Substantial opacity so the blurred content is vividly visible as it folds
    opacity: 0.45,
    transition: {
      duration: FOLD_OUT_DURATION_MS / 1000,
      ease: [0.32, 0, 0.67, 0.1], // Slow, continuous inward movement
    },
  },
  unfolding: {
    // Unfolds from peak blur and 3D angle back to crisp sharpness
    scaleX: [0.928, 1],
    scaleY: [0.986, 1],
    rotateY: [6, 0],
    filter: ["blur(12px)", "blur(0px)"],
    opacity: [0.45, 1],
    transition: {
      duration: FOLD_IN_DURATION_MS / 1000,
      ease: [0.16, 1, 0.3, 1], // Velvety, smooth deceleration into full sharpness
    },
  },
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);
  const [phase, setPhase] = useState<"idle" | "folding" | "unfolding">("idle");
  const [showHinge, setShowHinge] = useState<boolean>(false);

  const isFirstMount = useRef<boolean>(true);
  const pendingChildrenRef = useRef<React.ReactNode>(children);
  const foldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const unfoldTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hingeFadeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Keep latest children synced
  pendingChildrenRef.current = children;

  useEffect(() => {
    // Skip animation on initial application mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Do nothing if navigating to the exact same URL
    if (pathname === currentPath) {
      setDisplayChildren(children);
      return;
    }

    // Clear any active timers to prevent overlapping animations during rapid navigation
    if (foldTimerRef.current) clearTimeout(foldTimerRef.current);
    if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
    if (hingeFadeTimerRef.current) clearTimeout(hingeFadeTimerRef.current);

    setCurrentPath(pathname);

    // If user prefers reduced motion, do a clean instant swap
    if (shouldReduceMotion) {
      setDisplayChildren(pendingChildrenRef.current);
      setPhase("idle");
      setShowHinge(false);
      return;
    }

    // Sequence Step 1 & 2: Center orange hinge appears, page begins inward fold
    setShowHinge(true);
    setPhase("folding");

    // Sequence Step 3 & 4: Outgoing page folds toward center axis with clearly visible horizontal blur
    foldTimerRef.current = setTimeout(() => {
      // Sequence Step 5: Switch content cleanly at the vertical fold peak
      setDisplayChildren(pendingChildrenRef.current);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

      // Sequence Step 5 & 6: Incoming section emerges from center hinge and expands outward
      setPhase("unfolding");

      // Sequence Step 7: Orange vertical hinge line fades away as page becomes completely sharp
      hingeFadeTimerRef.current = setTimeout(() => {
        setShowHinge(false);
      }, FOLD_IN_DURATION_MS - 120);

      unfoldTimerRef.current = setTimeout(() => {
        setPhase("idle");
      }, FOLD_IN_DURATION_MS);
    }, FOLD_OUT_DURATION_MS);

    return () => {
      if (foldTimerRef.current) clearTimeout(foldTimerRef.current);
      if (unfoldTimerRef.current) clearTimeout(unfoldTimerRef.current);
      if (hingeFadeTimerRef.current) clearTimeout(hingeFadeTimerRef.current);
    };
  }, [pathname, shouldReduceMotion]);

  const isTransitioning = phase === "folding" || phase === "unfolding";

  return (
    <div className="optic-perspective-container w-full min-h-full relative overflow-hidden">
      {/* Layered Optical Motion-Blur Corridor over the center hinge */}
      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            key="center-hinge-blur-corridor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[540px] z-20 optic-hinge-blur-gradient"
          />
        )}
      </AnimatePresence>

      {/* Exact Center Vertical Hinge Line — 1px, #FF5A00, prominent during fold, no glow, no bloom */}
      <AnimatePresence>
        {showHinge && !shouldReduceMotion && (
          <motion.div
            key="center-vertical-hinge-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] z-30"
            style={{
              backgroundColor: "#FF5A00",
            }}
          />
        )}
      </AnimatePresence>

      {/* 3D Hinge Transform Canvas with Framer Motion & CSS 3D */}
      <motion.div
        className={`optic-hinge-leaf w-full ${isTransitioning ? "optic-mask-active" : ""}`}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%", // Exact vertical center hinge
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
        variants={variants}
        animate={shouldReduceMotion ? "idle" : phase}
      >
        {displayChildren}
      </motion.div>
    </div>
  );
};
