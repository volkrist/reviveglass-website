import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0E0E10",
          soft: "#15171B",
          deep: "#08080A",
        },
        surface: "#15171B",
        line: "rgba(255,255,255,0.08)",
        muted: "#A1A1AA",
        brand: {
          DEFAULT: "#2BB3D9",
          from: "#2BB3D9",
          to: "#1B6E8C",
          glow: "rgba(43,179,217,0.35)",
        },
      },
      fontFamily: {
        display: ["Unbounded", "system-ui", "sans-serif"],
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightish: "-0.02em",
        tightest: "-0.04em",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2BB3D9 0%, #1B6E8C 100%)",
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(43,179,217,0.18) 0%, rgba(14,14,16,0) 60%)",
        grid:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(43,179,217,0.18), 0 20px 60px -10px rgba(43,179,217,0.25)",
        soft: "0 30px 80px -30px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-pulse": {
          "0%,100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both",
        "slow-pulse": "slow-pulse 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
