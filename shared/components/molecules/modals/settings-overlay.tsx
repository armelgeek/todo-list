'use client';

import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';


import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { useLayoutStore } from '@/shared/store/layout-store';
export default function SettingsOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const { showSettingsOverlay, toggleSettingsOverlay, setSettingsOverlay } =
    useLayoutStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  React.useEffect(() => {
    if (showSettingsOverlay) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showSettingsOverlay]);

  if (isDesktop) {
    return (
      <Dialog open={showSettingsOverlay} onOpenChange={toggleSettingsOverlay}>
        <DialogContent className="overflow-y-auto h-full max-h-[700px]">
    
        </DialogContent>
      </Dialog>
    );
  }

  const onOpenChange = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      setSettingsOverlay(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="max-h-screen overflow-y-auto">
    
        </div>
      </DrawerContent>
    </Drawer>
  );
}
