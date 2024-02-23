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
      },
      width: {
        skeleton: "272px",
        templateLeft: "470px",
      },
      display: ["group-hover"],
      height: {
        templateModal: "80vh",
      },
      margin: {
        modalHeader: "25vw",
      },
      keyframes: {
        wave: {
          to: {
            "margin-left": "-51%",
          },
        },
      },
    },
    animation: {
      wave: "wave 1.5s ease-in-out infinite",
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
