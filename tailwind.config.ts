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
        sidebarText: "#63686F"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
