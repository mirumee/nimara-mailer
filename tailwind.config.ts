import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin.js";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        subtle: "#79716d",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".underline": {
          textDecoration: "underline",
        },
      });
    }),
  ],
  darkMode: "selector",
} satisfies Config;
