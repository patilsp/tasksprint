'use client';

import React, { useState, useEffect } from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft, Menu } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  return (
    <div className="relative ">
    <nav
      className={cn(
        'left-0 top-20 h-full bg-background border-r shadow-lg transition-all duration-300 ease-in-out z-40',
        status && 'duration-500',
        isMobile ? (isMinimized ? '-translate-x-full' : 'translate-x-0') : (isMinimized ? 'w-[60px]' : 'w-40'),
        className
      )}
    >
      <div className="flex flex-col h-full mt-14">
        <div className="flex-grow overflow-y-auto py-4 px-3 border-r mt-2">
          <DashboardNav items={navItems} />
        </div>

        <div className="p-4 border-t">
          <Card>
            <CardHeader className="p-2">
              <CardTitle className={cn("text-sm", isMinimized && !isMobile && "hidden")}>John Doe</CardTitle>
              <CardDescription className={cn("text-xs", isMinimized && !isMobile && "hidden")}>Admin</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="sidebar-icon absolute -right-3 top-0 bg-background border rounded-full shadow-md"
        onClick={handleToggle}
      >
        <ChevronLeft className={cn('transition-transform', isMinimized && 'rotate-180')} />
      </Button>

      {isMobile && !isMinimized && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={handleToggle}
        />
      )}
    </nav>
    </div>
  );
}