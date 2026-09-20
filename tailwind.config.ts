import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        brand: {
          green: "#2A402D",
          gold: "#B89C72",
          light: "#FBFBF9",
          dark: "#1A261C",
          muted: "#8C928D",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 20px 50px -10px rgba(42, 64, 45, 0.15)",
        glow: "0 0 30px rgba(184, 156, 114, 0.5)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
