import { atom } from 'jotai';
import { chartSetDataAtom } from './chart';
import { selectedDrugAtom } from './sideBar';

export const promptAtom = atom((get) => {
  const data = get(chartSetDataAtom);

  if (!data) return '';

  const drug = get(selectedDrugAtom);

  return `ATC group: ${drug.label}. ${drug.note}.\nData:${JSON.stringify(
    data,
  )}`;
});
