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
          bg: "#08090B",
          sidebar: "#101216",
          navbar: "#111419",
          card: "#15181D",
          elevated: "#1B1F25",
          border: "#272C34",
          orange: "#FF762E",
          "orange-hover": "#E6631F",
          "orange-subtle": "rgba(255, 118, 46, 0.12)",
          text: "#F4F4F5",
          secondary: "#9298A2",
          muted: "#666D78",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
