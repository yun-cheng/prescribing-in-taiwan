'use client';

import { selectedDrugAtom } from '@/atoms/sideBar';
import { useAtom } from 'jotai';

export default function ChartHeader() {
  const [drug] = useAtom(selectedDrugAtom);

  return (
    <div className="mx-auto mb-4 max-w-screen-lg text-center">
      <h2 className="text-2xl font-semibold">{drug.label}</h2>
      <p className="text-lg">{drug.note}</p>
    </div>
  );
}
