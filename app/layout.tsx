import GoogleUserSetup from '@/components/google-user';
import { getUserSession } from '@/lib/session';
import { Provider } from 'jotai';
import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const inter = Source_Sans_3({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'CL Survey',
  description: 'Caratlane Survey Application',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserSession();
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-lightBlue-50 border-b border-border h-screen w-full`}
      >
        <Provider>
          <div className="p-0 m-0 flex flex-col w-full h-full">
            <GoogleUserSetup user={user} />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
