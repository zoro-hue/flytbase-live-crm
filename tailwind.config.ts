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
          bg: "#050505",
          surface: "#0D0F12",
          card: "#0D0F12",
          secondary: "#141619",
          elevated: "#141619",
          border: "#25282D",
          "border-hover": "#363A42",
          orange: "#FF5A00",
          "orange-light": "#FF7324",
          "orange-hover": "#E04F00",
          "orange-subtle": "rgba(255, 90, 0, 0.08)",
          "orange-glow": "rgba(255, 90, 0, 0.18)",
          text: "#F4F4F5",
          mutedText: "#9A9FA8",
          darkMuted: "#606570",
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
