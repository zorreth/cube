import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <span className="font-bold text-8xl text-shadow-xl">404</span>
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <Button asChild>
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
