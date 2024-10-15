import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#170f23",
        header: "#231b2e",
        "main-text": "#9b4de0",
        "secondary-text": "#A462C8",
        "thirst-text": "#4e3e61",
        secondary: "#2f2739",
        thirst: "#34224F",
        "white-1": "#d7d7d7",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
