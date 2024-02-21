import type { AppProps } from "next/app";
import "../globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["cyrillic"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
