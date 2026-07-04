/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        console: {
          bg: "#05070a",
          panel: "#0b1015",
          border: "#1c2a2e",
          accent: "#39ff9d",
          accent2: "#38f0ff",
          warn: "#ffb84d",
          danger: "#ff5c5c",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(57, 255, 157, 0.15)",
        glowSm: "0 0 10px rgba(57, 255, 157, 0.25)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
