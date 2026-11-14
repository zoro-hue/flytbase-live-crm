"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

interface SectionTransitionProps {
  children: React.ReactNode;
}

/**
 * REFINED GLASS OPTICAL SECTION DISSOLVE (Total: 950ms):
 * Phase 1 — Preparation (0–100ms): Center olive-green refraction line appears.
 * Phase 2 — Folding (100–450ms, 350ms): Visibly folds toward center, rotateY: -10deg, scaleX: 0.82, blur(10px), cubic-bezier(0.76, 0, 0.24, 1).
 * Phase 3 — Hinge Transition (450–550ms, 100ms): Outgoing hidden behind hinge, content swaps to new route.
 * Phase 4 — Unfolding (550–850ms, 300ms): Expands outward from center, blur dissolves (10px -> 0px), rotateY (10deg -> 0deg), cubic-bezier(0.22, 1, 0.36, 1).
 * Phase 5 — Settling (850–950ms, 100ms): Olive refraction line fades out smoothly, section settles into final position.
 */

const PREP_MS = 100;
const FOLD_END_MS = 450;
const SWAP_END_MS = 550;
const UNFOLD_END_MS = 850;
const TOTAL_DURATION_MS = 950;

type TransitionPhase = "idle" | "prep" | "folding" | "hingeSwap" | "unfolding" | "settling";

const variants: Variants = {
  idle: {
    scaleX: 1,
    scaleY: 1,
    rotateY: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.15 },
  },
  prep: {
    scaleX: 0.995,
    scaleY: 0.998,
    rotateY: -0.5,
    filter: "blur(0.5px)",
    opacity: 0.98,
    transition: {
      duration: PREP_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  folding: {
    scaleX: 0.82, // Smooth horizontal fold toward the center axis
    scaleY: 0.98,
    rotateY: -10, // Controlled 3D perspective fold
    filter: "blur(10px)", // Clean optical glass blur
    opacity: 0.2, // Content dissolves smoothly as it reaches the center line
    transition: {
      duration: (FOLD_END_MS - PREP_MS) / 1000, // 350ms
      ease: [0.76, 0, 0.24, 1],
    },
  },
  hingeSwap: {
    scaleX: 0.82,
    scaleY: 0.98,
    rotateY: 10, // Symmetrical counter-angle for incoming unfold
    filter: "blur(10px)",
    opacity: 0.2,
    transition: {
      duration: (SWAP_END_MS - FOLD_END_MS) / 1000, // 100ms
      ease: "linear",
    },
  },
  unfolding: {
    scaleX: 1,
    scaleY: 1,
    rotateY: 0,
    filter: "blur(0px)", // Progressive optical restoration
    opacity: 1,
    transition: {
      duration: (UNFOLD_END_MS - SWAP_END_MS) / 1000, // 300ms
      ease: [0.22, 1, 0.36, 1],
    },
  },
  settling: {
    scaleX: 1,
    scaleY: 1,
    rotateY: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: {
      duration: (TOTAL_DURATION_MS - UNFOLD_END_MS) / 1000, // 100ms
      ease: "easeOut",
    },
  },
};

export const SectionTransition: React.FC<SectionTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [showHinge, setShowHinge] = useState<boolean>(false);

  const isFirstMount = useRef<boolean>(true);
  const pendingChildrenRef = useRef<React.ReactNode>(children);
  
  // Timer handles for clean cancellation on rapid navigation
  const timer1Ref = useRef<NodeJS.Timeout | null>(null);
  const timer2Ref = useRef<NodeJS.Timeout | null>(null);
  const timer3Ref = useRef<NodeJS.Timeout | null>(null);
  const timer4Ref = useRef<NodeJS.Timeout | null>(null);
  const timer5Ref = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (timer1Ref.current) clearTimeout(timer1Ref.current);
    if (timer2Ref.current) clearTimeout(timer2Ref.current);
    if (timer3Ref.current) clearTimeout(timer3Ref.current);
    if (timer4Ref.current) clearTimeout(timer4Ref.current);
    if (timer5Ref.current) clearTimeout(timer5Ref.current);
  };

  // Always keep pending children updated
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

    clearAllTimers();
    setCurrentPath(pathname);

    // Respect prefers-reduced-motion
    if (shouldReduceMotion) {
      setDisplayChildren(pendingChildrenRef.current);
      setPhase("idle");
      setShowHinge(false);
      return;
    }

    // =========================================================================
    // 5-PHASE CINEMATIC SEQUENCE EXECUTION (1400–1700ms)
    // =========================================================================

    // Phase 1 — Preparation (0–200ms): Orange vertical hinge appears at exact center
    setShowHinge(true);
    setPhase("prep");

    // Phase 2 — Folding (200–650ms): Outgoing content visibly folds toward center
    timer1Ref.current = setTimeout(() => {
      setPhase("folding");
    }, PREP_MS);

    // Phase 3 — Hinge Transition (650–800ms): Outgoing disappears behind hinge, switch content
    timer2Ref.current = setTimeout(() => {
      setDisplayChildren(pendingChildrenRef.current);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      setPhase("hingeSwap");
    }, FOLD_END_MS);

    // Phase 4 — Unfolding (800–1450ms): Incoming content unfolds from vertical center
    timer3Ref.current = setTimeout(() => {
      setPhase("unfolding");
    }, SWAP_END_MS);

    // Phase 5 — Completion (1450–1650ms): Orange hinge fades out smoothly
    timer4Ref.current = setTimeout(() => {
      setShowHinge(false);
      setPhase("settling");
    }, UNFOLD_END_MS);

    // End of Sequence: Reset to stationary idle state
    timer5Ref.current = setTimeout(() => {
      setPhase("idle");
    }, TOTAL_DURATION_MS);

    return () => {
      clearAllTimers();
    };
  }, [pathname, shouldReduceMotion]);

  const isTransitioning = phase !== "idle";

  return (
    <div className="optic-perspective-container w-full min-h-full relative overflow-hidden">
      {/* Layered Optical Motion-Blur Corridor over the center vertical hinge */}
      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            key="center-hinge-blur-corridor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[580px] z-20 optic-hinge-blur-gradient"
          />
        )}
      </AnimatePresence>

      {/* Exact Center Vertical Hinge / Refraction Line — 1.5px, #536F00, prominent during fold and unfold */}
      <AnimatePresence>
        {showHinge && !shouldReduceMotion && (
          <motion.div
            key="center-vertical-hinge-line"
            initial={{ opacity: 0, scaleY: 0.95 }}
            animate={{ opacity: 0.9, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] z-30 shadow-[0_0_8px_rgba(83,111,0,0.35)]"
            style={{
              backgroundColor: "#536F00",
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
