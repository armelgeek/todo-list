import * as React from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { useLayoutStore } from '@/shared/store/layout-store';
import { Add as TaskForm } from '@/features/task/components/organisms/add';

export default function TaskOverlay() {
  const [isOpen, setOpen] = React.useState(false);
  const { showTaskOverlay, toggleTaskOverlay, setTaskOverlay } = useLayoutStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');


  React.useEffect(() => {
    if (showTaskOverlay) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [showTaskOverlay]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleTaskOverlay();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggleTaskOverlay]);

  if (isDesktop) {
    return (
      <Dialog
        open={showTaskOverlay}
        onOpenChange={toggleTaskOverlay}
        modal
      >
        <DialogContent className="h-fit max-h-screen max-w-xl overflow-y-auto">
          <TaskForm />
        </DialogContent>
      </Dialog>
    );
  }

  const onOpenChange = () => {
    setOpen(!isOpen);
    if (!isOpen) {
      setTaskOverlay(false);
    }
  };

  return (
    <Drawer
      open={showTaskOverlay}
      onOpenChange={onOpenChange}
    >
      <DrawerContent>
        <div className="max-h-screen overflow-y-auto">
          <TaskForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
