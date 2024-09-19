import type { Config } from "tailwindcss";

export default {
  content: ["./src/client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        saleorDarkBg: "#262836",
      },
      fontFamily: {
        inter: "Inter",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config;
