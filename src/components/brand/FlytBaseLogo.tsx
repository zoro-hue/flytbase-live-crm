"use client";

import React from "react";
import Image from "next/image";

export interface FlytBaseLogoProps {
  variant?: "horizontal" | "icon" | "wordmark" | "squircle" | "squircle-olive";
  size?: "sm" | "md" | "lg" | "xl" | number;
  className?: string;
  priority?: boolean;
}

export const FlytBaseLogo: React.FC<FlytBaseLogoProps> = ({
  variant = "horizontal",
  size = "md",
  className = "",
  priority = false,
}) => {
  // Determine pixel dimensions based on size prop
  let iconSize = 32;

  if (typeof size === "number") {
    iconSize = size;
  } else {
    switch (size) {
      case "sm":
        iconSize = 22;
        break;
      case "md":
        iconSize = 28;
        break;
      case "lg":
        iconSize = 38;
        break;
      case "xl":
        iconSize = 50;
        break;
    }
  }

  // Standalone icons
  if (variant === "icon" || variant === "squircle" || variant === "squircle-olive") {
    let iconSrc = "/brand/flytbase-icon.svg";
    if (variant === "squircle") iconSrc = "/brand/flytbase-icon-squircle.svg";
    if (variant === "squircle-olive") iconSrc = "/brand/flytbase-icon-olive.svg";

    return (
      <div className={`inline-flex items-center select-none flex-shrink-0 ${className}`}>
        <Image
          src={iconSrc}
          alt="FlytBase Icon"
          width={iconSize}
          height={iconSize}
          priority={priority}
          className="h-auto object-contain flex-shrink-0"
        />
      </div>
    );
  }

  // Wordmark only
  if (variant === "wordmark") {
    const fontSize = Math.round(iconSize * 0.76);
    return (
      <div className={`inline-flex items-center select-none flex-shrink-0 ${className}`}>
        <span
          style={{ fontSize: `${fontSize}px` }}
          className="font-bold tracking-tight text-[#151515] leading-none whitespace-nowrap font-sans"
        >
          FlytBase<span className="text-[#536F00]">.</span>
        </span>
      </div>
    );
  }

  // Horizontal variant: Crisp icon + perfectly spaced typography
  const textFontSize = Math.round(iconSize * 0.72);

  return (
    <div className={`inline-flex items-center gap-2 select-none flex-shrink-0 ${className}`}>
      <Image
        src="/brand/flytbase-icon.svg"
        alt="FlytBase"
        width={iconSize}
        height={iconSize}
        priority={priority}
        className="h-auto object-contain flex-shrink-0"
      />
      <span
        style={{ fontSize: `${textFontSize}px` }}
        className="font-bold tracking-tight text-[#151515] leading-none whitespace-nowrap font-sans"
      >
        FlytBase<span className="text-[#536F00]">.</span>
      </span>
    </div>
  );
};
