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

export function PuzzleSelect() {
  const { puzzles, puzzlesLoading, selectedPuzzle, setSelectedPuzzle } =
    useSolve();

  const wcaPuzzles = puzzles.filter((p) => p.user_id === null);
  const userPuzzles = puzzles.filter((p) => p.user_id !== null);

  const handleValueChange = (value: string) => {
    const scrambleType = value.replace('puzzle-', '');
    const puzzle = puzzles.find((p) => p.scramble_type === scrambleType);
    if (puzzle) setSelectedPuzzle(puzzle);
  };

  if (puzzlesLoading) {
    return <Skeleton className="h-8 w-full" />;
  }

  return (
    <Select
      value={
        selectedPuzzle ? `puzzle-${selectedPuzzle.scramble_type}` : undefined
      }
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select puzzle" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>WCA</SelectLabel>
          {wcaPuzzles.map(({ name, scramble_type, color }) => (
            <SelectItem key={scramble_type} value={`puzzle-${scramble_type}`}>
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
            {userPuzzles.map(({ name, scramble_type, color }) => (
              <SelectItem key={scramble_type} value={`puzzle-${scramble_type}`}>
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
  );
}
