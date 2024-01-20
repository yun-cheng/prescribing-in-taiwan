'use client';

import { selectedDrugAtom, sideBarOpenAtom } from '@/atoms/sideBar';
import { ExpandMore } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';

export default function ChartHeader() {
  const [drug] = useAtom(selectedDrugAtom);
  const toggleSideBar = useSetAtom(sideBarOpenAtom);

  const handleClickTitle = () => {
    toggleSideBar(true);
  };

  const isLoading = !drug;

  return (
    <div className="mx-auto mb-4 max-w-screen-lg text-center">
      {isLoading ? (
        <Skeleton
          variant="text"
          width="60%"
          height="3rem"
          animation="wave"
          className="mx-auto"
        />
      ) : (
        <button
          type="button"
          className="text-2xl font-semibold"
          onClick={handleClickTitle}
        >
          {drug.label}
          <ExpandMore fontSize="inherit" />
        </button>
      )}
      <p className="text-lg">
        {isLoading ? (
          <Skeleton
            variant="rounded"
            width="50%"
            animation="wave"
            className="mx-auto"
          />
        ) : (
          drug.note
        )}
      </p>
    </div>
  );
}
