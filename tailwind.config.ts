import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical Editorial Signature Palette
        midnight: {
          DEFAULT: "#102B3B",
          50: "#F0F5F8",
          100: "#DDE8EE",
          200: "#B8D2DE",
          300: "#8CB5C8",
          400: "#5D95AF",
          500: "#3A738F",
          600: "#2A576E",
          700: "#1E4154",
          800: "#163444",
          900: "#102B3B",
          950: "#091A24",
        },
        teal: {
          DEFAULT: "#18B7A4",
          50: "#EFFBF9",
          100: "#D6F6F1",
          200: "#B0ECE3",
          300: "#7DDFD1",
          400: "#44CBBC",
          500: "#18B7A4",
          600: "#129688",
          700: "#11776D",
          800: "#125E57",
          900: "#134E48",
          950: "#052C29",
        },
        paper: {
          DEFAULT: "#F5F7F4",
          pure: "#FFFFFF",
          muted: "#ECEFEA",
        },
        mist: {
          DEFAULT: "#E6ECE9",
          border: "#D3DCD8",
          dark: "#B8C7C1",
        },
        coral: {
          DEFAULT: "#ED786B",
          50: "#FDF4F3",
          100: "#FBE6E3",
          200: "#F7CEC8",
          300: "#F1ADA4",
          400: "#E98477",
          500: "#ED786B",
          600: "#D65546",
          700: "#B44033",
          800: "#94372C",
          900: "#7B322A",
        },
        ink: {
          DEFAULT: "#243D48",
          light: "#395867",
          muted: "#5B7584",
          faint: "#8FA3AE",
        },
        // Semantic shadcn mappings
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "#102B3B",
          foreground: "#F5F7F4",
        },
        secondary: {
          DEFAULT: "#18B7A4",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#E6ECE9",
          foreground: "#5B7584",
        },
        accent: {
          DEFAULT: "#18B7A4",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#ED786B",
          foreground: "#FFFFFF",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "Menlo", "monospace"],
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      boxShadow: {
        editorial: "0 2px 10px rgba(16, 43, 59, 0.05), 0 1px 3px rgba(16, 43, 59, 0.03)",
        elevated: "0 12px 32px -4px rgba(16, 43, 59, 0.08), 0 4px 12px -2px rgba(16, 43, 59, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
