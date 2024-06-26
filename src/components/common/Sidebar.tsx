"use client";

import {
  Bell,
  BookOpenCheck,
  Brain,
  Calendar,
  Home,
  LineChart,
  LucideProps,
  MessageSquare,
  School2,
  Settings,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ModeToggle } from "../ModeToggle";

const Sidebar = () => {
  const pages = [
    {
      text: "Dashboard",
      link: "/dashboard",
      icon: Home,
    },
    {
      text: "Analytics",
      link: "/analytics",
      icon: LineChart,
    },
    {
      text: "Classes",
      link: "/classes",
      icon: School2,
    },
    {
      text: "Exams",
      link: "/exams",
      icon: BookOpenCheck,
    },
    {
      text: "Events",
      link: "/events",
      icon: Calendar,
    },
    {
      text: "Notifications",
      link: "/notifications",
      icon: Bell,
    },
    {
      text: "Messaging",
      link: "/messaging",
      icon: MessageSquare,
    },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Brain className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Hekima</span>
          </Link>
          {pages.map(({ text, link, icon }) => (
            <SidebarLink key={link} text={text} link={link} icon={icon} />
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle variant={'ghost'}/>
            </TooltipTrigger>
            <TooltipContent side="right">Theme</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
    </TooltipProvider>
  );
};

const SidebarLink = ({
  link,
  text,
  icon: Icon,
}: {
  link: string;
  text: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}) => {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={link}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Icon
            className={`h-5 w-5 ${pathname === link ? "text-primary" : ""}`}
          />
          <span className="sr-only">{text}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{text}</TooltipContent>
    </Tooltip>
  );
};

export default Sidebar;
