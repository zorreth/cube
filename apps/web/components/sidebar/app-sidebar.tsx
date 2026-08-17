import Image from 'next/image';
import Link from 'next/link';
import { Plus, Timer } from 'lucide-react';
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
} from '../ui/sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { SidebarUser } from './sidebar-user';

export function AppSidebar() {
  return (
    <Sidebar>
      <Link href="/">
        <SidebarHeader className="w-full items-center hover:bg-accent">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={144}
            height={80}
            loading="eager"
            className="w-36 h-auto"
          />
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold tracking-widest">PUZZLE</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Puzzle</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Puzzle" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  <SelectItem value="puzzle-3x3">3x3</SelectItem>
                  <SelectItem value="puzzle-2x2">2x2</SelectItem>
                  <SelectItem value="puzzle-4x4">4x4</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton render={<Link href="/" />}>
                <Timer />
                <span>Timer</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
  );
}
