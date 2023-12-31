import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        nameCircle: "linear-gradient(to right, #5C6670, #131316)",
      },
      transitionDuration: {
        "2000": "2000ms",
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.33333%",
        "2/3": "66.66667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "40%",
        "3/5": "60%",
        "4/5": "80%",
        "1/6": "16.66667%",
        "2/6": "33.33333%",
        "3/6": "50%",
        "4/6": "66.66667%",
        "5/6": "83.33333%",
        "1/7": "14.28571%",
        "2/7": "28.57143%",
        "3/7": "42.85714%",
        "4/7": "57.14286%",
        "5/7": "71.42857%",
        "6/7": "85.71429%",
        "1/12": "8.33333%",
        "2/12": "16.66667%",
        "3/12": "25%",
        "4/12": "33.33333%",
        "5/12": "41.66667%",
        "6/12": "50%",
        "7/12": "58.33333%",
        "8/12": "66.66667%",
        "9/12": "75%",
        "10/12": "83.33333%",
        "11/12": "91.66667%",
      },
      colors: {
        black300: "#131316",
        linear: "#5C6670",
        jade100: "#e3fcf2",
        gray10: "#f2f4f7",
        gray50: "#EFF1F6",
        gray100: "#DBDEE5",
        gray300: "#d0d5dd",
        gray400: "#56616B",
        black: "#101828",
        red: "#F9E3E0",
        orange300: "#ff5403",
      },
      fontSize: {
        h1: ["2.25rem", "normal"],
        h2: ["1.75rem", "normal"],
        h3: ["1.5rem", "normal"],
        body: ["16px", "normal"],
      },
      boxShadow: {
        Elevation:
          "0px 2px 4px 0px rgba(45, 59, 67, 0.05), 0px 2px 6px 0px rgba(45, 59, 67, 0.06)",
        AppBar:
          "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08)",
        Filter:
          "0px 8px 16px 4px rgba(188, 196, 204, 0.10), 0px 12px 24px 0px rgba(219, 222, 229, 0.10), 0px 16px 32px 0px rgba(219, 222, 229, 0.10)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
