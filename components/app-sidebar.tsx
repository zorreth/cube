import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from './ui/sidebar';
import { Button } from './ui/button';
import Image from 'next/image';

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Image
          src="/logo.svg"
          alt="Antisune"
          loading="eager"
          className="w-32 h-auto"
          width={140}
          height={32}
        />
      </SidebarHeader>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Button size="lg" className="w-full">
              Sign In
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
