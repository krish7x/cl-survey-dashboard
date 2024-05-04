'use client';

import { NotebookPen } from 'lucide-react';
import { useMemo } from 'react';

export default function SurevyIcon() {
  const iconBg = useMemo(() => {
    const colors = ['bg-surveyIcon1', 'bg-surveyIcon2', 'bg-surveyIcon3'];
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }, []);
  return (
    <div
      className={`${iconBg} flex h-14 w-14 items-center justify-center rounded-lg`}
    >
      <NotebookPen
        stroke="#fff"
        size={32}
      />
    </div>
  );
}
