'use client';

import { selectedDrugAtom, sideBarOpenAtom } from '@/atoms/sideBar';
import { ExpandMore } from '@mui/icons-material';
import { useAtom, useSetAtom } from 'jotai';

export default function ChartHeader() {
  const [drug] = useAtom(selectedDrugAtom);
  const toggleSideBar = useSetAtom(sideBarOpenAtom);

  const handleClickTitle = () => {
    toggleSideBar(true);
  };

  return (
    <div className="mx-auto mb-4 max-w-screen-lg text-center">
      <button
        type="button"
        className="text-2xl font-semibold"
        onClick={handleClickTitle}
      >
        {drug.label}
        <ExpandMore fontSize="inherit" />
      </button>
      <p className="text-lg">{drug.note}</p>
    </div>
  );
}
