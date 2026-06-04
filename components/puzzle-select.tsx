'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const wcaPuzzles = [
  { value: 'cube3x3x3', label: '3x3x3', color: '#27b66e' },
  { value: 'cube2x2x2', label: '2x2x2', color: '#e0463e' },
  { value: 'cube4x4x4', label: '4x4x4', color: '#2f6fe6' },
  { value: 'cube5x5x5', label: '5x5x5', color: '#f0911f' },
  { value: 'cube6x6x6', label: '6x6x6', color: '#9b6cf0' },
  { value: 'cube7x7x7', label: '7x7x7', color: '#13b9c9' },
  { value: 'cube3x3bf', label: '3x3 Blindfolded', color: '#d65db1' },
  { value: 'cube3x3oh', label: '3x3 One-Handed', color: '#e8a33d' },
  { value: 'clock', label: 'Clock', color: '#c0a16b' },
  { value: 'megaminx', label: 'Megaminx', color: '#ec6f8e' },
  { value: 'pyraminx', label: 'Pyraminx', color: '#f6c945' },
  { value: 'skewb', label: 'Skewb', color: '#67c23a' },
  { value: 'square-1', label: 'Square-1', color: '#5b8def' },
];

export function PuzzleSelect() {
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string | undefined>();

  return (
    <Select
      defaultValue="cube3x3x3"
      value={selectedPuzzleId}
      onValueChange={(v) => setSelectedPuzzleId(v)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="No puzzles" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>WCA</SelectLabel>
          {wcaPuzzles.map(({ value, label, color }) => (
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
  );
}
