import React from 'react';

import "@uploadthing/react/styles.css";
import '@/shared/styles/globals.css';
import AppFooter from '@/shared/components/atoms/app-footer';
import AppClientMenu from '@/shared/components/molecules/layout/app-client-menu';
import LeftSidebar from '@/features/filter/components/molecules/left-sidebar';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function BaseLayout({ children }: RootLayoutProps) {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <AppClientMenu />
        <div className="flex h-screen overflow-y-hidden overflow-x-hidden">
          <LeftSidebar />
          <div className="flex flex-col flex-1 overflow-y-hidden bg-background">
            <div className="overflow-y-auto overflow-x-auto h-full p-6">
              {children}
            </div>
          </div>
        </div>
      <AppFooter/>
    </div>
  );
}
