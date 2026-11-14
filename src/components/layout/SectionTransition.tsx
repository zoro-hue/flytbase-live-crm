"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

interface SectionTransitionProps {
  children: React.ReactNode;
}

const FOLD_OUT_DURATION = 240; // ms for outgoing section fold
const FOLD_IN_DURATION = 280;  // ms for incoming section unfold

export const SectionTransition: React.FC<SectionTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const [currentPath, setCurrentPath] = useState<string>(pathname);
  const [phase, setPhase] = useState<"idle" | "folding" | "unfolding">("idle");
  
  const isFirstMount = useRef<boolean>(true);
  const pendingChildrenRef = useRef<React.ReactNode>(children);
  const foldTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const unfoldTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep pendingChildren up to date whenever Next.js gives us new children
  pendingChildrenRef.current = children;

  useEffect(() => {
    // Skip animation on initial application mount
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Only trigger transition if the route path has actually changed
    if (pathname === currentPath) {
      setDisplayChildren(children);
      return;
    }

    // Clear any active transition timers to prevent overlapping animations during rapid navigation
    if (foldTimeoutRef.current) clearTimeout(foldTimeoutRef.current);
    if (unfoldTimeoutRef.current) clearTimeout(unfoldTimeoutRef.current);

    setCurrentPath(pathname);
    setPhase("folding");

    // Phase 1: Fold out outgoing section around center hinge with progressive blur
    foldTimeoutRef.current = setTimeout(() => {
      // Switch to the newly rendered section children
      setDisplayChildren(pendingChildrenRef.current);
      
      // Reset scroll position to top of new section smoothly
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }

      // Phase 2: Unfold incoming section outward from center hinge, restoring sharpness
      setPhase("unfolding");

      unfoldTimeoutRef.current = setTimeout(() => {
        setPhase("idle");
      }, FOLD_IN_DURATION);
    }, FOLD_OUT_DURATION);

    return () => {
      if (foldTimeoutRef.current) clearTimeout(foldTimeoutRef.current);
      if (unfoldTimeoutRef.current) clearTimeout(unfoldTimeoutRef.current);
    };
  }, [pathname]);

  return (
    <div className="optic-perspective-container w-full min-h-full relative">
      {/* Central Optical Hinge Guideline & Spine Crease */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 z-20 transition-opacity duration-200 ${
          phase !== "idle" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.5) 44%, rgba(255,85,0,0.18) 50%, rgba(0,0,0,0.5) 56%, transparent 100%)",
        }}
      >
        {/* Subtle optical spine hairline with FlytBase deep orange accent */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#FF5500]/30 to-transparent" />
      </div>

      {/* 3D Hinge Transform Leaf containing Section Content */}
      <div
        className={`optic-hinge-leaf w-full ${
          phase === "folding"
            ? "optic-phase-folding"
            : phase === "unfolding"
            ? "optic-phase-unfolding"
            : "optic-phase-idle"
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};
