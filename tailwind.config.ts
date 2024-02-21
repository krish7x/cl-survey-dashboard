import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        green: {
          50: "#848d97",
        },
        darkBlue: {
          50: '#1C172E'
        }
      },
    },
  },
  plugins: [],
};
export default config;
