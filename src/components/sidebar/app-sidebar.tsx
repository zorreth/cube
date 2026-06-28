import {
  Sidebar,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
  useSidebar,
} from '../ui/sidebar';
import { Link, useLocation } from 'react-router';
import { PanelRight, Timer } from 'lucide-react';
import { PuzzleSelect } from './puzzle-select';
import { SidebarUser } from './sidebar-user';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Timer', icon: Timer },
  // { href: '/progress', label: 'Progress', icon: TrendingUp },
  // { href: '/profile', label: 'Profile', icon: UserRound },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="tracking-wider">PUZZLE</SidebarGroupLabel>
            <SidebarGroupContent>
              <PuzzleSelect />
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarMenu className="gap-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={pathname === href} size="lg">
                    <Link to={href}>
                      <Icon />
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarUser />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <Button
        size="icon"
        variant="secondary"
        className="md:hidden fixed bottom-4 left-4 z-40 rounded-full size-12"
        onClick={toggleSidebar}
      >
        <PanelRight className="size-5" />
        <span className="sr-only">Sidebar</span>
      </Button>
    </>
  );
}
