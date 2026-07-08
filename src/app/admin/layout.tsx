"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAdminAuth } from '@/hooks/use-admin-auth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  LogOut, 
  Loader2, 
  Rocket, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin, loading, signOut } = useAdminAuth();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.toString() ? `?${searchParams.toString()}` : '';
  const currentPath = pathname + currentSearch;
  
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) return;
    if (!loading && (!user || !isAdmin)) {
      router.replace('/admin/login');
    }
  }, [user, isAdmin, loading, router, isLoginPage]);

  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on mobile when it's first detected
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/events/new', label: 'New Event', icon: CalendarPlus },
    { to: '/admin?tab=registrations', label: 'Submissions', icon: Rocket },
    { to: '/admin?tab=submissions', label: 'Hackathon', icon: Rocket },
  ];

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen flex bg-muted/30 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={cn(
            "bg-secondary text-secondary-foreground flex flex-col transition-all duration-300 ease-in-out border-r border-white/10 shrink-0",
            isCollapsed ? "w-[70px]" : "w-64"
          )}
        >
          {/* Sidebar Header */}
          <div className={cn(
            "p-4 border-b border-white/10 flex items-center h-[73px]",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <div className="overflow-hidden animate-in fade-in duration-300">
                <h1 className="text-lg font-bold truncate">FutureLabs Admin</h1>
                <p className="text-[10px] text-white/60 truncate max-w-[160px]">{user.email}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10 shrink-0"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          {/* Sidebar Nav */}
          <nav className="flex-1 p-3 space-y-2 overflow-y-auto overflow-x-hidden">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Tooltip key={to} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={to}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                      currentPath === to || (to === '/admin' && pathname === '/admin')
                        ? 'bg-primary text-primary-foreground'
                        : 'text-white/70 hover:bg-white/10 hover:text-white',
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{label}</span>}
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right" className="font-medium">
                    {label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className={cn(
            "p-3 border-t border-white/10",
            isCollapsed && "flex justify-center"
          )}>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full text-white/70 hover:text-white hover:bg-white/10 transition-all",
                    isCollapsed ? "justify-center p-0 h-10 w-10" : "justify-start px-3"
                  )}
                  onClick={signOut}
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="ml-3">Sign Out</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Sign Out
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 bg-muted/30 overflow-hidden">
          <header className="h-[73px] border-b border-border bg-background flex items-center px-8 lg:hidden">
             <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="ml-4 font-bold text-lg">FutureLabs Admin</h1>
          </header>
          <div className="flex-1 p-4 md:p-8 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;
