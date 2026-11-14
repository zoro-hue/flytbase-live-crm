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
          bg: "#F4F5F0",
          secondary: "#ECEFE5",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          elevated: "#FFFFFF",
          border: "#E2E5DE",
          "border-hover": "#D0D5CC",
          text: "#151515",
          mutedText: "#747A80",
          subtleText: "#969BA1",
          olive: "#536F00",
          "olive-light": "#789600",
          "olive-hover": "#435900",
          charcoal: "#171717",
          "charcoal-hover": "#262626",
          success: "#398B46",
          warning: "#C78620",
          danger: "#E34B3D",
          orange: "#FF5A00",
          "orange-subtle": "rgba(255, 90, 0, 0.08)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      transitionTimingFunction: {
        "matte-smooth": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
