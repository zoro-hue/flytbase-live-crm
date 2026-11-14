import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crm: {
          bg: "#000000",
          surface: "#090A0D",
          card: "#0D0E12",
          elevated: "#121419",
          border: "#1C1F26",
          "border-hover": "#2B2F3A",
          orange: "#FF5500",
          "orange-light": "#FF6B1A",
          "orange-hover": "#E04B00",
          "orange-subtle": "rgba(255, 85, 0, 0.08)",
          "orange-glow": "rgba(255, 85, 0, 0.2)",
          text: "#F4F4F5",
          secondary: "#9A9FA8",
          muted: "#606570",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      transitionTimingFunction: {
        "matte-smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
