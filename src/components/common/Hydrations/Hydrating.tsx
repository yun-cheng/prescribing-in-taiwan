'use client';

import { fullChartSetDataAtom } from '@/atoms/chart';
import { drugMapAtom } from '@/atoms/sideBar';
import { FullChartSetDataType } from '@/types/chart';
import { DrugMap } from '@/types/drug';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode } from 'react';

type Props = {
  drugMap: DrugMap;
  fullChartSetData: FullChartSetDataType;
  children: ReactNode;
};

export default function Hydrating({
  drugMap,
  fullChartSetData,
  children,
}: Props) {
  useHydrateAtoms([
    [drugMapAtom, drugMap],
    [fullChartSetDataAtom, fullChartSetData],
  ]);

  return children;
}
