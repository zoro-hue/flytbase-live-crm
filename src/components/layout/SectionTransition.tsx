"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
}

// Cinematic timing: 460ms fold + 490ms unfold = 950ms total (within 850–1100ms range)
const FOLD_OUT_DURATION_MS = 460;
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
    scaleX: 0.932,
    scaleY: 0.985,
    rotateY: -5.5,
    filter: "blur(8px)",
    opacity: 0.05,
    transition: {
      duration: FOLD_OUT_DURATION_MS / 1000,
      ease: [0.35, 0, 0.65, 0.1], // Slow, elegant inward acceleration
    },
  },
  unfolding: {
    scaleX: [0.935, 1],
    scaleY: [0.985, 1],
    rotateY: [5.5, 0],
    filter: ["blur(8px)", "blur(0px)"],
    opacity: [0.08, 1],
    transition: {
      duration: FOLD_IN_DURATION_MS / 1000,
      ease: [0.16, 1, 0.3, 1], // Cinematic, velvety deceleration
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

    // If user prefers reduced motion, do a clean, instant transition
    if (shouldReduceMotion) {
      setDisplayChildren(pendingChildrenRef.current);
      setPhase("idle");
      setShowHinge(false);
      return;
    }

    // Sequence Step 1 & 2: Orange vertical hinge appears at exact center, fold begins
    setShowHinge(true);
    setPhase("folding");

    // Sequence Step 3 & 4: Outgoing page folds inward toward vertical center axis with progressive blur
    foldTimerRef.current = setTimeout(() => {
      // Sequence Step 5: Switch content cleanly at the vertical fold peak
      setDisplayChildren(pendingChildrenRef.current);

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

      // Sequence Step 5 & 6: Incoming section emerges from center hinge and expands outward
      setPhase("unfolding");

      // Sequence Step 7: Orange vertical hinge line fades away as page becomes sharp
      hingeFadeTimerRef.current = setTimeout(() => {
        setShowHinge(false);
      }, FOLD_IN_DURATION_MS - 150);

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

  return (
    <div className="optic-perspective-container w-full min-h-full relative overflow-hidden">
      {/* Exact Center Vertical Hinge Line — 1px, #FF5A00, subtle opacity, no glow, no bloom */}
      <AnimatePresence>
        {showHinge && !shouldReduceMotion && (
          <motion.div
            key="center-vertical-hinge-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
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
        className={`optic-hinge-leaf w-full ${
          phase === "folding" || phase === "unfolding" ? "optic-mask-active" : ""
        }`}
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
