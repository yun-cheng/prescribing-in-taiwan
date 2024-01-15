import { ChartSetDataType, FullChartSetDataType } from '@/types/chart';
import { atom } from 'jotai';
import { selectedDrugAtom } from './sideBar';

export const fullChartSetDataAtom = atom<FullChartSetDataType | null>(null);

export const chartSetDataAtom = atom<ChartSetDataType>((get) => {
  const data = get(fullChartSetDataAtom);
  const drug = get(selectedDrugAtom);

  if (data && drug) {
    return data[drug.id];
  }

  const emptyData = {} as ChartSetDataType;

  ['2005', '2010', '2015', '2020'].forEach((year) => {
    emptyData[year] = {
      '1': [],
      '2': [],
    };
  });

  return emptyData;
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
