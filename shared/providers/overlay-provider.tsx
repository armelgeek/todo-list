'use client';

import SettingsOverlay from '../components/molecules/modals/settings-overlay';
import TaskOverlay from '../components/molecules/modals/task-overlay';
import { useMounted } from '../hooks/use-mounted';

export default function OverlayProvider() {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <>
      <SettingsOverlay />
      <TaskOverlay />
    </>
  );
}
