'use client';

import { pathnameAtom } from '@/atoms/pathname';
import { selectedDrugIdAtom } from '@/atoms/sideBar';
import { useSetAtom } from 'jotai';
import { useParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Listeners() {
  const pathname = usePathname();
  const { id } = useParams<{ id?: string }>();

  const setPathname = useSetAtom(pathnameAtom);
  const setDrugId = useSetAtom(selectedDrugIdAtom);

  useEffect(() => {
    setPathname(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    setDrugId(id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return null;
}
