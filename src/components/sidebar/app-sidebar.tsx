'use client';

import {
  Sidebar,
  SidebarHeader,
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
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelRight, Timer, TrendingUp, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { PuzzleSelect } from './puzzle-select';
import { SidebarUser } from './sidebar-user';
import { Button } from '../ui/button';

const navItems = [
  { href: '/', label: 'Timer', icon: Timer },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
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
                    <Link href={href}>
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
              <SidebarUser user={user} loading={loading} />
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
