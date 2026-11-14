"use client";

import React from "react";

export type MascotState = "idle" | "thinking" | "speaking";

export interface FlytBaseMascotProps {
  state?: MascotState;
  size?: number;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const FlytBaseMascot: React.FC<FlytBaseMascotProps> = ({
  state = "idle",
  size = 52,
  className = "",
  onClick,
  interactive = true,
}) => {
  return (
    <div
      onClick={onClick}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={(e) => {
        if (interactive && onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative inline-flex flex-col items-center select-none transition-transform duration-200 ${
        interactive ? "cursor-pointer group hover:scale-105 active:scale-95" : ""
      } ${className}`}
      style={{ width: size, height: size * 1.05 }}
      aria-label={`FlytBase AI Mascot (${state})`}
    >
      <svg
        width={size}
        height={size * 1.05}
        viewBox="0 0 200 210"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Metallic Charcoal Head Gradient */}
          <linearGradient id="robot-body-grad" x1="40" y1="36" x2="160" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E333A" />
            <stop offset="45%" stopColor="#1E2126" />
            <stop offset="100%" stopColor="#111315" />
          </linearGradient>

          {/* Antenna Chartreuse Beacon Glow */}
          <filter id="beacon-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Cyan Eye & LED Glow */}
          <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Ear Nub Gradient */}
          <linearGradient id="ear-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#24272C" />
            <stop offset="100%" stopColor="#131417" />
          </linearGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse
          cx="95"
          cy="192"
          rx="52"
          ry="7"
          fill="rgba(0,0,0,0.18)"
          className="transition-all duration-300 group-hover:scale-110"
        />

        {/* Head and Floating Body Group */}
        <g
          className={`transition-transform duration-300 ${
            state === "thinking"
              ? "animate-[pulse_1.5s_ease-in-out_infinite]"
              : state === "speaking"
              ? "animate-[bounce_2s_ease-in-out_infinite]"
              : "animate-[bounce_4s_ease-in-out_infinite]"
          }`}
        >
          {/* Antenna Stalk */}
          <rect
            x="92"
            y="12"
            width="6"
            height="28"
            rx="3"
            fill="#24272C"
            stroke="#181A1D"
            strokeWidth="1.5"
          />

          {/* Antenna 4-Point Chartreuse Star Beacon */}
          <g filter="url(#beacon-glow)">
            <path
              d="M95 4 L99 15 L110 17 L99 19 L95 30 L91 19 L80 17 L91 15 Z"
              fill="#A3E635"
              className={state === "thinking" ? "animate-spin origin-[95px_17px]" : ""}
            />
            <circle cx="95" cy="17" r="3.2" fill="#FFFFFF" />
          </g>

          {/* Left Ear Pod Nub */}
          <rect
            x="20"
            y="72"
            width="15"
            height="44"
            rx="7.5"
            fill="url(#ear-grad)"
            stroke="#2F333B"
            strokeWidth="2"
          />

          {/* Right Ear Pod Nub */}
          <rect
            x="155"
            y="72"
            width="15"
            height="44"
            rx="7.5"
            fill="url(#ear-grad)"
            stroke="#2F333B"
            strokeWidth="2"
          />

          {/* Main Speech-Bubble Head Body (Charcoal with Rounded Corners & Tail) */}
          <path
            d="M62 42 C44 42 34 52 34 72 V122 C34 142 44 152 62 152 H70 L58 174 C56.5 177 59.5 180.5 62.8 179 L94 152 H128 C146 152 156 142 156 122 V72 C156 52 146 42 128 42 Z"
            fill="url(#robot-body-grad)"
            stroke="#3A3F47"
            strokeWidth="2.5"
          />

          {/* Inner Screen Bezel */}
          <rect
            x="48"
            y="56"
            width="94"
            height="80"
            rx="26"
            fill="#090B0D"
            stroke="#1C1F24"
            strokeWidth="2"
          />

          {/* ------------------------------------------------------------- */}
          {/* STATE-DEPENDENT FACIAL EXPRESSIONS                           */}
          {/* ------------------------------------------------------------- */}

          {state === "idle" && (
            <g className="transition-opacity duration-300">
              {/* Friendly Round Glowing Cyan Eyes */}
              <g filter="url(#cyan-glow)">
                <ellipse cx="72" cy="90" rx="10.5" ry="12.5" fill="#38BDF8" />
                <ellipse cx="118" cy="90" rx="10.5" ry="12.5" fill="#38BDF8" />
                {/* Specular Highlights */}
                <circle cx="76" cy="86" r="3.5" fill="#FFFFFF" />
                <circle cx="122" cy="86" r="3.5" fill="#FFFFFF" />
              </g>

              {/* Gentle Smiling Mouth */}
              <path
                d="M82 114 Q95 123 108 114"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                filter="url(#cyan-glow)"
              />
            </g>
          )}

          {state === "thinking" && (
            <g className="transition-opacity duration-300">
              {/* Thinking 3-Dot Glowing LED Sequence */}
              <g filter="url(#cyan-glow)">
                <circle cx="75" cy="96" r="6.5" fill="#38BDF8">
                  <animate
                    attributeName="opacity"
                    values="0.25;1;0.25"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="5.5;7.5;5.5"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="95" cy="96" r="6.5" fill="#38BDF8">
                  <animate
                    attributeName="opacity"
                    values="0.25;1;0.25"
                    dur="1.2s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="5.5;7.5;5.5"
                    dur="1.2s"
                    begin="0.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="115" cy="96" r="6.5" fill="#38BDF8">
                  <animate
                    attributeName="opacity"
                    values="0.25;1;0.25"
                    dur="1.2s"
                    begin="0.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="5.5;7.5;5.5"
                    dur="1.2s"
                    begin="0.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          )}

          {state === "speaking" && (
            <g className="transition-opacity duration-300">
              {/* Happy Arc Eyes (Speaking Expression) */}
              <g filter="url(#cyan-glow)">
                <path
                  d="M62 94 C67 81 81 81 86 94"
                  stroke="#38BDF8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M104 94 C109 81 123 81 128 94"
                  stroke="#38BDF8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Expressive Talking Mouth */}
              <ellipse
                cx="95"
                cy="116"
                rx="10"
                ry="6"
                fill="#38BDF8"
                filter="url(#cyan-glow)"
              >
                <animate
                  attributeName="ry"
                  values="3;7;3"
                  dur="0.35s"
                  repeatCount="indefinite"
                />
              </ellipse>

              {/* Sound Energy Wave Sparkles */}
              <g filter="url(#cyan-glow)">
                <circle cx="160" cy="74" r="3.5" fill="#A3E635">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.2s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="174" cy="65" r="2.5" fill="#A3E635">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.2s"
                    begin="0.3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="168" cy="85" r="2" fill="#38BDF8">
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.2s"
                    begin="0.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
