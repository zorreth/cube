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
} from './ui/sidebar';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Timer, TrendingUp, UserRound } from 'lucide-react';
import { SignInDialog } from './sign-in-dialog';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const eventItems = [
  { value: 'cube3x3', label: '3x3', color: '#27b66e' },
  { value: 'cube2x2', label: '2x2', color: '#e0463e' },
  { value: 'cube4x4', label: '4x4', color: '#2f6fe6' },
  { value: 'cube5x5', label: '5x5', color: '#f0911f' },
  { value: 'cube6x6', label: '6x6', color: '#9b6cf0' },
  { value: 'cube7x7', label: '7x7', color: '#13b9c9' },
  { value: 'cube3x3oh', label: '3x3 One-Handed', color: '#e8a33d' },
  { value: 'cube3x3bf', label: '3x3 Blindfolded', color: '#d65db1' },
  { value: 'pyraminx', label: 'Pyraminx', color: '#f6c945' },
  { value: 'skewb', label: 'Skewb', color: '#67c23a' },
  { value: 'megaminx', label: 'Megaminx', color: '#ec6f8e' },
  { value: 'square-1', label: 'Square-1', color: '#5b8def' },
  { value: 'clock', label: 'Clock', color: '#c0a16b' },
];

const navItems = [
  { href: '/', label: 'Timer', icon: Timer },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
  { href: '/profile', label: 'Profile', icon: UserRound },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) =>
      setUser(session?.user ?? null),
    );
    return () => subscription.unsubscribe();
  }, []);

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

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="tracking-wider">
            EVENT
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <Select defaultValue="cube3x3">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Event" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {eventItems.map(({ value, label, color }) => (
                    <SelectItem key={value} value={value}>
                      <span
                        className="w-2 h-2 rounded-xs inline-block shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === href}
                  size="lg"
                >
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
            {loading ? (
              <div className="flex items-center gap-3 px-2 py-1">
                <Skeleton className="size-8 rounded-full shrink-0" />
                <Skeleton className="h-4 flex-1" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 px-2 py-1">
                {user.user_metadata.avatar_url && (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata.full_name ?? 'User'}
                    width={32}
                    height={32}
                    className="rounded-full shrink-0"
                  />
                )}

                <span className="text-sm font-semibold truncate flex-1">
                  {user.user_metadata.full_name ?? user.email}
                </span>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <LogOut />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Your solves are saved and will be loaded next time you
                        sign in.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => createClient().auth.signOut()}
                        >
                          Sign out
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <SignInDialog />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
