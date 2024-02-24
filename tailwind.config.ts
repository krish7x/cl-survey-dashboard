import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        green: {
          50: "#848d97",
        },
        darkBlue: {
          50: "#1C172E",
        },
        lightBlue: {
          50: "#F2F5F8",
        },
        border: "#EAEAEA",
        txtPurple: "#63686F",
        txtBlack: "#25292D",
        navBorder: "rgba(174,203,203,0.25)",
        sidebarText: "#63686F",
        navLeftBorder: "#4A9CA6",
        navBg: "rgba(174,203,203,0.25)",
        surveyIcon1: "#BFBFBF",
        surveyIcon2: "#9062A2",
        surveyIcon3: "#12161C",
        hoverBg: "#E1EBED",
        modalBorder: "#EDEDED",
        starStroke: "#7E3AF2",
        radio: "#62686f",
        modalBtnGreen: "#5dd55d",
      },
      width: {
        skeleton: "272px",
        templateLeft: "470px",
        modalLeftPanel: "30%",
        modalRightPanel: "70%",
      },
      display: ["group-hover"],
      height: {
        templateModal: "80vh",
        footer: "82px"
      },
      margin: {
        modalHeader: "25vw",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "15%": { transform: "rotate(14.0deg)" },
          "30%": { transform: "rotate(-8.0deg)" },
          "40%": { transform: "rotate(14.0deg)" },
          "50%": { transform: "rotate(-4.0deg)" },
          "60%": { transform: "rotate(10.0deg)" },
          "70%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        wave: "wave 1.5s infinite",
      },
    },
    transitionDuration: {
      "900": "900ms",
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
