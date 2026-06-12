'use client';

import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { SignInDialog } from '../auth/sign-in-dialog';
import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export function SidebarUser() {
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
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3 px-2 py-1">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <Skeleton className="h-4 flex-1" />
      </div>
    );
  }

  if (!user) {
    return <SignInDialog />;
  }

  return (
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
          <Button variant="destructive" size="icon" className="shrink-0">
            <LogOut />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign out?</DialogTitle>
            <DialogDescription>
              Your solves are saved and will be loaded next time you sign in.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={signout}>
                Sign out
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
