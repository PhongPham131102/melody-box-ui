/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spin360: "spin360 0.5s cubic-bezier( 0.165, 0.84, 0.44, 1 ) forwards",
      },
      keyframes: {
        spin360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      colors: {
        main: "#170f23",
        "main-1": "#5C4D71",
        header: "#231b2e",
        "main-text": "#9b4de0",
        "secondary-text": "#A462C8",
        "thirst-text": "#4e3e61",
        "secondary-1": "#2f2739",
        "tab-active": "#6D6875",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "player-controler-main": "#130C1C",
        thirst: "#34224F",
        "white-1": "#d7d7d7",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        line: "#493961",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".hover-zoom": {
          position: "relative",
          overflow: "hidden",
          "&:hover > .zoomable": {
            transform: "scale(1.1)",
          },
          "& > .zoomable": {
            transition: "transform 0.5s ease-in-out",
            transform: "scale(1)",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".custom-scroll": {
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            "border-radius": "9999px", // Bo tròn track
          },
          "&::-webkit-scrollbar-thumb": {
            background: "transparent",
            "border-radius": "9999px",
            transition: "all 0.3s",
          },
          "&:hover::-webkit-scrollbar-thumb": {
            background: "#5d5765", // Màu khi hover
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

export default config;
