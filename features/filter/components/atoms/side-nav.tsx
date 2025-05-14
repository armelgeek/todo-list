'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import useSWR from 'swr';

import { Button, buttonVariants, LoadingButton } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useMounted } from '@/shared/hooks/use-mounted';
import { useLayoutStore } from '@/shared/store/layout-store';
import { useSettingsStore } from '@/shared/store/settings-store';
import { useLists } from '@/features/list/hooks/use-list';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import ListItem from '@/features/list/components/molecules/list-item';
import { SidebarItem } from '@/shared/lib/constants/app.constant';

const platform: [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: null,
        href: '/inbox',
      },
      {
        id: 'today',
        label: 'Today',
        icon: null,
        href: '/today',
      },
      {
        id: 'upcoming',
        label: 'Upcoming',
        icon: null,
        href: '/upcoming',
      },
      {
        id: 'labels',
        label: 'Labels',
        icon: null,
        href: '/labels',
      },
    ];
export default function SideNav() {
  const path = usePathname();
  const isMounted = useMounted();
  const { showLeftSidebar, toggleTaskOverlay } = useLayoutStore();
  const { settings, setSettings } = useSettingsStore();
  const { data: lists } = useLists({});

  if (!isMounted) {
    return <p>Loading ...</p>;
  }

 
  return (
    <nav className="flex flex-col justify-between px-4 pb-4 min-h-full">
      <div>
        <UserNav />
        <div className="flex-gap">
          
       
        </div>
        <div className="space-y-1 mt-2 max-h-screen overflow-y-auto">
          {platform.links.map(
            (item) =>
              settings.sidebar.includes(item.id as SidebarItem) && (
                <>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        <div className="p-1 rounded-full">
                          <item.icon className="w-4 h-4" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className={cn('ml-2', !showLeftSidebar && 'md:hidden')}>
                    {item.label}
                  </span>
                </>
              ),
          )}
        </div>
        <Separator className="my-2" />
        {settings.sidebar.includes('lists') && (
          <Accordion type="single" collapsible defaultValue="lists">
            <AccordionItem value="lists">
              <div className="flex-between gap-1 mt-4 px-3">
                {showLeftSidebar && (
                  <div className="flex-between w-full">
                    <span className="text-muted-foreground text-xs uppercase whitespace-nowrap">
                      Lists
                    </span>
                    <ListItem />
                  </div>
                )}
                <AccordionTrigger className="hover:bg-muted p-0.5 py-0 rounded-full" />
              </div>
              <AccordionContent>
                {lists ? (
                  lists?.map((list) => <ListItem list={list} key={list.id} />)
                ) : (
                  <p>Loading ....</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </nav>
  );
}
