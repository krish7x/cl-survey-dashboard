import { getUserSession } from "@/lib/session";
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import "./globals.css";
import { Provider } from "jotai";
import { ReactNode } from "react";

const inter = Source_Sans_3({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "CL Survey",
  description: "Caratlane Survey Application",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserSession();

  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-lightBlue-50 border-b border-border h-screen w-full`}
      >
        <Provider>
          <div className="p-0 m-0 flex flex-col w-full h-full">
            <Header user={user} />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
