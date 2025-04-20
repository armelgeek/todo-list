import { Icons } from "@/components/ui/icons";

import {
  Calendar,
  CalendarClock,
  CalendarDays,
  Clipboard,
  Inbox,
  Menu,
  Tags,
} from 'lucide-react';

const kAppName = "Boilerplate";
const kAppAbbr = "B";
const kAppTagline = "Empowering developers one snippet at a time";
const kAppDescription = `Boilerplate is the ultimate platform for developers to share, discover, and collaborate on code snippets. Explore snippets by programming language or framework, connect with other developers, and elevate your coding projects with ease.`;

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/d',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Category',
    url: '/d/master/category',
    icon: 'post',
    shortcut: ['p', 'p'],
    isActive: false,
    items: []
  }
];

export type Mode = {
  label: string;
  value: string;
};

export const modes: Mode[] = [
  {
    label: 'Automatic',
    value: 'auto',
  },
  {
    label: 'Manual',
    value: 'manual',
  },
  {
    label: 'Hold-to-talk',
    value: 'hold',
  },
];

export const statuses = [
  {
    id: 1,
    value: 'Incomplete',
    label: 'Incomplete',
  },
  {
    id: 2,
    value: 'Completed',
    label: 'Complete',
  },
];

export const sidebarItems = [
  {
    id: 'inbox',
    label: 'Inbox',
    icon: Inbox,
  },
  {
    id: 'today',
    label: 'Today',
    icon: CalendarDays,
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    icon: CalendarClock,
  },
  {
    id: 'labels',
    label: 'Labels',
    icon: Tags,
  },
  {
    id: 'lists',
    label: 'Lists',
    icon: Menu,
  },
] as const;

export type SidebarItem = (typeof sidebarItems)[number]['id'];

export const widgetItems = [
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: Clipboard,
  },
] as const;

export type WidgetItem = (typeof widgetItems)[number]['id'];

export const statusColumns = [
  {
    status: 'New',
    color: 'bg-yellow-500',
  },
  {
    status: 'In Progress',
    color: 'bg-yellow-500',
  },
  {
    status: 'Completed',
    color: 'bg-yellow-500',
  },
];


export { kAppName, kAppAbbr, kAppTagline, kAppDescription };
