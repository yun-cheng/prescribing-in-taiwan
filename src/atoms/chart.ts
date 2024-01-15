import { ChartSetDataType, FullChartSetDataType } from '@/types/chart';
import { atom } from 'jotai';
import { selectedDrugAtom } from './sideBar';

export const fullChartSetDataAtom = atom<FullChartSetDataType | null>(null);

export const chartSetDataAtom = atom<ChartSetDataType | null>((get) => {
  const data = get(fullChartSetDataAtom);
  const drug = get(selectedDrugAtom);

  if (!data || !drug) return null;

  return data[drug.id];
});

export const maxValueAtom = atom((get) => {
  const data = get(chartSetDataAtom);

  if (!data) return 100;

  const arr = Object.values(data).reduce<(number | null)[]>(
    (acc, obj) => acc.concat(...Object.values(obj)),
    [],
  );

  return Math.max(...(arr.filter((v) => v !== null) as number[]));
});
