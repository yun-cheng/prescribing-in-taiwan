import { DrugData, DrugType } from '@/types/drug';
import { atom } from 'jotai';
import { atomWithToggle } from './common/atomWithToggle';

export const sideBarOpenAtom = atomWithToggle(false);

export const openedGroupCollapseAtom = atom<string>('');

export const drugDataAtom = atom<DrugData | null>(null);

export const selectedDrugAtom = atom<DrugType>({
  id: 'A01',
  label: 'A01 Stomatological preparations [Topical]',
  note: 'Local oral treatment, usually for dental use',
});
