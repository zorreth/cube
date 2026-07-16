import { Outlet } from 'react-router';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from './components/ui/tooltip';
import { SolveProvider } from './contexts/solve/solve-provider';

export function Layout() {
  return (
    <TooltipProvider>
      <SolveProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </SolveProvider>
    </TooltipProvider>
  );
}
