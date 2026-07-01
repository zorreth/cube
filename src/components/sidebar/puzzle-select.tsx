import { useSolve } from '@/hooks/use-solve';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Skeleton } from '../ui/skeleton';
import { type SubmitEvent, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { SCRAMBLE_TYPES } from '@/lib/scramble';

const EMPTY_FORM = { name: '', slug: '', color: '#6366f1', scramble_type: '' };

export function PuzzleSelect() {
  const {
    puzzles,
    puzzlesLoading,
    selectedPuzzle,
    setSelectedPuzzle,
    addPuzzle,
  } = useSolve();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  const wcaPuzzles = puzzles.filter((p) => p.user_id === null);
  const userPuzzles = puzzles.filter((p) => p.user_id !== null);

  const handleValueChange = (value: string) => {
    const puzzleId = Number(value.replace('puzzle-', ''));
    const puzzle = puzzles.find((p) => p.id === puzzleId);
    if (puzzle) setSelectedPuzzle(puzzle);
  };

  const handleNameChange = (name: string) => {
    setForm((f) => ({
      ...f,
      name,
      slug: name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await addPuzzle({
      name: form.name,
      slug: form.slug,
      color: form.color,
      scramble_type: form.scramble_type || null,
    });
    setForm(EMPTY_FORM);
    setSubmitting(false);
    setOpen(false);
  };

  if (puzzlesLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <>
      <Select
        value={selectedPuzzle ? `puzzle-${selectedPuzzle.id}` : undefined}
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select puzzle" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>WCA</SelectLabel>
            {wcaPuzzles.map(({ id, name, color }) => (
              <SelectItem key={id} value={`puzzle-${id}`}>
                <span
                  className="w-2 h-2 rounded-xs inline-block shrink-0"
                  style={{ backgroundColor: color }}
                />
                {name}
              </SelectItem>
            ))}
          </SelectGroup>

          {userPuzzles.length > 0 && (
            <SelectGroup>
              <SelectLabel>Custom</SelectLabel>
              {userPuzzles.map(({ id, name, color }) => (
                <SelectItem key={id} value={`puzzle-${id}`}>
                  <span
                    className="w-2 h-2 rounded-xs inline-block shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus /> Add Custom
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Custom Puzzle</DialogTitle>
          </DialogHeader>
          <form
            id="add-puzzle-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Name
              </label>
              <Input
                required
                placeholder="e.g. Megaminx"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Slug
              </label>
              <Input
                required
                placeholder="e.g. megaminx"
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Color
              </label>
              <input
                type="color"
                value={form.color}
                onChange={(e) =>
                  setForm((f) => ({ ...f, color: e.target.value }))
                }
                className="h-9 w-full cursor-pointer rounded-md border border-input bg-transparent px-1 py-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-muted-foreground">
                Scramble Type
              </label>
              <Select
                value={form.scramble_type || 'none'}
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    scramble_type: v === 'none' ? '' : v,
                  }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {SCRAMBLE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </form>
          <DialogFooter showCloseButton>
            <Button type="submit" form="add-puzzle-form" disabled={submitting}>
              Add Puzzle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
