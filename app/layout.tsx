import GoogleUserSetup from '@/components/micros/google-user';
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
        className={`${inter.className} h-screen w-full border-b border-border bg-lightBlue-50`}
      >
        <Provider>
          <div className="m-0 flex h-full w-full flex-col p-0">
            <GoogleUserSetup user={user} />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
