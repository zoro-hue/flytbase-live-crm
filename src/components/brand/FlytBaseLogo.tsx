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
  let height = 36;
  let width = 160;

  if (typeof size === "number") {
    height = size;
    width = variant === "icon" || variant === "squircle" || variant === "squircle-olive" ? size : size * 4.4;
  } else {
    switch (size) {
      case "sm":
        height = 24;
        width = variant === "icon" || variant === "squircle" || variant === "squircle-olive" ? 24 : 110;
        break;
      case "md":
        height = 32;
        width = variant === "icon" || variant === "squircle" || variant === "squircle-olive" ? 32 : 145;
        break;
      case "lg":
        height = 42;
        width = variant === "icon" || variant === "squircle" || variant === "squircle-olive" ? 42 : 190;
        break;
      case "xl":
        height = 56;
        width = variant === "icon" || variant === "squircle" || variant === "squircle-olive" ? 56 : 250;
        break;
    }
  }

  // SVGs mapped to variant
  let src = "/brand/flytbase-logo.svg";
  let alt = "FlytBase Logo";

  switch (variant) {
    case "icon":
      src = "/brand/flytbase-icon.svg";
      alt = "FlytBase Icon";
      width = height;
      break;
    case "wordmark":
      src = "/brand/flytbase-wordmark.svg";
      alt = "FlytBase Wordmark";
      break;
    case "squircle":
      src = "/brand/flytbase-icon-squircle.svg";
      alt = "FlytBase Icon (Card)";
      width = height;
      break;
    case "squircle-olive":
      src = "/brand/flytbase-icon-olive.svg";
      alt = "FlytBase Icon (Olive)";
      width = height;
      break;
    case "horizontal":
    default:
      src = "/brand/flytbase-logo.svg";
      alt = "FlytBase Logo";
      break;
  }

  return (
    <div className={`inline-flex items-center select-none flex-shrink-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto object-contain max-h-full"
      />
    </div>
  );
};
