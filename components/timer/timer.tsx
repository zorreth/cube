'use client';

import { useState } from 'react';

export function Timer() {
  const [time, setTime] = useState('0.00');

  return <span className="font-mono font-semibold text-[168px]">{time}</span>;
}
