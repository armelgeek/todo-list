import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import AppFooter from '@/shared/components/atoms/app-footer';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <AppClientMenu />
      <main>
        {children}
      </main>
      <AppFooter/>
    </div>
  );
}
