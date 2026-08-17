import { Plus, Timer } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import Image from 'next/image';
import Link from 'next/link';

export function AppSidebar() {
  return (
    <Sidebar>
      <Link href="/">
        <SidebarHeader className="w-full items-center hover:bg-accent">
          <Image src="/logo.svg" alt="Logo" width={160} height={80} />
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-semibold tracking-widest">EVENT</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Event</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Event" />
              </SelectTrigger>
              <SelectContent></SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Timer />
                <span>Timer</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button>Sign in</Button>
      </SidebarFooter>
    </Sidebar>
  );
}
