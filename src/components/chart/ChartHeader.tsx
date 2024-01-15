'use client';

import {
  selectedDrugAtom,
  selectedDrugIdAtom,
  sideBarOpenAtom,
} from '@/atoms/sideBar';
import { ExpandMore } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ChartHeader() {
  const { id } = useParams<{ id: string }>();

  const setDrugId = useSetAtom(selectedDrugIdAtom);

  useEffect(() => {
    setDrugId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [drug] = useAtom(selectedDrugAtom);
  const toggleSideBar = useSetAtom(sideBarOpenAtom);

  const handleClickTitle = () => {
    toggleSideBar(true);
  };

  const isLoading = !drug;

  return (
    <div className="mx-auto mb-4 max-w-screen-lg text-center">
      <button
        type="button"
        className="w-full text-2xl font-semibold"
        onClick={handleClickTitle}
      >
        {isLoading ? (
          <Skeleton
            width="60%"
            animation="wave"
            variant="rounded"
            sx={{ marginX: 'auto' }}
          />
        ) : (
          <>
            {drug.label}
            <ExpandMore fontSize="inherit" />
          </>
        )}
      </button>
      <p className="text-lg">
        {isLoading ? (
          <Skeleton
            width="50%"
            animation="wave"
            variant="rounded"
            sx={{ marginX: 'auto' }}
          />
        ) : (
          drug.note
        )}
      </p>
    </div>
  );
}
