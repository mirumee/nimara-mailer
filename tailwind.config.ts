import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        subtle: "#79716d",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
} satisfies Config;
