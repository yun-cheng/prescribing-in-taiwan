import { atom } from 'jotai';
import { chartSetDataAtom } from './chart';
import { selectedDrugAtom } from './sideBar';

export const promptAtom = atom((get) => {
  const drug = get(selectedDrugAtom);
  const data = get(chartSetDataAtom);

  if (!drug || !data) return '';

  return `ATC group: ${drug.label}. ${drug.note}.\nData:${JSON.stringify(
    data,
  )}`;
});
