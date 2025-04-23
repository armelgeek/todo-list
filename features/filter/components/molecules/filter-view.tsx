'use client';

import * as React from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircuitBoard, Menu } from 'lucide-react';
import { useFilter } from '@/shared/hooks/use-filter';

export default function FilterView() {
  const { view, pathname, setView } = useFilter();

  const hasViewOptions = /inbox|lists|today/.test(pathname);

  if (hasViewOptions) {
    return (
      <Tabs value={view} className="flex-center">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger
            value="list"
            className="h-8"
            onClick={() => setView('list')}
          >
            <Menu className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger
            value="board"
            className="h-8"
            onClick={() => setView('board')}
          >
            <CircuitBoard className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>
    );
  }

  return null;
}