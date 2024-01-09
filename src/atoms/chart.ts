import { ChartSetDataType, FullChartSetDataType } from '@/types/chart';
import { atom } from 'jotai';
import { selectedDrugAtom } from './sideBar';

export const fullChartSetDataAtom = atom<FullChartSetDataType | null>(null);

export const chartSetDataAtom = atom<ChartSetDataType | null>((get) => {
  if (!get(fullChartSetDataAtom) && !get(selectedDrugAtom)) {
    return null;
  }
  return get(fullChartSetDataAtom)![get(selectedDrugAtom)];
});
