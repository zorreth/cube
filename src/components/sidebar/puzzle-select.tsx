import { puzzles } from '@/lib/puzzles';
import { useSolve } from '@/hooks/use-solve';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function PuzzleSelect() {
  const { selectedPuzzle, setSelectedPuzzle } = useSolve();

  const handleValueChange = (value: string) => {
    const puzzleType = value.replace('puzzle-', '');
    const puzzle = puzzles.find((p) => p.puzzleType === puzzleType);
    if (puzzle) setSelectedPuzzle(puzzle);
  };

  return (
    <Select
      value={`puzzle-${selectedPuzzle.puzzleType}`}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select puzzle" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {puzzles.map(({ name, puzzleType, color }) => (
            <SelectItem key={puzzleType} value={`puzzle-${puzzleType}`}>
              <span
                className="w-2 h-2 rounded-xs inline-block shrink-0"
                style={{ backgroundColor: color }}
              />
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
