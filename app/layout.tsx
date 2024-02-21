import { getUserSession } from "@/lib/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CL Survey",
  description: "Caratlane Survey Application",
};

export default async function RootLayout({ children }) {
  const user = await getUserSession();

  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        {children}
      </body>
    </html>
  );
}
