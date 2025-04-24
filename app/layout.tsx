import React from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from '@/shared/providers';
import NextTopLoader from 'nextjs-toploader';
import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import { Outfit } from 'next/font/google';
interface RootLayoutProps {
  readonly children: React.ReactNode;
}
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap'
});

export default async function RootLayout({ children }: RootLayoutProps) {

  return (
    <html lang="en" className={`${outfit.className}`} suppressHydrationWarning>
      <body>
        <NextTopLoader showSpinner={true} />
        <Provider>
          <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
            <div className="flex flex-col flex-1 overflow-y-hidden bg-background">
              <div className="overflow-y-auto overflow-x-auto h-full p-6">

                {children}
              </div>
            </div>
            </div>
        </Provider>
        <Toaster richColors />
      </body>
    </html>
  );
}
