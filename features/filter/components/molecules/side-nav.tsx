'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';
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
import { useLists } from '@/features/list/hooks/use-list';
import { SidebarItem, sidebarItems, widgetItems } from '@/shared/lib/constants/app.constant';
import { useSettingsStore } from '@/shared/store/settings-store';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Separator } from '@radix-ui/react-select';
import ListItem from '@/features/list/components/molecules/list-item';
import { config } from '@/shared/lib/config';

export default function SideNav() {
    const path = usePathname();
    const isMounted = useMounted();
    const { showLeftSidebar, toggleTaskOverlay } = useLayoutStore();
    const { settings, setSettings } = useSettingsStore();
    const { data: lists } = useLists({});

    React.useEffect(() => {
        const dW = Object.values(widgetItems).map((i) => i.id);
        const dS = Object.values(sidebarItems).map((i) => i.id);

        if (!settings.sidebar || !settings.widgets)
            setSettings({ ...settings, sidebar: dS, widgets: dW });
    }, [settings, setSettings]);

    if (!isMounted) {
        return <p>Chargment en cours....</p>;
    }

  
    return (
        <nav className="px-4 pb-4 min-h-full flex flex-col justify-between">
            <div>

                <div className="flex-gap">
                    <Button
                        variant={showLeftSidebar ? 'secondary' : 'default'}
                        size="sm"
                        className="flex justify-start px-2 w-full"
                        onClick={toggleTaskOverlay}
                    >
                        <div className="bg-primary rounded-full p-1 ml-0.5 hover:bg-transparent">
                            <Plus className="h-3 w-3 text-white" />
                        </div>
                        <span className={cn('ml-2', !showLeftSidebar && 'md:hidden')}>
                            New task
                        </span>
                    </Button>
                </div>
                <div className="space-y-1 mt-2 overflow-y-auto max-h-screen">
                    {config.platform.links.map(
                        (item) =>
                            settings.sidebar.includes(item.id as SidebarItem) && (
                                <>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="flex items-center">
                                                <div className="rounded-full p-1">
                                                    <item.icon className="h-4 w-4" />
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
                            <div className="flex-between gap-1 px-3 mt-4">
                                {showLeftSidebar && (
                                    <div className="w-full flex-between">
                                        <span className="text-muted-foreground text-xs whitespace-nowrap uppercase">
                                            Lists
                                        </span>
                                        <ListItem />
                                    </div>
                                )}
                                <AccordionTrigger className="hover:bg-muted rounded-full py-0 p-0.5" />
                            </div>
                            <AccordionContent>
                                {lists ? (
                                    lists?.map((list) => <ListItem list={list} key={list.id} />)
                                ) : (
                                    <p>Chargement ....</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </nav>
    );
}
